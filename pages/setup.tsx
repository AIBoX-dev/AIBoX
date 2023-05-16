import React from 'react';
import { Pagination,Card, Text, Container, Input, Spacer, Button, Checkbox, Row, Image } from "@nextui-org/react";
import Header from '@/components/Header';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { AtSign, Eye, Calendar } from 'react-feather';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(
            locale!,
            ["common"],
        )),
    },
});

export default function Setup() {
    const { t } = useTranslation("common");
    return(
        <>
        <Header />
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
                            {t("Setup.setup")}
                        </Text>
                        <Input
                            clearable
                            bordered
                            fullWidth

                            size="lg"
                            label={t("Setup.user_id")}
                            labelLeft={<AtSign />}
                            placeholder={t("Setup.user_id")}
                            aria-labelledby="user id"
                            type="text"
                        />
                        <Spacer y={1} />
                        <Input
                            clearable
                            bordered
                            fullWidth

                            size="lg"
                            label={t("Setup.display_name")}
                            labelLeft={<Eye />}
                            placeholder={t("Setup.display_name")}
                            css={{ mb: "6px" }}
                            aria-labelledby="display_name"
                            type="text"
                        />
                        <Spacer y={1} />
                        <Input
                            clearable
                            bordered
                            fullWidth

                            size="lg"
                            label={t("Setup.dob")}
                            placeholder={t("Setup.dob")}
                            css={{ mb: "6px" }}
                            aria-labelledby="display_name"
                            labelLeft={<Calendar />}
                            type="datetime-local"
                        />
                        <Spacer y={1} />
                        <Button bordered color="gradient" auto>
                            {t("Setup.start")}
                        </Button>
                        <Spacer y={1} />
                    </Card>
                </Container>
        </>
    )
}
