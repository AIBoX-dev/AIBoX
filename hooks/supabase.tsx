import { createClient } from "@supabase/supabase-js";

import { useRouter } from "next/router";

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as string;
const supabase_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

import {Checks} from "@/hooks/check"
const crypto = require('crypto');
const supabase = createClient(supabase_url, supabase_key);

const insertUser = async (email: string, password: string, userdata: { [key: string]: any} ) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
    const { data, error } = await supabase
    .from('user')
    .insert([
        {
            user_id: userdata["user"]["id"],
            email: email,
            password_hash: hash,
            salt: salt,
            created_at: userdata["user"]["created_at"],
            last_login: userdata["user"]["identities"]["last_sign_in_at"],
            updated_at: userdata["user"]["updated_at"],
        },
        ]);

    if (error) {
        console.error(error);
        return;
        //errorコードの処理を
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
            })
            if (!error) {
                await insertUser(email, password, data)
            }
            // console.log({ data, error });
        } catch (error) {

            console.error(error);
        }
    }

    const loginWithPassword = async ( email: string, password: string): Promise<void> => {
        try {
            console.log(email)
            const { data, error }= await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })
            console.log({data, error})
        } catch(error) {
            console.error(error)
        }
    }

    return {
        signInWithGoogle,
        createUser,
        loginWithPassword
    };
}
