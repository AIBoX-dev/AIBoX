import {
    Modal,
    Container,
    Card,
    Row,
    Text,
    Col,
    Spacer,
    Button,
    Checkbox,
    Input,
    Grid,
    User,
    Avatar,
    Dropdown
} from "@nextui-org/react";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { Plus, ChevronDown } from "react-feather";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page C', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page D', uv: 420, pv: 2800, amt: 2400 }, { name: 'Page E', uv: 400, pv: 2400, amt: 2400 }];


export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ["common"])),
    },
});

export default function Dashboard() {
    const { t } = useTranslation("common");

    const [AddVisible, setAddVisible] = React.useState(false);
    const handleAddProfile = (e: any) => {
        setAddVisible(true);
        console.log("Add Profile");
    };

    const closer = () => {
        setAddVisible(false);
    };

    return (
        <>
            <div style={{
                "display": "grid",
                "gridTemplateRows": "auto 1fr",
                "minHeight": "100vh"
            }}>
                <Header />
                <Container css={{ marginTop: "10px", "height": "100%" }}>
                    <Text h1 size={33}>
                        {t("Dashboard.dashboard")}
                    </Text>
                    <hr></hr>
                    <Row>
                        <Col span={3}>
                            <Card variant="flat" css={{ "height": "100%" }}>
                                <Spacer y={1} />
                                <div style={{
                                    display: "flex", flexDirection: "column",
                                    textAlign: "center", "justifyContent": "center", "alignItems": "center"
                                }}>
                                    <Avatar
                                        src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                                        css={{ "size": "150px" }}

                                    />
                                    <Spacer y={1} />
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <Text h4 css={{
                                                display: "flex",
                                                alignItems: "center",
                                            }} >Profile 1 <ChevronDown
                                                    size={23}
                                                    style={{ marginLeft: "5px", paddingTop: "9px" }}
                                                /></Text>
                                        </Dropdown.Trigger>
                                        <Dropdown.Menu
                                            variant="light"
                                            aria-label="Actions"
                                        >
                                            <Dropdown.Item key="2">Profile 2</Dropdown.Item>
                                            <Dropdown.Item key="3">Profile 3</Dropdown.Item>
                                            <Dropdown.Item key="4">Profile 4</Dropdown.Item>
                                            <Dropdown.Item key="add" color="success" withDivider>
                                                Create New Profile...
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <Spacer y={3} />
                                <Container css={{ textAlign: "left" }}>
                                    <Text h4 weight={"medium"} color="error" >概要</Text>
                                    <Spacer y={2} />
                                    <Text h4 weight={"medium"}>プラン管理</Text>
                                    <Spacer y={2} />
                                    <Text h4 weight={"medium"}>パッケージ管理</Text>
                                    <Spacer y={2} />
                                    <Text h4 weight={"medium"}>収益管理</Text>
                                    <Spacer y={3} />
                                </Container>



                            </Card>
                        </Col>

                        <Col span={9}>
                            <Spacer y={1} />
                            <Container>
                                <Row gap={2}>
                                    <Col>
                                        <Card variant="bordered" css={{ "height": "25%" }}>
                                            <Card.Header>
                                                <Text h5>プラン管理</Text>
                                            </Card.Header>
                                            <Card.Body>
                                                ￥0
                                            </Card.Body>
                                        </Card>

                                    </Col>
                                    <Col>
                                        <Card variant="bordered" css={{ "height": "25%" }}>
                                            <Card.Header>
                                                <Text h5>パッケージ管理</Text>
                                            </Card.Header>
                                            <Card.Body>
                                                ￥0
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card variant="bordered" css={{ "height": "25%" }}>
                                            <Card.Header>
                                                <Text h5>パッケージ管理</Text>
                                            </Card.Header>
                                            <Card.Body>
                                                ￥0
                                            </Card.Body>
                                        </Card>

                                    </Col>
                                </Row>
                            </Container>
                            <Spacer y={1} />
                            <Container>
                                <Row gap={2}>
                                    <Col>
                                        <Card variant="bordered" css={{ "height": "500px" }}>
                                            <Card.Header>
                                                <Text h5>プラン管理</Text>
                                            </Card.Header>
                                            <Card.Body>
                                                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
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
            </div >
        </>
    );
}
