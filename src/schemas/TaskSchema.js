import { z } from "zod";

export const createOrUpdateTaskSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .max(50, { message: "Title must be at most 50 characters long" }),
  description: z
    .string()
    .max(1000, { message: "Description must be at most 1000 characters long" })
    .optional(),
  deadline: z
    .string()
    .datetime({ message: "Invalid deadline" })
    .refine(
      (val) => {
        const date = new Date(val);
        return date > new Date();
      },
      { message: "Deadline must be in the future" }
    )
    .optional(),
});
