import {
    Card,
    Container,
    Text,
    Button,
    Spacer,
    Input,
    Row,
    Loading,
} from "@nextui-org/react";

import { GetStaticProps } from "next";

import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/auth";
import { Checks } from "@/hooks/check";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ["common"])),
    },
});

export default function MailSent() {
    const { t } = useTranslation("common");
    const router = useRouter();
    const { email: emailParam } = router.query;
    const { resendVerificationEmail } = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [resent, setResent] = React.useState(false);
    const [is_resendable, setResendable] = React.useState(false);

    const handleResend = () => {
        setResendable(false);
        setResent(false);
        resendVerificationEmail(emailParam as string);
        setResent(true);
        setLoading(false);
        // wait 30 seconds before allowing another resend
        setTimeout(() => {
            setResendable(true);
        }, 30000);
    };

    useEffect(() => {
        (async () => {
            const regex_email =
                /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (!String(emailParam).match(regex_email)) {
                await router.push("/signup");
            }
        })();
    }, []);

    return (
        <>
            <Header />
            <div>
                <Container
                    display="flex"
                    alignItems="center"
                    justify="center"
                    css={{ minHeight: "100vh" }}
                >
                    <Card css={{ mw: "420px", p: "20px" }} variant="bordered">
                        <Text
                            size={24}
                            weight="bold"
                            css={{
                                as: "center",
                                mb: "20px",
                            }}
                        >
                            {t("MailSent.mailsent")}
                        </Text>
                        <Spacer y={1} />
                        <Text
                            size={15}
                            css={{
                                as: "center",
                                mb: "20px",
                            }}
                        >
                            {t("MailSent.mailsentto", { email: emailParam })}
                        </Text>
                        <Spacer y={1} />
                        <Text
                            size={15}
                            css={{
                                as: "center",
                                mb: "20px",
                            }}
                        >
                            {resent ? t("MailSent.resent") : ""}
                        </Text>
                        <Spacer y={1} />
                        <Button
                            bordered
                            color="gradient"
                            auto
                            onClick={() => {
                                setLoading(true);
                            }}
                            disabled={is_resendable}
                            onPress={handleResend}
                        >
                            {loading ? <Loading /> : t("MailSent.resend")}
                        </Button>
                        <Spacer y={1} />
                        <Button
                            bordered
                            color="gradient"
                            auto
                            onClick={() => {
                                location.href = "/signup";
                            }}
                        >
                            {t("MailSent.back")}
                        </Button>
                        <Spacer y={1} />
                    </Card>
                </Container>
                <Footer />
            </div>
        </>
    );
}
