import { createClient } from "@supabase/supabase-js";

import { useRouter } from "next/router";

import { database } from "@/hooks/database"
const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as string;
const supabase_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabase_url, supabase_key);
const { insertUser, insertProfile } = database()



const updateDob = async (id: number, dob: string) => {
    const { data, error } = await supabase
        .from('users')
        .update({ dob: dob })
        .eq('user_id', id)
};

const getActivated = async (id: string) => {
    const { data, error } = await supabase
        .from('users')
        .select('is_activated')
        .eq('user_id', id)
    return data?.[0]?.is_activated ?? false;
};

const setActivated = async(user_id: number) => {
    const { data, error } = await supabase
        .from('users')
        .update({ is_activated: true })
        .eq('user_id', user_id);
}




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

    const createUser = async (email: string, password: string): Promise<void> => {
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
    };

    const getActivationStatus = async (userdata: { [key: string]: any }) => {
        try {
            return await getActivated(userdata.user.id)
        } catch (error) {
            console.error(error)
        }
    }



    const createProfile = async (id: number, user_id: string, display_name: string, dob:string) => {
        try {
            const description = "Hello!"
            const created_at = new Date().toISOString()
            const updated_at = new Date().toISOString()
            await insertProfile(id, user_id, display_name, description, created_at, updated_at)
            await updateDob(id, dob)
        } catch (error) {
            console.error(error)
        }
    };


    const loginWithPassword = async (email: string, password: string): Promise<void> => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })
            const is_activated = await getActivationStatus(data)
            if (!error) {
                if (!is_activated) {
                await router.push(`/setup?id=${encodeURIComponent(String(is_activated))}`);
                }
                else {
                    await router.push(`/search?id=${encodeURIComponent(String(data.session.access_token))}`)
                }
            }  else {
            }
        } catch (error) {
            console.error(error)
        }
    }

    const resendVerificationEmail = async (email: string) => {
        try {
            const { data, error } = await supabase.auth.resend({
                type: "signup",
                email: email,
            });
        }
        catch (error) {
            console.error(error);
        }
    };

    


    return {
        signInWithGoogle,
        createUser,
        loginWithPassword,
        resendVerificationEmail,
        createProfile,
        getActivationStatus
    };
}

