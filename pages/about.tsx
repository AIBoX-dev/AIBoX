import {
    Grid,
    Card,
    Spacer,
    Button,
    Text,
    Input,
    Row,
    Checkbox,
    Container,
    Image,
} from "@nextui-org/react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { Mail, Key } from "react-feather";
import Header from "@/components/Header";
import { Checks } from "@/hooks/check";
import { useAuth } from "@/hooks/supabase";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ["common"])),
    },
});

export default function About() {
    const { t } = useTranslation("common");
    return (
        <>
            <Header />
            <div>
                <Grid.Container gap={2} justify="center">
                    <Grid xs={4} justify="center">
                        <Text
                            h1
                            css={{
                                textGradient:
                                    "45deg, $pink600 -20%, $purple600 100%",
                            }}
                        >
                            {t("About.creator")}
                            <br />
                            {t("About.patron")}
                            <br />
                            {t("About.aibox")}
                        </Text>
                    </Grid>
                    <Grid xs={4} justify="center">
                        <Image
                            width={320}
                            height={270}
                            src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                            alt="Default Image"
                        />
                    </Grid>
                </Grid.Container>
            </div>
            <div>
                <Grid.Container gap={2} justify="center">
                    <Grid xs={4} justify="center">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Image
                                src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                                alt="Default Image"
                                width={450}
                                height={270}
                            />
                        </div>
                    </Grid>
                    <Grid xs={4} justify="center">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Image
                                src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                                alt="Default Image"
                                width={450}
                                height={270}
                            />
                        </div>
                    </Grid>
                    <Grid xs={4} justify="center">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Image
                                src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                                alt="Default Image"
                                width={450}
                                height={270}
                            />
                        </div>
                    </Grid>
                </Grid.Container>
            </div>
        </>
    );
}
