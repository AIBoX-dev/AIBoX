import Header from "@/components/Header";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from 'react';
import {
    Card,
    Spacer,
    Button,
    Text,
    Input,
    Row,
    Checkbox,
    Container,
} from '@nextui-org/react';
import { Mail, Key } from "react-feather";
import Link from "next/link";
import {useAuth} from "@/hooks/supabase";
import {Checks} from "@/hooks/check"


export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(
            locale!,
            ["common"],
        )),
    },
});

export default function Signup() {
    const { t } = useTranslation("common");
    const { signInWithGoogle } = useAuth();
    const { data, setData } = Checks();
    return (
        <>
            <Header />
            <div>
                <Container
                    display="flex"
                    alignItems="center"
                    justify="center"
                    css={{ minHeight: '100vh' }}
                >
                    <Card css={{ mw: '700', p: '20px' }} variant="bordered">
                        <Text
                            size={24}
                            weight="bold"
                            css={{
                                as: 'center',
                                mb: '20px',
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
                            value={data.email}
                            onChange={(event) => setData({...data, email: event.target.value})}
                        />
                        <p>{data.email_status}</p>
                        <Spacer y={1} />
                        <Input
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder={t("Signup.password")}
                            contentLeft={<Key />}
                            css={{ mb: '6px' }}
                            aria-labelledby="password"
                            type="password"
                            value = {data.password}
                            onChange={(event) => setData({...data, password: event.target.value})}
                        />
                        <Spacer y={1} />
                        <Input
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder={t("Signup.confirm_password")}
                            contentLeft={<Key />}
                            css={{ mb: '6px' }}
                            aria-labelledby="password"
                            type="password"
                        />
                        <Spacer y={1} />
                        <Checkbox>
                          <Text size={14}>{t("Signup.agree")}<Link href={"/agreements"}>{t("Signup.agreements")}</Link></Text>
                        </Checkbox>
                        <Spacer y={1} />
                        <Button bordered color="gradient" auto>{t("Signup.start")}</Button>
                        <Spacer y={1} />
                        <Button onClick={signInWithGoogle} bordered color="gradient" auto><Image height={18} width="18" src ="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google icon"/> <Spacer x={0.2} /> {t("Signup.google")}</Button>
                    </Card>
                </Container>
            </div>
        </>
    );
}
