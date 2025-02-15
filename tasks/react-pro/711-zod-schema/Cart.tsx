import { z } from 'zod';

export const CartItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Nazwa jest wymagana' }),
  price: z.number(),
  quantity: z.number(),
});

export const CartSchema = z
  .object({
    items: z.array(CartItemSchema).min(1, { message: 'Koszyk nie może być pusty' }),
    total: z.number().gt(0, { message: 'Łączna cena musi być większa od 0' }),
  })
  .refine(
    (data) =>
      data.total === data.items.reduce((sum, item) => sum + item.price * item.quantity * 2, 0),
    {
      message: 'Łączna cena nie zgadza się z wartością produktów',
      path: ['total'],
    },
  );

export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;
