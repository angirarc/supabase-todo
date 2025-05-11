import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export const createClient = async () => {
    const cookiesStore = await cookies();

    const client = createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookiesStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookiesStore.set(name, value, options),
                        )
                    } catch {
                    }
                }
            }
        }
    )

    return client;
}

export const getUser = async () => {
    const { auth } = await createClient();

    const userObject = await auth.getUser();

    if (userObject.error) {
        console.log(userObject.error);
        return null;
    } 

    return userObject.data.user;
}