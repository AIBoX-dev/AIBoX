import Image from "next/image";
import Tiptap from "@/components/tiptap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata = {
	title: "投稿",
	description: "",
};

export default function Post() {
	return (
		<main className="p-12 space-y-4">
			<h1 className="text-2xl font-semibold">投稿</h1>
			<Separator />
			<div className="grid grid-cols-3 gap-x-6 pt-6">
				<Card className="col-span-2 border p-4 rounded-lg">
					<CardContent>
						<Tiptap />
					</CardContent>
				</Card>
				<div>
					<Card className="border p-4 rounded-lg">
						<CardHeader>
							<CardTitle>公開設定</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col gap-y-4">
							<RadioGroup defaultValue="comfortable">
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="default" id="r1" />
									<Label htmlFor="r1">全体公開</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="comfortable" id="r2" />
									<Label htmlFor="r2">支援者限定</Label>
								</div>
							</RadioGroup>
							<Button variant="outline">下書き保存</Button>
							<Button>公開する</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
