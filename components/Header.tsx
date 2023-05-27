import { Navbar, Button, Link, Text, User, Dropdown, Input } from "@nextui-org/react";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";

import React, { useEffect, useState } from "react";
import { AcmeLogo } from "./header/AcmeLogo";
import { Layout } from "./header/Layout";
import SearchInput from "./header/SearchInput"

import { useAuth } from "@/hooks/auth";
import { useCookies } from "@/hooks/cookie";
import { database } from "@/hooks/database";

const login_disabled = process.env.NEXT_PUBLIC_DISABLE_LOGIN == "true" || false

interface Props {}

export default function Header(props: Props) {

    const [sessionData, setSessionData] = useState({
        logged: false,
        displayname: "",
        icon_url: "",
        account_id: "",
        email: "",
    });
    const router = useRouter();
    const { t } = useTranslation("common");
    const { logoutUser, getSessionUser } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState<Boolean>(false);

    useEffect(() => {
        getSessionUser(sessionData, setSessionData);
    }, []);

    if (sessionData.logged) {
    }
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
                {sessionData.logged ? (
                    <Dropdown placement="bottom-left">
                        <Dropdown.Trigger>
                            <User
                                src={sessionData.icon_url}
                                name={sessionData.displayname}
                            >
                                <User.Link href="https://nextui.org/">
                                    @{sessionData.account_id}
                                </User.Link>
                            </User>
                        </Dropdown.Trigger>
                        <Dropdown.Menu
                            color="secondary"
                            aria-label="Avatar Actions"
                        >
                            <Dropdown.Item
                                key="profile"
                                css={{ height: "$18" }}
                            >
                                <Text b color="inherit" css={{ d: "flex" }}>
                                    Signed in as
                                </Text>
                                <Text b color="inherit" css={{ d: "flex" }}>
                                    {sessionData.email}
                                </Text>
                            </Dropdown.Item>
                            <Dropdown.Item key="configurations" withDivider>
                                <Link href="/dashboard">Dashboard</Link>
                            </Dropdown.Item>
                            <Dropdown.Item key="settings">
                                Settings
                            </Dropdown.Item>
                            <Dropdown.Item key="help_and_feedback" withDivider>
                                Help & Feedback
                            </Dropdown.Item>
                            <Dropdown.Item
                                key="logout"
                                color="error"
                                withDivider
                            >
                                <a onClick={logoutUser}>Log Out</a>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <Navbar.Content>
                        <SearchInput onClick={() => {setIsSearchOpen(!isSearchOpen)}} isOpen={isSearchOpen} />
                        {!isSearchOpen &&
                        <Navbar.Item>
                            <Button
                                auto
                                color="error"
                                flat
                                as={Link}
                                href="/login"
                                disabled={login_disabled}
                            >
                                {t("Header.login")}
                            </Button>
                        </Navbar.Item>
                        }
                    </Navbar.Content>
                )}
            </Navbar>
        </Layout>
    );
}
