import { z } from "zod";

export const emailSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
});

export default schema;
