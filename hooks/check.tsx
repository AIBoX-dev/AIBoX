import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";

export function Checks() {
    const { t } = useTranslation("common");
    const [data, setData] = useState({
        // value
        email: "",
        password: "",
        confirm_password: "",
        // status
        email_status: "",
        password_status: "",
        confirm_status: "",
    });

    const regex_email = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const CheckEmail = () => {
        if (data.email && !data.email.match(regex_email)) {
            setData({ ...data, email_status: t("Check.wrongemail") });
            console.log(data.email);
            console.log(data.email_status);
        } else {
            setData({ ...data, email_status: "" });
            console.log(data.email);
        }
    };
    const CheckPassword = () => {
        // パスワードの企画をまた考える
    };

    useEffect(() => {
        CheckEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.email]);

    useEffect(() => {
        CheckPassword();
    }, [data.password]);

    return {
        data,
        setData,
    };
}
