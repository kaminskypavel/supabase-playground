import {z} from 'zod';
import {createTRPCRouter, publicProcedure, protectedProcedure} from "../trpc";
import {supabase} from 'lib/Store';

export const appRouter = createTRPCRouter({
    hello: publicProcedure
        .input(
            z.object({
                text: z.string(),
            }),
        )
        .query(({input}) => {
            return {
                greeting: `hello ${input.text}`,
            };
        }),

    getAll: publicProcedure.query(async ({ctx}) => {
        const {supabase} = ctx;
        const result = await supabase.from('users').select('*');
        // console.log({ctx});
        return {result};
    }),

});

// export type definition of API
export type AppRouter = typeof appRouter;