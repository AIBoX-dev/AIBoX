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
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { Mail, Key, AlertTriangle } from "react-feather";
import Header from "@/components/Header";
import { Checks } from "@/hooks/check";
import { useAuth } from "@/hooks/supabase";
import { Turnstile } from "@marsidev/react-turnstile";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ["common"])),
    },
});

export default function Signup() {
    const { t } = useTranslation("common");
    const { signInWithGoogle, createUser } = useAuth();
    const { userdata, setUserdata, CheckrRequirements } = Checks();
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
                            {t("Signup.signup")}
                        </Text>
                        <Input
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder={t("Signup.email")}
                            contentLeft={<Mail />}
                            aria-labelledby="email"
                            value={userdata.email}
                            onChange={(event) =>
                                setUserdata({
                                    ...userdata,
                                    email: event.target.value,
                                })
                            }
                        />
                        {userdata.email_status && (
                            <Text
                                color="error"
                                size={14}
                                css={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <AlertTriangle
                                    style={{
                                        marginRight: "5px",
                                    }}
                                />
                                {t("Check.wrongemail")}
                            </Text>
                        )}
                        <Spacer y={1} />
                        <Input.Password
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder={t("Signup.password")}
                            contentLeft={<Key />}
                            css={{ mb: "6px" }}
                            aria-labelledby="password"
                            type="password"
                            value={userdata.password}
                            onChange={(event) =>
                                setUserdata({
                                    ...userdata,
                                    password: event.target.value,
                                })
                            }
                        />
                        {!userdata.pw_length && (
                            <Text
                                color="error"
                                size={14}
                                css={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <AlertTriangle
                                    style={{
                                        marginRight: "5px",
                                    }}
                                />
                                {t("Check.pw_length")}
                            </Text>
                        )}
                        {!userdata.pw_include_symbol && (
                            <Text
                                color="error"
                                size={14}
                                css={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <AlertTriangle
                                    style={{
                                        marginRight: "5px",
                                    }}
                                />
                                {t("Check.pw_include_symbol")}
                            </Text>
                        )}
                        <Spacer y={1} />
                        <Input.Password
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder={t("Signup.confirm_password")}
                            contentLeft={<Key />}
                            css={{ mb: "6px" }}
                            aria-labelledby="password"
                            type="password"
                            value={userdata.confirm_password}
                            onChange={(event) =>
                                setUserdata({
                                    ...userdata,
                                    confirm_password: event.target.value,
                                })
                            }
                        />
                        {!userdata.confirm_status && (
                            <Text
                                color="error"
                                size={14}
                                css={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <AlertTriangle
                                    style={{
                                        marginRight: "5px",
                                    }}
                                />
                                {t("Check.confirm_notmatch")}
                            </Text>
                        )}
                        <Spacer y={1} />
                        <Checkbox
                            onChange={() =>
                                setUserdata({
                                    ...userdata,
                                    tos_status: !userdata.tos_status,
                                })
                            }
                        >
                            <Text size={14}>
                                {t("Signup.agree")}
                                <Link href={"/agreements"}>
                                    {t("Signup.agreements")}
                                </Link>
                            </Text>
                        </Checkbox>
                        <Spacer y={1} />
                        <Turnstile
                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                            // sitekey=1x00000000000000000000AA
                            className=""
                            options={{
                                action: "submit-form",
                                theme: "light",
                            }}
                        />
                        <Spacer y={1} />
                        <Button
                            onPress={() =>
                                CheckrRequirements(
                                    userdata.email,
                                    userdata.password,
                                    createUser
                                )
                            }
                            bordered
                            color="gradient"
                            auto
                        >
                            {t("Signup.start")}
                        </Button>
                        <Spacer y={1} />
                        <Button
                            onPress={signInWithGoogle}
                            bordered
                            color="gradient"
                            auto
                        >
                            <Image
                                height={18}
                                width="18"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="Google icon"
                            />{" "}
                            <Spacer x={0.2} /> {t("Signup.google")}
                        </Button>
                    </Card>
                </Container>
            </div>
        </>
    );
}
