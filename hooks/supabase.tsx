import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as string;
const supabase_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabase_url, supabase_key);

export const useAuth = () => {
    const router = useRouter();
    const signInWithGoogle = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    queryParams: {
                        access_type: "offline",
                        prompt: "consent",
                    },
                },
            });
            // ユーザーが存在するかを確認して、いなかったら表示名設定とかのページに行きたい Ftps
            await router.push("/");
            if (error) {
                throw error;
            }

            await router.push("/");
        } catch (error) {
            console.error(error);
        }
    };
    return {
        signInWithGoogle,
    };
};
