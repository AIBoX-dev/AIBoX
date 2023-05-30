import { Container, Text, Switch, Spacer, Button, Row, Col } from "@nextui-org/react";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ["common"])),
    },
});

export default function Settings() {
    const { t } = useTranslation("common");
    return (
        <>
        <div style={{
                "display": "grid",
                "gridTemplateRows": "auto 1fr",
                "minHeight": "100vh"
            }}>
            <Header />
            <Container>

                <Text h1>
                    設定
                </Text>
                <hr />
                <Spacer y={1} />
                <Row gap={3}>
                    <Col span={6}>
                <Text h3>
                    表示設定
                </Text>
                <Spacer y={1} />
                <Text>
                    R18作品を表示する
                </Text>
                <Spacer y={0.5} />
                <Switch />
                <Spacer y={1} />
                <Text>
                    R18G作品を表示する
                </Text>
                <Spacer y={0.5} />
                <Switch />
                <Spacer y={1} />
                <Text h3>
                    決済情報
                </Text>
                <Spacer y={1} />
                <Button color="success"  auto>
                    決済情報を追加
                </Button>
                <Spacer y={1} />
                </Col>
                <Col span={6}>
                <Text h3>
                    アカウント
                </Text>
                <Spacer y={1} />
                <Text h4>
                    メールアドレスの変更
                </Text>
                <Spacer y={1} />
                <Button color="warning" bordered auto>
                    メールアドレスを変更
                </Button>
                <Spacer y={1} />
                <Text h4>
                    パスワードの変更
                </Text>
                <Spacer y={1} />
                <Button color="warning" bordered auto>
                    パスワードを変更
                </Button>
                <Spacer y={1} />
                <Text h4>
                    二段階認証の有効化
                </Text>
                <Spacer y={1} />
                <Button color="gradient" bordered auto>
                    二段階認証を有効化
                </Button>
                <Spacer y={1} />
                <Text h4>
                    アカウントの休止
                </Text>
                <Spacer y={1} />
                <Button color="error" bordered auto>
                    アカウントを休止
                </Button>
                <Spacer y={1} />
                <Text h4>
                    アカウントの削除
                </Text>
                <Spacer y={1} />
                <Button color="error" auto>
                    アカウントを削除
                </Button>
                </Col>
                </Row>
            </Container>
            <Footer />
        </div>
        </>
    );
}