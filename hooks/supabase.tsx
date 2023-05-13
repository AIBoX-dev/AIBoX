import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as string;
const supabase_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const crypto = require('crypto');
const supabase = createClient(supabase_url, supabase_key);

const insertUser = async (email: string, password: string, userdata: { [key: string]: any} ) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
    const { data, error } = await supabase
    .from('user')
    .insert([
        {
            banned_at: null,
            created_at: userdata["user"]["created_at"],
            email: email,
            is_activated: false,
            is_banned: false,
            is_official: false,
            is_shaddowbanned: false,
            last_login: userdata["user"]["identities"]["last_sign_in_at"],
            officialized_at: null,
            password_hash: hash,
            salt: salt,
            shadowbanned_at: userdata["user"]["updated_at"],
            updated_at: new Date(),
            user_id: userdata["user"]["id"]
        },
        ]);

    if (error) {
        console.error(error);
        return;
    }
};

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
            // Googlの場合のinsertUseも考える
            // ユーザーが存在するかを確認して、いなかったら表示名設定とかのページに行きたい Ftps
            await router.push("/");
            // console.log({ data, error})

        } catch (error) {
            console.error(error);
        }
    };

    const createUser = async ( email: string, password: string): Promise<void> => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });
            await insertUser(email, password, data)
            // console.log({ data, error });
        }　catch (error) {
            console.error(error);
        }
    }

    return {
        signInWithGoogle,
        createUser
    };
}
