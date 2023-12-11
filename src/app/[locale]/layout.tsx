import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { M_PLUS_2 } from "next/font/google";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";

// export function generateStaticParams() {
//   return [{locale: 'ja-JP'}, {locale: 'en-US'}, {locale: 'zh-CN'}];
// }

const inter = M_PLUS_2({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
});

export const metadata = {
	title: {
		default: "AIBoX",
		template: "%s | AIBoX",
	},
	description: "",
};

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: {
		locale: string;
	};
}) {
	const locale = useLocale();
	if (params.locale !== locale) {
		notFound();
	}

	let messages;
	try {
		messages = (await import(`../../../locales/${locale}/common.json`)).default;
	} catch (error) {
		notFound();
	}

	return (
		<html lang={locale}>
			<body
				className={`${inter.className} min-h-screen relative pb-60 box-border`}
			>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						<Header />
						{children}
						<Footer />
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
