import Header from "@/components/Header";
import { GetStaticProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale!,
      ['common']
    ))
  }
});

export default function Login() {
    const { t } = useTranslation('common');
    return (
        <>
        <Header link="/login" />
        <main>
            <h1>{t("Login.login")}</h1>
        </main>
        </>
    )
    }