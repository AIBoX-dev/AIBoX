import { Navbar, Text, Link, Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { AcmeLogo } from "./header/AcmeLogo";
import { Layout } from "./header/Layout";

export default function Footer() {
    const { t } = useTranslation("common");
    return (
        <div
            style={{
                height: "100%",
                position: "sticky",
                bottom: "0px",
                top: "100vh",
            }}
        >
            <Layout>
                <Navbar isBordered>
                    <Navbar.Brand>
                        <Link href="/" color={"text"}>
                            <AcmeLogo />
                            <Text b color="inherit" hideIn="xs">
                                AIBoX
                            </Text>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Content activeColor="error" variant="underline">
                        <Navbar.Link href="/">{t("Header.home")}</Navbar.Link>
                        <Navbar.Link href="/about">
                            {t("Header.about")}
                        </Navbar.Link>
                        <Navbar.Link href="/notice">
                            {t("Header.notice")}
                        </Navbar.Link>
                    </Navbar.Content>
                </Navbar>
            </Layout>
        </div>
    );
}
