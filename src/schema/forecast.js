import { z } from "zod";

export const forecastSchema = z.object({
    title: z.string({
        required_error: 'titulo es necesario'
    }),
    description: z.string({
        required_error: 'descripcion es necesaria'
    }),
})
