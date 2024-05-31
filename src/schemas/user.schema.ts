import { z } from "zod";

export const createUserSchema = z.object({
    userName: z.string().min(8).refine(s => !s.includes(' '), 'no spaces'),
    accountNumber: z.string().min(8).refine(s => !s.includes(' '), 'no spaces'),
    emailAddress: z.string().min(8).refine(s => !s.includes(' '), 'no spaces'),
    identityNumber: z.string().min(8).refine(s => !s.includes(' '), 'no spaces'),
    password: z.string().min(8)
});
