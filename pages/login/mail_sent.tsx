import { Card, Container, Text, Button, Spacer, Input, Row } from "@nextui-org/react";

import { GetStaticProps } from "next";

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Footer from "@/components/Footer";
import Header from "@/components/Header";



export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(
            locale!,
            ["common"],
        )),
    },
});

export default function MailSent() {
    const { t } = useTranslation("common");
    const router = useRouter();
    const { email: emailParam } = router.query;


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
                        <Button bordered color="gradient" auto>
                            {t("MailSent.resend")}
                        </Button>
                        <Spacer y={1} />
                        <Button bordered color="gradient" auto>
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
