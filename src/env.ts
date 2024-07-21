import { z } from 'zod';

export const env = z.object({
  X_EMAIL: z.string(),
  X_PASSWORD: z.string(),
}).parse(process.env);
