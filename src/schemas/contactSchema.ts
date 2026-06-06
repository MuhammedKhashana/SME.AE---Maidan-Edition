import { z } from 'zod';

export const contactSchema = z.object({
  name:    z.string().min(1, 'Name is required').max(100),
  company: z.string().max(100).optional().or(z.literal('')),
  email:   z.string().min(1, 'Email is required').email('Please enter a valid email'),
  message: z.string().max(2000).optional().or(z.literal('')),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;
