import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "نام محصول الزامی است"),

  brand: z.string().min(1, "برند الزامی است"),

  category: z
    .number()
    .int("دسته‌بندی باید عدد صحیح باشد")
    .positive("دسته‌بندی را انتخاب کنید"),

  subcategory: z
    .number()
    .int("زیردسته‌بندی باید عدد صحیح باشد")
    .positive("زیردسته‌بندی را انتخاب کنید"),

  description: z.string().min(1, "توضیحات محصول الزامی است"),

  price: z
    .number()
    .positive("قیمت باید بیشتر از صفر باشد"),

  quantity: z
    .number()
    .int("موجودی باید عدد صحیح باشد")
    .min(0, "موجودی نمی‌تواند منفی باشد"),
});

export type ProductFormValues =
  z.infer<typeof productSchema>;