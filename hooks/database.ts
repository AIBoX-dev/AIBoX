import crypto from 'crypto';
import { supabase } from '@/hooks/supabase'


export const database = () => {
    const insertUser = async (email: string, password: string, userdata: { [key: string]: any }) => {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
        const { data, error } = await supabase
        .from('users')
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
    
    const insertProfile = async (id: number, user_id: string, display_name: string, description: string, created_at: string, updated_at: string) => {
        const { data, error } = await supabase
        .from('profile')
        .insert([
            {
                id: id,
                user_id: user_id,
                display_name: display_name,
                description: description,
                created_at: created_at,
                updated_at: updated_at,
            },
            ]);
    };
    
    const changePassword = async (id: number, user_id: string, password: string) => {
        
    }
    return {
        insertUser,
        insertProfile
    };
}
