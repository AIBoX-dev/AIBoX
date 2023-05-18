import { Modal, Container, Card, Row, Text, Col, Spacer, Button, Checkbox, Input } from "@nextui-org/react";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { Plus } from "react-feather";
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
            <div>
                <Header />
                <Container fluid css={{ marginTop: "10px" }}>
                    <Text h1 size={33}  >
                        {t("Dashboard.dashboard")}
                    </Text>
                    <Row gap={1}>
                        <Col>
                            <Row gap={1}>
                                <Card variant="bordered">
                                    <Card.Header>
                                        <Text weight="normal" size="$xl"  >
                                            {t("Dashboard.addProfile")}
                                        </Text>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row gap={1}>
                                            <Card variant="bordered" onClick={handleAddProfile} css={{ "border": "thin", "borderColor": "#000000", "borderStyle": "dashed", width: "200px", height: "300px" }}>
                                                <Card.Body>
                                                    <Plus style={{ width: "60%", height: "60%", marginLeft: "20%", marginTop: "20%", strokeWidth: "0.5px" }} />
                                                    <Text weight={"light"} size={20} style={{ textAlign: "center" }}>
                                                        {t("Dashboard.addProfile")}
                                                    </Text>
                                                </Card.Body>
                                            </Card>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Row>

                        </Col>

                    </Row>
                    <Modal
                        closeButton
                        blur
                        aria-labelledby="modal-title"
                        open={AddVisible}
                        onClose={closer}
                    >
                        <Modal.Header>
                            <Text id="modal-title" size={18}>
                                Welcome to
                                <Text b size={18}>
                                    NextUI
                                </Text>
                            </Text>
                        </Modal.Header>
                        <Modal.Body>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="lg"
                                placeholder="Email"
                            />
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="lg"
                                placeholder="Password"
                            />
                            <Row justify="space-between">
                                <Checkbox>
                                    <Text size={14}>Remember me</Text>
                                </Checkbox>
                                <Text size={14}>Forgot password?</Text>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button auto flat color="error" onPress={closer}>
                                Close
                            </Button>
                            <Button auto onPress={closer}>
                                Sign in
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Spacer y={1} />
                    <Row gap={1}>
                        <Col>
                            <Card variant="bordered">
                                <Card.Header>
                                    <Text weight="normal" size="$xl"  >
                                        {t("Dashboard.assets")}
                                    </Text>
                                </Card.Header>
                                <Card.Body>
                                <Row gap={1}>
                                            <Card variant="bordered" onClick={handleAddProfile} css={{ "border": "thin", "borderColor": "#000000", "borderStyle": "solid", width: "100px", height: "100px" }}>
                                                <Card.Body>
                                                </Card.Body>
                                            </Card>
                                        </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Spacer y={1} />
                    <Row gap={1}>
                        <Col>
                            <Card variant="bordered">
                                <Card.Header>
                                    <Text weight="normal" size="$xl"  >
                                        {t("Dashboard.plans")}
                                    </Text>
                                </Card.Header>
                                <Card.Body>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Spacer y={1} />
                    <Row gap={1}>
                        <Col>
                            <Card variant="bordered">
                                <Card.Header>
                                    <Text weight="normal" size="$xl"  >
                                        {t("Dashboard.packages")}
                                    </Text>
                                </Card.Header>
                                <Card.Body>
                                    <Text h6 size={15}  >
                                    </Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Spacer y={1} />
                    <Row gap={1}>
                        <Col>
                            <Card variant="bordered">
                                <Card.Header>
                                    <Text weight="normal" size="$xl"  >
                                        {t("Dashboard.earnings")}
                                    </Text>
                                </Card.Header>
                                <Card.Body>
                                    <Text h6 size={15}  >
                                    </Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Spacer y={1} />
                    <Spacer y={1} />
                </Container>
                <Footer />
            </div>
        </>
    );
}
