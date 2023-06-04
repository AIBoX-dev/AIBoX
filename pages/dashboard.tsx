import {
    Container,
    Card,
    Row,
    Text,
    Col,
    Spacer,
    Link,
    Avatar,
    Button,
    Dropdown
} from "@nextui-org/react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";
import { Plus, ChevronDown } from "react-feather";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/auth";
import useMediaQuery from "@/hooks/mediaquery";

const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page C", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page D", uv: 420, pv: 2800, amt: 2400 },
    { name: "Page E", uv: 400, pv: 2400, amt: 2400 },
];

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ["common"])),
    },
});

export default function Dashboard() {
    const { t } = useTranslation("common");
    const isxs = useMediaQuery("(min-width: 650px)");
    const issm = useMediaQuery("(max-width: 960px)");

    const [AddVisible, setAddVisible] = React.useState(false);
    const [sessionData, setSessionData] = useState({
        logged: false,
        displayname: "",
        icon_url: "",
        account_id: "",
        email: "",
    });
    const { logoutUser, getSessionUser } = useAuth();
    const router = useRouter();

    const handleAddProfile = (e: any) => {
        setAddVisible(true);
        console.log("Add Profile");
    };

    const closer = () => {
        setAddVisible(false);
    };

    useEffect(() => {
        getSessionUser(sessionData, setSessionData);
        // if (!sessionData.logged) {
        //     router.push("/")
        // }
    }, []);

    return (
        <>
            <div
                style={{
                    display: "grid",
                    gridTemplateRows: "auto 1fr",
                    minHeight: "100vh",
                }}
            >
                <Header />
                <Container css={{
                    marginTop: "10px",
                    height: "100%",
                    flexDirection: issm ? "column" : "row",
                    padding: "0px",
                }}>
                    <Text
                        size={issm ? "$2xl" : "$3xl"}
                        weight={"semibold"}
                        css={{ 
                            padding: issm ? "0.4rem" : "1rem",
                            paddingLeft: issm ? "1rem": "",
                        }}
                    >
                        {t("Dashboard.dashboard")}
                    </Text>
                    <Spacer
                        y={2}
                        css={{
                            width: "100%",
                            borderTop: "2px solid $pink200",
                            marginTop: "0.5rem!important",
                            marginLeft: "0px!important",
                            paddingBottom: "2.5rem",
                        }}
                    />
                    <Row css={{
                        margin: "0px",
                        padding: "0px",
                    }}>
                        {isxs &&
                        <Col span={2.5}>
                            <Card variant="flat" css={{ height: "100vh" }}>
                                <Spacer y={1} />
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        textAlign: "center",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Avatar
                                        src={sessionData.icon_url}
                                        css={{ size: "100px" }}
                                    />
                                    <Spacer y={1} />
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <Text
                                                h4
                                                className="flex"
                                            >
                                                Profile 1
                                                <ChevronDown
                                                    size={23}
                                                    style={{
                                                        marginLeft: "5px",
                                                        paddingTop: "9px",
                                                    }}
                                                />
                                            </Text>
                                        </Dropdown.Trigger>
                                        <Dropdown.Menu
                                            variant="light"
                                            aria-label="Actions"
                                        >
                                            <Dropdown.Item key="2">
                                                Profile 2
                                            </Dropdown.Item>
                                            <Dropdown.Item key="3">
                                                Profile 3
                                            </Dropdown.Item>
                                            <Dropdown.Item key="4">
                                                Profile 4
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                key="add"
                                                color="error"
                                                withDivider
                                            >
                                                新しいプロファイルを作成
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <Spacer y={2} />
                                <Button color="error" css={{ marginLeft: "auto", marginRight: "auto", backgroundColor: "var(--nextui-colors-error)!important" }}>投稿する</Button>
                                <Spacer y={2} />
                                <Container css={{ textAlign: "left", width: "80%", marginLeft: "auto", marginRight: "auto" }}>
                                    <Link href="#" color="error" css={{ fontSize: "1.1rem" }}>概要</Link>
                                    <Spacer y={1} />
                                    <Link href="#" color="text" css={{ fontSize: "1.1rem" }}>プラン管理</Link>
                                    <Spacer y={1} />
                                    <Link href="#" color="text" css={{ fontSize: "1.1rem" }}>パッケージ管理</Link>
                                    <Spacer y={1} />
                                    <Link href="#" color="text" css={{ fontSize: "1.1rem" }}>収益管理</Link>
                                    <Spacer y={2} />
                                </Container>
                            </Card>
                        </Col>}
                        <Col span={issm ? 12 : 9}>
                            {!issm && <Spacer y={1} />}
                            <Container css={{
                                padding: issm ? "0px" : "",
                            }}>
                                <Row gap={2} css={{
                                    margin: issm ? "0px" : "",
                                    padding: issm ? "0px" : "",
                                    flexDirection: issm ? "column" : "row",
                                    rowGap: issm ? "1rem" : "0rem"
                                }}>
                                    <Col>
                                        <Card
                                            variant="bordered"
                                            css={{ height: "40%" }}
                                        >
                                            <Card.Header>
                                                <Text h5 weight="semibold">総収益</Text>
                                            </Card.Header>
                                            <Card.Body css={{ padding: "1rem" }}>
                                                <Text size={"$2xl"} weight="semibold">0</Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card
                                            variant="bordered"
                                            css={{ height: "40%" }}
                                        >
                                            <Card.Header>
                                                <Text h5 weight="semibold">フォロワー数</Text>
                                            </Card.Header>
                                            <Card.Body css={{ padding: "1rem" }}>
                                                <Text size={"$2xl"} weight="semibold">0</Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card
                                            variant="bordered"
                                            css={{ height: "40%" }}
                                        >
                                            <Card.Header>
                                                <Text h5 weight="semibold">支援者数</Text>
                                            </Card.Header>
                                            <Card.Body css={{ padding: "1rem" }}>
                                                <Text size={"$2xl"} weight="semibold">0</Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                            <Spacer y={1} />
                            <Container css={{
                                padding: issm ? "0px" : "",
                            }}>
                                <Row gap={2} css={{
                                    margin: issm ? "0px" : "",
                                    padding: issm ? "0px" : "",
                                }}>
                                    <Col>
                                        <Card
                                            variant="bordered"
                                            css={{ height: "500px" }}
                                        >
                                            <Card.Header>
                                                <Text h5 weight="semibold">概要</Text>
                                            </Card.Header>
                                            <Card.Body>
                                                <LineChart
                                                    data={data}
                                                    margin={{
                                                        top: 5,
                                                        right: 20,
                                                        bottom: 5,
                                                        left: 0,
                                                    }}
                                                >
                                                    <Line
                                                        type="monotone"
                                                        dataKey="uv"
                                                        stroke="#8884d8"
                                                    />
                                                    <CartesianGrid
                                                        stroke="#ccc"
                                                        strokeDasharray="5 5"
                                                    />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                </LineChart>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                            <Spacer y={2} />
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        </>
    );
}
