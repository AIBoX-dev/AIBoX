import { Navbar, Text, Link, Button } from '@nextui-org/react';
import { Layout } from './header/Layout';
import { AcmeLogo } from './header/AcmeLogo';
import { useRouter } from 'next/router';
import { useTranslation } from "next-i18next";

export default function Footer() {
    const { t } = useTranslation("common");
    const router = useRouter();
    return (
        <>
            <Layout>
            <Navbar isBordered>
                <Navbar.Brand>
                    <Navbar.Toggle aria-label="toggle navigation" showIn="xs" />
                    <Link href="/" color={"text"}>
                        <AcmeLogo />
                        <Text b color="inherit" hideIn="xs">
                            AIBoX
                        </Text>
                    </Link>
                </Navbar.Brand>
                <Navbar.Content activeColor="error" hideIn="xs" variant="underline">
                    <Navbar.Link
                        href="/"
                    >
                        
                        {t('Header.home')}
                    </Navbar.Link>
                    <Navbar.Link
                        href="/about"
                    >
                        {t('Header.about')}
                    </Navbar.Link>
                    <Navbar.Link
                        href="/notice"
                    >
                        {t('Header.notice')}
                    </Navbar.Link>
                </Navbar.Content>
                <Navbar.Collapse>
                    <Navbar.CollapseItem>
                        <Link color="inherit" href="/">
                            {t('Header.home')}
                        </Link>
                    </Navbar.CollapseItem>
                    <Navbar.CollapseItem>
                        <Link color="inherit" href="/about">
                            {t('Header.about')}
                        </Link>
                    </Navbar.CollapseItem>
                    <Navbar.CollapseItem>
                        <Link color="inherit" href="/creators">
                            {t('Header.creators')}
                        </Link>
                    </Navbar.CollapseItem>
                    <Navbar.CollapseItem>
                        <Link color="inherit" href="/notice">
                            {t('Header.notice')}
                        </Link>
                    </Navbar.CollapseItem>
                </Navbar.Collapse>
            </Navbar>
        </Layout>
        </>
    );
}
