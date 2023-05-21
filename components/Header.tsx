import { Navbar, Button, Link, Text, User, Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";

import React from "react";
import { AcmeLogo } from "./header/AcmeLogo";
import { Layout } from "./header/Layout";

interface Props { }

export default function Header(props: Props) {
    const router = useRouter();
    const { t } = useTranslation("common");
    const [logged, setLogged] = React.useState(true);
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
                {logged ? (
                    <Dropdown placement="bottom-left">
                        <Dropdown.Trigger>
                            <User
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                name="Ariana Wattson"
                            >
                                <User.Link href="https://nextui.org/">@watsonari</User.Link>
                            </User>
                        </Dropdown.Trigger>
                        <Dropdown.Menu color="secondary" aria-label="Avatar Actions">
                            <Dropdown.Item key="profile" css={{ height: "$18" }} >
                                <Text b color="inherit" css={{ d: "flex" }}>
                                    Signed in as
                                </Text>
                                <Text b color="inherit" css={{ d: "flex" }}>
                                    zoey@example.com
                                </Text>
                            </Dropdown.Item>
                            <Dropdown.Item key="configurations" withDivider>Dashboard</Dropdown.Item>
                            <Dropdown.Item key="settings" >
                                Settings
                            </Dropdown.Item>
                            <Dropdown.Item key="help_and_feedback" withDivider>
                                Help & Feedback
                            </Dropdown.Item>
                            <Dropdown.Item key="logout" color="error" withDivider>
                                Log Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <Navbar.Content>
                        <Navbar.Link color="primary" href="/login">
                            {t("Header.logiSn")}
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
                )}
            </Navbar>
        </Layout>
    );
}
