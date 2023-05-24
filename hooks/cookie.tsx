import React, {useState} from "react";
import { supabase } from '@/hooks/supabase'

export function useCookies() {
    const [logged, setLogged] = useState(false)

    const checkLoginStatus = () => {
        const data = localStorage.getItem('data')
        const accessToekn = getCookie('access_token')
        setLogged(accessToekn ? true : false);
        
    }
    
    const getCookie = ( name: string ) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop()?.split(';').shift();
        }
    }
    return {
        checkLoginStatus,
        logged
    };
}