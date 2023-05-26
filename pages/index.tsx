import {
    Text,
    Image,
    Container,
    Spacer,
    Row,
    Col,
    Button,
    Input,
} from "@nextui-org/react";
import { GetStaticProps } from "next";
import { Inter } from "next/font/google";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { GitHub, Key, Mail, Search } from "react-feather";
import { AcmeLogo } from "../components/header/AcmeLogo";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "@/styles/Home.module.css";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ["common"])),
    },
});

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const { t } = useTranslation("common");
    return (
        <>
            <Header />
            <main className={`${styles.main} ${inter.className}`}>
                <Container
                    gap={2}
                    css={{
                        d: "flex",
                        flexWrap: "nowrap",
                        padding: "0rem 3rem 0rem",
                    }}
                >
                    <Container
                        css={{
                            width: "auto",
                        }}
                    >
                        <Text
                            h2
                            size="2.75rem"
                            weight="bold"
                            css={{
                                textGradient: "90deg, #F953C6, #F05E91",
                                letterSpacing: "inherit",
                            }}
                        >
                            AIクリエイターのための
                            <br />
                            支援サービス
                            <br />
                            「AIBoX」
                            <Spacer y={1} />
                        </Text>
                        <Text size="$lg" color="$gray800">
                            AIBoXを使ってあなたの作品で新たな可能性を切り開き、
                            <br />
                            さらに多くのファンへ届けましょう。
                        </Text>
                    </Container>
                    <Image
                        css={{
                            borderRadius: "1rem",
                        }}
                        objectFit="cover"
                        width={500}
                        src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                        alt="Default Image"
                    />
                </Container>
                <Spacer
                    y={2}
                    css={{
                        width: "90%",
                        borderTop: "2px solid $pink200",
                        marginTop: "5rem!important",
                        paddingBottom: "4.5rem",
                    }}
                />
                <Container
                    css={{
                        padding: "0rem 4rem 0rem",
                    }}
                >
                    <Row>
                        {[0, 1, 2].map((key) => {
                            return (
                                <Col key={key}>
                                    <Image
                                        css={{
                                            borderRadius: "1rem",
                                        }}
                                        width={370}
                                        src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                                        alt="Default Image"
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                    <Spacer y={1} />
                    <Row>
                        {[0, 1, 2].map((key) => {
                            return (
                                <Col key={key}>
                                    <Image
                                        css={{
                                            borderRadius: "1rem",
                                        }}
                                        width={370}
                                        src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                                        alt="Default Image"
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
                <Container className={`${styles.center}`}>
                    <Button size="lg" className={`${styles.animated_button} `}>
                        <Text weight="semibold" color="$white" size="lg">
                            AIクリエイターを探す
                        </Text>
                    </Button>
                </Container>
                <div
                    style={{
                        backgroundColor: "#FFF0FB",
                        width: "100vw",
                    }}
                >
                    <Spacer
                        y={2}
                        css={{
                            width: "90%",
                            marginTop: "1.5rem!important",
                            paddingBottom: "3rem",
                        }}
                    />
                    <Container
                        gap={2}
                        css={{
                            d: "flex",
                            flexWrap: "nowrap",
                            padding: "0rem 3rem 0rem",
                        }}
                    >
                        <Container
                            css={{
                                width: "auto",
                            }}
                        >
                            <Text
                                h3
                                weight="bold"
                                css={{
                                    letterSpacing: "inherit",
                                }}
                            >
                                クリエイターを探す
                            </Text>
                            <Spacer y={1} />
                            <Text size="$lg" color="$gray800">
                                AIを使って様々な作品を作るクリエイターたちを支援しよう
                            </Text>
                            <Spacer y={1} />
                            <Button
                                size="lg"
                                className={`${styles.animated_button} `}
                            >
                                <Text
                                    weight="semibold"
                                    color="$white"
                                    size="lg"
                                >
                                    AIクリエイターを探す
                                </Text>
                            </Button>
                        </Container>
                        <Image
                            css={{
                                borderRadius: "1rem",
                            }}
                            objectFit="cover"
                            width={500}
                            src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                            alt="Default Image"
                        />
                    </Container>
                    <Spacer y={3} />
                    <Container
                        gap={2}
                        css={{
                            d: "flex",
                            flexWrap: "nowrap",
                            padding: "0rem 3rem 0rem",
                        }}
                    >
                        <Image
                            css={{
                                borderRadius: "1rem",
                            }}
                            objectFit="cover"
                            width={500}
                            src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                            alt="Default Image"
                        />
                        <Container
                            css={{
                                width: "auto",
                            }}
                        >
                            <Text
                                h3
                                weight="bold"
                                css={{
                                    letterSpacing: "inherit",
                                }}
                            >
                                AIBoXを始める
                            </Text>
                            <Spacer y={1} />
                            <Text size="$lg" color="$gray800">
                                高い還元率であなたのクリエイター活動を支援します
                            </Text>
                            <Spacer y={1} />
                            <Button
                                size="lg"
                                className={`${styles.animated_button} `}
                            >
                                <Text
                                    weight="semibold"
                                    color="$white"
                                    size="lg"
                                >
                                    今すぐ始める
                                </Text>
                            </Button>
                        </Container>
                    </Container>
                    <Spacer y={3} />
                </div>
            </main>
            <Footer />
        </>
    );
}
