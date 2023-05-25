import { useRouter } from "next/router";
import { useState } from 'react'
import { database } from "@/hooks/database"
import { supabase } from "@/hooks/supabase";
const { insertUser, insertProfile, updateDob, getActivated, getUserProfile } = database()

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

    const logoutUser = async () => {
        const { error } = await supabase.auth.signOut()
        document.cookie="access_token=;"

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


    const loginWithPassword = async (email: string, password: string, login_remember: boolean): Promise<void> => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })
            const is_activated = await getActivationStatus(data)
            if (!error) {
                if (!is_activated) {
                    // await router.push(`/setup?id=${encodeURIComponent(String(is_activated))}`);
                }
                else {
                    if (login_remember) {
                        document.cookie = 'access_token=${data.session.access_token}; '//expires=
                        localStorage.setItem('user', JSON.stringify(data))
                    }
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

    const getSessionUser = async (sessionData:any, setSessionData: any) => {
        const { data } = await supabase.auth.getSession()
        if (data.session !== null) {
            const { data: { user } } = await supabase.auth.getUser()

            const userdata = await getUserProfile(user.id)
            await setSessionData({...sessionData,
                logged: true,
                displayname: userdata[0].display_name,
                icon_url: userdata[0].icon_url,
                account_id: userdata[0].account_id,
                email: user.email
            })
        }
    }




    return {
        signInWithGoogle,
        createUser,
        loginWithPassword,
        resendVerificationEmail,
        createProfile,
        getActivationStatus,
        logoutUser,
        getSessionUser
    };
}
