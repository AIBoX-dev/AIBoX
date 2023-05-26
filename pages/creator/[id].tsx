import {
    Text,
    Container,
    Row,
    Col,
    Card,
    Spacer,
    Button,
    Input,
    Grid,
    Checkbox,
} from "@nextui-org/react";

import { GetStaticProps } from "next";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

// export const getStaticProps: GetStaticProps = async ({ locale }) => ({
//     props: {
//         ...(await serverSideTranslations(locale!, ["common"])),
//     },
// });

export default function Creator() {
    const { t } = useTranslation("common");
    const router = useRouter();
    const { id } = router.query;
}
