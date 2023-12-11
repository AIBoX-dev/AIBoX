import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { article, columns } from "./colmuns";
import { DataTable } from "./data-table";
import { Separator } from "@/components/ui/separator";

export const metadata = {
	title: "ダッシュボード",
	description: "",
};

const articles: article[] = [
	{
		title: "タイトル1",
		wordCount: 1000,
		status: "全体公開",
		lastUpdated: "2023-07-26T18:13:38+09:00",
	},
	{
		title: "タイトル2",
		wordCount: 2000,
		status: "支援者限定",
		lastUpdated: "2023-07-26T18:13:38+09:00",
	},
	{
		title: "タイトル3",
		wordCount: 3000,
		status: "下書き",
		lastUpdated: "2023-07-26T18:13:38+09:00",
	},
	{
		title: "タイトル4",
		wordCount: 4000,
		status: "全体公開",
		lastUpdated: "2023-07-26T18:13:38+09:00",
	},
	{
		title: "タイトル5",
		wordCount: 5000,
		status: "支援者限定",
		lastUpdated: "2023-07-26T18:13:38+09:00",
	},
	{
		title: "タイトル6",
		wordCount: 6000,
		status: "下書き",
		lastUpdated: "2023-07-26T18:13:38+09:00",
	},
	{
		title: "タイトル7",
		wordCount: 7000,
		status: "全体公開",
		lastUpdated: "2023-07-26T18:13:38+09.00",
	},
	{
		title: "タイトル8",
		wordCount: 8000,
		status: "支援者限定",
		lastUpdated: "2023-07-26T18.13.38+09.00",
	},
	{
		title: "タイトル9",
		wordCount: 9000,
		status: "下書き",
		lastUpdated: "2023-07-26T18.13.38+09.00",
	},
	{
		title: "タイトル10",
		wordCount: 10000,
		status: "全体公開",
		lastUpdated: "2023-07-26T18.13.38+09.00",
	},
	{
		title: "タイトル11",
		wordCount: 11000,
		status: "支援者限定",
		lastUpdated: "2023-07-26T18.13.38+09.00",
	},
	{
		title: "タイトル12",
		wordCount: 12000,
		status: "下書き",
		lastUpdated: "2023-07-26T18.13.38+09.00",
	},
	{
		title: "タイトル13",
		wordCount: 13000,
		status: "全体公開",
		lastUpdated: "2023-07-26T18.13.38+09.00",
	},
	{
		title: "タイトル14",
		wordCount: 14000,
		status: "支援者限定",
		lastUpdated: "2023-07-26T18.13.38+09.00",
	},
	{
		title: "タイトル15",
		wordCount: 15000,
		status: "下書き",
		lastUpdated: "2023-07-26T18.13.38+09.00",
	},
	{
		title: "タイトル16",
		wordCount: 16000,
		status: "全体公開",
		lastUpdated: "2023-07-26T18.13.38+09.00",
	},
	{
		title: "タイトル17",
		wordCount: 17000,
		status: "支援者限定",
		lastUpdated: "2023-07-26T18.13.38+09.00",
	},
];

export default function Dashboard() {
	return (
		<main className="p-12 space-y-4">
			<h1 className="text-2xl font-semibold">ダッシュボード</h1>
			<Separator />
			<Tabs defaultValue="general" className="w-full">
				<TabsList>
					<TabsTrigger value="general">概要</TabsTrigger>
					<TabsTrigger value="post">投稿管理</TabsTrigger>
					<TabsTrigger value="plan">プラン管理</TabsTrigger>
				</TabsList>
				<div className="pt-4">
					<TabsContent value="general">
						<div className="grid grid-cols-4 gap-x-4 ">
							<Card>
								<CardHeader>
									<CardTitle>支援者数</CardTitle>
								</CardHeader>
								<CardContent></CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>フォロワー数</CardTitle>
								</CardHeader>
								<CardContent></CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>支援額</CardTitle>
								</CardHeader>
								<CardContent></CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>支援者数</CardTitle>
								</CardHeader>
								<CardContent></CardContent>
							</Card>
						</div>
					</TabsContent>
					<TabsContent value="post">
						<DataTable columns={columns} data={articles} />
					</TabsContent>
				</div>
			</Tabs>
		</main>
	);
}
