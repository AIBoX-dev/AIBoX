import Header from "@/components/Header";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import {
    Card,
    Spacer,
    Button,
    Text,
    Input,
    Row,
    Checkbox,
    Container,
} from "@nextui-org/react";
import { Mail, Key } from "react-feather";
import {Checks} from "@/hooks/check"


export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ["common"])),
    },
});

export default function Login() {
    const { t } = useTranslation("common");
    const { userdata, setUserdata } = Checks();
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
                    <Card css={{ mw: "700", p: "20px" }} variant="bordered">
                        <Text
                            size={24}
                            weight="bold"
                            css={{
                                as: "center",
                                mb: "20px",
                            }}
                        >
                            {t("Login.login")}
                        </Text>
                        <Input
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder={t("Login.email")}
                            contentLeft={<Mail />}
                            aria-labelledby="email"
                            type="email"
                            value={userdata.email}
                            onChange={(event) => setUserdata({...userdata, email: event.target.value})}
                        />
                        {!userdata.email_status && <p>{t("Check.wrongemail")}</p>}
                        <Spacer y={1} />
                        <Input
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder={t("Login.password")}
                            contentLeft={<Key />}
                            css={{ mb: "6px" }}
                            aria-labelledby="password"
                            type="password"
                            value = {userdata.password}
                            onChange={(event) => setUserdata({...userdata, password: event.target.value})}
                        />
                        <Row justify="space-between">
                            <Checkbox>
                                <Text size={14}>{t("Login.remember")}</Text>
                            </Checkbox>
                            <Text size={14}>{t("Login.forgot")}</Text>
                        </Row>
                        <Spacer y={1} />
                        <Button bordered color="gradient" auto>
                            {t("Login.login")}
                        </Button>
                        <Spacer y={1} />
                        <Button bordered color="gradient" auto>
                            <Image
                                height="18"
                                width="18"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="Google icon"
                            />{" "}
                            <Spacer x={0.2} /> {t("Login.google")}
                        </Button>
                    </Card>
                </Container>
            </div>
        </>
    );
}
