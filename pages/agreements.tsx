import {
    Grid,
    Card,
    Spacer,
    Button,
    Text,
    Input,
    Row,
    Checkbox,
    Container,
} from "@nextui-org/react";
import { GetStaticProps } from "next";
import { Inter } from "next/font/google";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { GitHub, Key, Mail, Search } from "react-feather";
import { AcmeLogo } from "../components/header/AcmeLogo";
import Header from "@/components/Header";
import styles from "@/styles/Home.module.css";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ["common"])),
    },
});

export default function Argreements() {
    const { t } = useTranslation("common");
    return (
        <>
            <Header />
        </>
    );
}
