import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { Layout } from "./header/Layout";
import { AcmeLogo } from "./header/AcmeLogo";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';


export default function Header(props: any) {
    const router = useRouter();
    const { t } = useTranslation('common');
    return (
        <Layout>
            <Navbar isBordered variant="floating">
                <Navbar.Brand>
                    <AcmeLogo />
                    <Text b color="inherit" hideIn="xs">
                        AIBoX
                    </Text>
                </Navbar.Brand>
                <Navbar.Content hideIn="xs" variant="highlight-rounded">
                    <Navbar.Link
                        isActive={router.pathname === "/"}
                        href="/"
                    >
                        
                        {t('Header.home')}
                    </Navbar.Link>
                    <Navbar.Link
                        isActive={router.pathname === "/about"}
                        href="/about"
                    >
                        {t('Header.about')}
                    </Navbar.Link>
                    <Navbar.Link
                        isActive={router.pathname === "/creators"}
                        href="/creators"
                    >
                        {t('Header.creators')}
                    </Navbar.Link>
                    <Navbar.Link
                        isActive={router.pathname === "/notice"}
                        href="/notice"
                    >
                        {t('Header.notice')}
                    </Navbar.Link>

                </Navbar.Content>
                <Navbar.Content>
                    <Navbar.Link color="inherit" href="/login">
                        {t('Header.login')}
                    </Navbar.Link>
                    <Navbar.Item>
                        <Button auto flat as={Link} href="/signup">
                        {t('Header.signup')}
                        </Button>
                    </Navbar.Item>
                </Navbar.Content>
            </Navbar>
        </Layout>
    )
}
