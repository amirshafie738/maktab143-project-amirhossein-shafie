
const jsonServer = require("json-server");
const cors = require("cors");
const dotenv = require("dotenv");

const fs = require("fs");
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");

// ----------------------------------------------------
// Environment Variables
// ----------------------------------------------------

dotenv.config();

const AUTH_JWT_SECRET = process.env.AUTH_JWT_SECRET;
const AUTH_JWT_REFRESH_TOKEN_SECRET =
  process.env.AUTH_JWT_REFRESH_TOKEN_SECRET;

if (!AUTH_JWT_SECRET || !AUTH_JWT_REFRESH_TOKEN_SECRET) {
  throw new Error("JWT secrets are not configured");
}

// ----------------------------------------------------
// Server Setup
// ----------------------------------------------------

const server = jsonServer.create();

const dbPath = path.join(__dirname, "db.json");
const router = jsonServer.router(dbPath);

const middlewares = jsonServer.defaults({
  noCors: true,
});

// ----------------------------------------------------
// Upload Setup
// ----------------------------------------------------

const uploadPath = path.join(__dirname, "uploads");

fs.mkdirSync(uploadPath, { recursive: true });

const upload = multer({
  dest: uploadPath,
});

// ----------------------------------------------------
// JWT Settings
// ----------------------------------------------------

const refreshTokenExpire = "1d";
const accessTokenExpire = "1h";

// ----------------------------------------------------
// Load DB file for Authentication
// ----------------------------------------------------

const DB = JSON.parse(
  fs.readFileSync(dbPath, "utf-8")
);

// ----------------------------------------------------
// CORS
// ----------------------------------------------------

server.use(cors());

// ----------------------------------------------------
// Authorization Middleware
// ----------------------------------------------------

server.use((req, res, next) => {
  const protections = DB.protection || {};

  const entity = req.url.split("/")[1];

  const entityProtection = protections[entity];

  const methodSpecificProtection =
    protections[entity + "." + req.method.toLowerCase()];

  const protectionRule =
    methodSpecificProtection === false
      ? false
      : methodSpecificProtection || entityProtection;

  const token = req.headers.token || req.headers.Token;

  if (protectionRule && !token) {
    return res.status(401).send();
  }

  if (!token) {
    return next();
  }

  jwt.verify(token, AUTH_JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("res: ", JSON.stringify(err));

      return res
        .status(401)
        .send(
          err.name === "TokenExpiredError"
            ? "Token Expired!"
            : "Invalid Token"
        );
    }

    req.user = decoded;

    if (!protectionRule) {
      return next();
    }

    const authorized =
      protectionRule === true ||
      protectionRule === decoded.role;

    if (!authorized) {
      return res.status(401).send();
    }

    next();
  });
});

// ----------------------------------------------------
// Default Middlewares
// ----------------------------------------------------

server.use(middlewares);

// ----------------------------------------------------
// Upload API
// ----------------------------------------------------

server.post(
  "/upload",
  upload.single("thumbnail"),
  function (req, res) {
    if (!req.file) {
      return res.status(400).json({
        message: "No thumbnail uploaded",
      });
    }

    const {
      mimetype,
      size,
      filename,
      originalname,
    } = req.file;

    if (mimetype !== "image/jpeg") {
      return res.status(400).json({
        message: "image should be in image/jpeg type",
      });
    }

    if (size > 2 * 1024 * 1024) {
      return res.status(400).json({
        message: "image size should be less than 2MB",
      });
    }

    res.json({
      fieldname: "thumbnail",
      originalname,
      filename,
      path: "/files/" + filename,
    });
  }
);

// ----------------------------------------------------
// Multi Images
// ----------------------------------------------------

server.post(
  "/upload-images",
  upload.array("images", 10),
  function (req, res) {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No images uploaded",
      });
    }

    const images = req.files.map((file) => ({
      filename: file.filename,
      path: "/files/" + file.filename,
    }));

    res.json(images);
  }
);

// ----------------------------------------------------
// List All Files
// ----------------------------------------------------

server.get("/files", (req, res, next) => {
  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      return next(err);
    }

    res.json(files);
  });
});

// ----------------------------------------------------
// Preview / Download File
// ----------------------------------------------------

server.get("/files/:file_id", (req, res) => {
  const { file_id } = req.params;

  // جلوگیری از دسترسی به مسیرهای خارج از uploads
  if (
    file_id !== path.basename(file_id) ||
    file_id.includes("..")
  ) {
    return res.status(400).send("Invalid file name");
  }

  const filePath = path.join(uploadPath, file_id);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  res.set("Content-Type", "image/jpeg");

  res.sendFile(filePath);
});

// ----------------------------------------------------
// Body Parser
// ----------------------------------------------------

server.use(jsonServer.bodyParser);

// ----------------------------------------------------
// Upload Middleware for POST / PATCH
// ----------------------------------------------------

const thumbnailUploadMiddleware =
  upload.single("thumbnail");

server.use((req, res, next) => {
  const contentType =
    req.headers["content-type"] || "";

  if (
    (req.method === "POST" || req.method === "PATCH") &&
    !contentType.includes("application/json")
  ) {
    thumbnailUploadMiddleware(req, res, next);
  } else {
    next();
  }
});

// ----------------------------------------------------
// Handle Uploaded Thumbnail
// ----------------------------------------------------

server.use((req, res, next) => {
  if (req.file) {
    const {
      mimetype,
      size,
      filename,
    } = req.file;

    if (mimetype !== "image/jpeg") {
      return res.status(400).json({
        message: "image should be in image/jpeg type",
      });
    }

    if (size > 2 * 1024 * 1024) {
      return res.status(400).json({
        message: "image size should be less than 2MB",
      });
    }

    req.body.thumbnail = "/files/" + filename;
  }

  next();
});

// ----------------------------------------------------
// Add createdAt
// ----------------------------------------------------

server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }

  next();
});

// ----------------------------------------------------
// Refresh Tokens
// ----------------------------------------------------

let refreshTokens = [];

// ----------------------------------------------------
// Login
// ----------------------------------------------------

server.post("/auth/login", async function (req, res) {
  const { username, password } = req.body;

  req.user = (DB.users || []).find(
    (u) =>
      u.username == username &&
      u.password == password
  );

  if (!req.user) {
    return res
      .status(401)
      .send("No user with those credentials!");
  }

  const {
    username: dbUsername,
    role,
    name,
  } = req.user;

  const accessToken = await jwt.sign(
    {
      dbUsername,
      role,
      name,
    },
    AUTH_JWT_SECRET,
    {
      expiresIn: accessTokenExpire,
    }
  );

  const refreshToken = await jwt.sign(
    {
      dbUsername,
      role,
      name,
    },
    AUTH_JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: refreshTokenExpire,
    }
  );

  refreshTokens.push(refreshToken);

  res.json({
    accessToken,
    refreshToken,
  });
});

// ----------------------------------------------------
// Verify Access Token
// ----------------------------------------------------

server.get("/auth/verify", (req, res) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not found",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      AUTH_JWT_SECRET
    );

    return res.status(200).json({
      valid: true,
      user: decoded,
    });
  } catch (error) {
    return res.status(401).json({
      valid: false,
      message:
        error.name === "TokenExpiredError"
          ? "Token Expired!"
          : "Invalid Token",
    });
  }
});

// ----------------------------------------------------
// Refresh Token
// ----------------------------------------------------

server.post(
  "/auth/refresh-token",
  async function (req, res) {
    const refreshToken =
      req.header("refreshToken");

    if (!refreshToken) {
      return res.status(403).json({
        errors: [
          {
            msg: "Token not found",
          },
        ],
      });
    }

    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json({
        errors: [
          {
            msg: "Invalid refresh token",
          },
        ],
      });
    }

    try {
      const user = await jwt.verify(
        refreshToken,
        AUTH_JWT_REFRESH_TOKEN_SECRET
      );

      const {
        dbUsername,
        name,
        role,
      } = user;

      const accessToken = await jwt.sign(
        {
          dbUsername,
          name,
          role,
        },
        AUTH_JWT_SECRET,
        {
          expiresIn: accessTokenExpire,
        }
      );

      res.json({
        accessToken,
      });
    } catch (error) {
      res.status(403).json({
        errors: [
          {
            msg: "Invalid token",
          },
        ],
      });
    }
  }
);

// ----------------------------------------------------
// Dashboard Stats
// ----------------------------------------------------

server.get("/admin/dashboard/stats", (req, res) => {
  const orders = router.db.get("orders").value();
  const products = router.db.get("products").value();

  const successfulOrders = orders.filter(
    (order) => order.paymentStatus === "success"
  );

  const totalSales = successfulOrders.reduce(
    (total, order) => total + order.prices,
    0
  );

  const totalOrders = successfulOrders.length;
  const totalProducts = products.length;

  const outOfStockProducts = products.filter(
    (product) => product.quantity === 0
  ).length;

  res.json({
    totalSales,
    totalOrders,
    totalProducts,
    outOfStockProducts,
  });
});

// ----------------------------------------------------
// Daily Sales
// ----------------------------------------------------

server.get("/admin/dashboard/sales", (req, res) => {
  const orders = router.db.get("orders").value();

  const successfulOrders = orders.filter(
    (order) => order.paymentStatus === "success"
  );

  const salesByDate = {};

  successfulOrders.forEach((order) => {
    const date = new Date(order.createdAt)
      .toISOString()
      .split("T")[0];

    if (!salesByDate[date]) {
      salesByDate[date] = 0;
    }

    salesByDate[date] += Number(order.prices);
  });

  const sales = Object.entries(salesByDate)
    .map(([date, amount]) => ({
      date,
      sales: amount,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  res.json(sales);
});

// ----------------------------------------------------
// Order Status
// ----------------------------------------------------

server.get(
  "/admin/dashboard/order-status",
  (req, res) => {
    const orders = router.db.get("orders").value();

    const successful = orders.filter(
      (order) => order.paymentStatus === "success"
    );

    const delivered = successful.filter(
      (order) => order.delivered === true
    ).length;

    const notDelivered = successful.filter(
      (order) => order.delivered === false
    ).length;

    res.json([
      {
        status: "تحویل شده",
        count: delivered,
      },
      {
        status: "در انتظار ارسال",
        count: notDelivered,
      },
    ]);
  }
);

// ----------------------------------------------------
// Low Stock Products
// ----------------------------------------------------

server.get(
  "/admin/dashboard/low-stock",
  (req, res) => {
    const products = router.db.get("products").value();

    const lowStockProducts = products
      .filter(
        (product) =>
          product.quantity > 0 &&
          product.quantity <= 5
      )
      .sort((a, b) => a.quantity - b.quantity)
      .slice(0, 5);

    res.json(lowStockProducts);
  }
);

// ----------------------------------------------------
// Top Products
// ----------------------------------------------------

server.get(
  "/admin/dashboard/top-products",
  (req, res) => {
    const orders = router.db.get("orders").value();
    const products = router.db.get("products").value();

    const successfulOrders = orders.filter(
      (order) => order.paymentStatus === "success"
    );

    const productSales = {};

    successfulOrders.forEach((order) => {
      order.products.forEach((item) => {
        const id = Number(item.id);
        const count = Number(item.count);

        if (!productSales[id]) {
          productSales[id] = 0;
        }

        productSales[id] += count;
      });
    });

    const topProducts = Object.entries(productSales)
      .map(([id, soldCount]) => {
        const product = products.find(
          (product) => product.id === Number(id)
        );

        if (!product) return null;

        return {
          ...product,
          soldCount,
        };
      })
      .filter(Boolean)
      .sort(
        (a, b) => b.soldCount - a.soldCount
      )
      .slice(0, 5);

    res.json(topProducts);
  }
);

// ----------------------------------------------------
// JSON Server Router
// ----------------------------------------------------

server.use(router);

// ----------------------------------------------------
// Delete Expired Orders
// ----------------------------------------------------

const ORDER_EXPIRE_TIME = 10 * 60 * 1000;

setInterval(() => {
  const orders = router.db.get("orders").value();
  const now = Date.now();

  const expiredOrders = orders.filter(
    (order) =>
      (order.paymentStatus === "pending" ||
        order.paymentStatus === "failed") &&
      now - order.createdAt >= ORDER_EXPIRE_TIME
  );

  expiredOrders.forEach((order) => {
    router.db
      .get("orders")
      .remove({ id: order.id })
      .write();

    console.log(
      `Order ${order.id} expired and deleted`
    );
  });
}, 60 * 1000);

// ----------------------------------------------------
// Start Server
// ----------------------------------------------------

const PORT = process.env.PORT || 3001;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
