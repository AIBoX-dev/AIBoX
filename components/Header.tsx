import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { AcmeLogo } from "./header/AcmeLogo";
import { Layout } from "./header/Layout";

export default function Header(props: any) {
    const router = useRouter();
    const { t } = useTranslation("common");
    return (
        <Layout>
            <Navbar isBordered variant="floating">
                <Navbar.Brand>
                    <Navbar.Toggle aria-label="toggle navigation" showIn="xs" />
                    <Link href="/" color={"text"}>
                        <AcmeLogo />
                        <Text b color="inherit" hideIn="xs">
                            AIBoX
                        </Text>
                    </Link>
                </Navbar.Brand>
                <Navbar.Content
                    activeColor="error"
                    hideIn="xs"
                    variant="underline"
                >
                    <Navbar.Link isActive={router.pathname === "/"} href="/">
                        {t("Header.home")}
                    </Navbar.Link>
                    <Navbar.Link
                        isActive={router.pathname === "/about"}
                        href="/about"
                    >
                        {t("Header.about")}
                    </Navbar.Link>
                    <Navbar.Link
                        isActive={router.pathname === "/creators"}
                        href="/creators"
                    >
                        {t("Header.creators")}
                    </Navbar.Link>
                    <Navbar.Link
                        isActive={router.pathname === "/notice"}
                        href="/notice"
                    >
                        {t("Header.notice")}
                    </Navbar.Link>
                </Navbar.Content>
                <Navbar.Collapse>
                    <Navbar.CollapseItem>
                        <Link color="inherit" href="/">
                            {t("Header.home")}
                        </Link>
                    </Navbar.CollapseItem>
                    <Navbar.CollapseItem>
                        <Link color="inherit" href="/about">
                            {t("Header.about")}
                        </Link>
                    </Navbar.CollapseItem>
                    <Navbar.CollapseItem>
                        <Link color="inherit" href="/creators">
                            {t("Header.creators")}
                        </Link>
                    </Navbar.CollapseItem>
                    <Navbar.CollapseItem>
                        <Link color="inherit" href="/notice">
                            {t("Header.notice")}
                        </Link>
                    </Navbar.CollapseItem>
                </Navbar.Collapse>
                <Navbar.Content>
                    <Navbar.Link color="primary" href="/login">
                        {t("Header.login")}
                    </Navbar.Link>
                    <Navbar.Item>
                        <Button
                            auto
                            color="error"
                            flat
                            as={Link}
                            href="/signup"
                        >
                            {t("Header.signup")}
                        </Button>
                    </Navbar.Item>
                </Navbar.Content>
            </Navbar>
        </Layout>
    );
}
