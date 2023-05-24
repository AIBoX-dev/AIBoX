import {promises} from "dns";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/auth";


export function Checks() {
    const [userdata, setUserdata] = useState({
        // value
        email: "",
        password: "",
        confirm_password: "",
        // status: okay -> true
        email_status: true,
        password_status: true,
        confirm_status: true,
        tos_status: false,
        login_remember: false,
        // password_status: okay -> true
        pw_length: true,
        pw_include_symbol: true
    });

    const regex_email = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const regex_password = /[!-/:-@[-`{-~]/;

    const CheckEmail = () => {
        setUserdata({ ...userdata, email_status: Boolean(userdata.email && !userdata.email.match(regex_email)) });
    };

    const CheckPassword = () => {
        if (userdata.password) {
            setUserdata({ ...userdata,
                confirm_status: !Boolean(userdata.confirm_password && userdata.password !== userdata.confirm_password),
                pw_length: Boolean(userdata.password.length >= 8),
                pw_include_symbol: Boolean(userdata.password.match(regex_password))
            })
        }
    };

    const CheckrRequirements = () => {
        if (userdata.email && userdata.password && !userdata.email_status && userdata.confirm_status && userdata.tos_status) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        CheckEmail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userdata.email]);

    useEffect(() => {
        CheckPassword();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userdata.password, userdata.confirm_password]);

    return {
        userdata,
        setUserdata,
        CheckrRequirements
    };
}
