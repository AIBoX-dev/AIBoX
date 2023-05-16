import { Container, Card, Row, Text, Col, Spacer } from "@nextui-org/react";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

  return (
    <>
    <div>
    <Header />
    <Container fluid css={{marginTop: "10px"}}>
        <Text h1 size={40} color="black" >
            {t("Dashboard.dashboard")}
        </Text>
      <Row gap={1}>
        <Col>
          <Card >
            <Card.Header>
                <Text h2 size={30} color="black" >
                    My Profiles
                </Text>
            </Card.Header>
            <Card.Body>
              <Text h6 size={15} color="black" >
                1 of 2
              </Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Spacer y={1} />
      <Row gap={1}>
        <Col>
          <Card >
            <Card.Header>
                <Text h2 size={30} color="black" >
                    My Assets
                </Text>
            </Card.Header>
            <Card.Body>
              <Text h6 size={15} color="black" >
                1 of 2
              </Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Spacer y={1} />
      <Row gap={1}>
        <Col>
          <Card >
            <Card.Header>
                <Text h2 size={30} color="black" >
                    My Plans
                </Text>
            </Card.Header>
            <Card.Body>
              <Text h6 size={15} color="black" >
                1 of 2
              </Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row gap={1}>
        <Col>
          <Card >
            <Card.Header>
                <Text h2 size={30} color="black" >
                    Support
                </Text>
            </Card.Header>
            <Card.Body>
              <Text h6 size={15} color="black" >
                1 of 2
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
