import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z
    .string()
    .min(2, "نام باید حداقل ۲ حرف باشد"),

  lastName: z
    .string()
    .min(2, "نام خانوادگی باید حداقل ۲ حرف باشد"),

  phone: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست یا space اضافه زدی"),

  address: z
    .string()
    .min(10, "آدرس باید حداقل ۱۰ حرف باشد"),

  deliveryDate: z
    .string()
    .min(1, "تاریخ تحویل را انتخاب کنید"),

  description: z
    .string()
    .optional(),
});

export type CheckoutFormValues = z.infer<
  typeof checkoutSchema
>;