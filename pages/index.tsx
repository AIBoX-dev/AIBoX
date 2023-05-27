import {
    Text,
    Image,
    Container,
    Spacer,
    Row,
    Col,
    Button,
    Grid,
    Card,
} from "@nextui-org/react";
import { GetStaticProps } from "next";
import { Inter } from "next/font/google";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { GitHub, Key, Mail, Search } from "react-feather";
import { AcmeLogo } from "../components/header/AcmeLogo";
import useMediaQuery from "../hooks/mediaquery";
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
    const isxs = useMediaQuery('(max-width: 650px)')
    const issm = useMediaQuery('(max-width: 960px)')
    const ismd = useMediaQuery('(max-width: 1280px)')
    const islg = useMediaQuery('(max-width: 1400px)')
    const isxl = useMediaQuery('(max-width: 1920px)')

    return (
        <>
            <Header />
            <main className={`${styles.main} ${inter.className}`} style={{
                paddingTop: issm ? "3rem" : "6rem"
            }}>
                <Container
                    md
                >
                    <Row gap={1.5} css={{
                        flexDirection: issm ? "column" : "row",
                        margin: "0px"
                    }}>
                        <Col css={{
                            padding: "0px"
                        }}>
                            <Container
                                css={{
                                    width: "auto",
                                    padding: isxs ? "0px" : ""
                                }}
                            >
                                <Text
                                    h2
                                    size={isxs ? "1.75rem" : issm ? "2.2rem" : "2.5rem"}
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
                                </Text>
                                <Spacer y={2} />
                                <Text size="$lg" color="$gray800">
                                    AIBoXを使ってあなたの作品で新たな可能性を切り開き、
                                    <br />
                                    さらに多くのファンへ届けましょう。
                                </Text>
                                {/* <Text>
                                    {"xs: " + isxs} {"sm: " + issm} {"md: " + ismd} {"lg: " + islg} {"xl: " + isxl}
                                </Text> */}
                            </Container>
                        </Col>
                        {issm && <Spacer y={2} />}
                        <Col css={{
                            padding: "0px"
                        }}>
                            <Image
                                css={{
                                    borderRadius: "1rem",
                                }}
                                objectFit="cover"
                                src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                                alt="Default Image"
                            />
                        </Col>
                    </Row>
                </Container>
                <Spacer
                    y={2}
                    css={{
                        width: "80%",
                        borderTop: "2px solid $pink200",
                        marginTop: "5rem!important",
                        paddingBottom: "4.5rem",
                    }}
                />
                <Container
                    md
                    gap={2}
                >
                    <Row gap={1.5} css={{
                        flexDirection: issm ? "column" : "row",
                        margin: "0px"
                    }}>
                        {[0, 1, 2].map((key) => {
                            return (
                                <Col key={key} css={{
                                    padding: issm ? "0px" : ""
                                }}>
                                    <Image
                                        css={{
                                            borderRadius: "1rem",
                                        }}
                                        src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                                        alt="Default Image"
                                    />
                                    {issm && <Spacer y={1} />}
                                </Col>
                            );
                        })}
                    </Row>
                    {!issm && <Spacer y={1} />}
                    <Row gap={1.5} css={{
                        flexDirection: issm ? "column" : "row",
                        margin: "0px"
                    }}>
                        {[0, 1, 2].map((key) => {
                            return (
                                <Col key={key} css={{
                                    padding: issm ? "0px" : ""
                                }}>
                                    <Image
                                        css={{
                                            borderRadius: "1rem",
                                        }}
                                        src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                                        alt="Default Image"
                                    />
                                    {issm && <Spacer y={1} />}
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
                <Container className={`${styles.center}`} style={{
                    paddingTop: issm ? "3rem" : "6rem"
                }}>
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
                    <Row
                        gap={2}
                        css={{
                            padding: "0rem 3rem 0rem",
                            flexDirection: issm ? "column-reverse" : "row",
                            margin: "0px"
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
                        {issm && <Spacer y={1.5} />}
                        <Image
                            css={{
                                borderRadius: "1rem",
                            }}
                            objectFit="cover"
                            width={500}
                            src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                            alt="Default Image"
                        />
                    </Row>
                    <Spacer y={3} />
                    <Row
                        gap={2}
                        css={{
                            padding: "0rem 3rem 0rem",
                            flexDirection: issm ? "column" : "row",
                            margin: "0px"
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
                        {issm && <Spacer y={1.5} />}
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
                    </Row>
                    <Spacer y={3} />
                </div>
            </main>
            <Footer />
        </>
    );
}
