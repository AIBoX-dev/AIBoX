import { useState } from 'react';
import { useTranslation } from "next-i18next";

export function Checks() {
    const { t } = useTranslation("common");
    const [email, setEmail] = useState('')
    
    const regex_email = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    let email_state;
    
    if (email && !email.match(regex_email)) {
        email_state = t("Check.wrongemail")
    }
    return {
        email, setEmail, email_state
    };
}