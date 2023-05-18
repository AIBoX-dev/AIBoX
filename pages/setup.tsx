import { Pagination,Card, Text, Container, Input, Spacer, Button, Checkbox, Row, Image } from "@nextui-org/react";
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { AtSign, Eye, Calendar } from 'react-feather';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/supabase';

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
    const router = useRouter();
    const { id: uid } = router.query;
    const { createProfile } = useAuth();
    const [displayName, setDisplayName] = React.useState("");
    const [dob, setDob] = React.useState("");
    const [userId, setUserId] = React.useState("");

    const handleProfile = () => {
        try {
            createProfile(uid as unknown as number, displayName, dob, userId);
        }
        catch (error) {
            console.log(error);
    };
};



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
                            onChange={(e) => setUserId(e.target.value)}
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
                            onChange={(e) => setDisplayName(e.target.value)}
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
                            onChange={(e) => setDob(e.target.value)}
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
