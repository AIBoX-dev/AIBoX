"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { FileInput } from "@/components/ui/file-input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const formSchema = z.object({
	displayname: z.string().nonempty({
		message: "表示名は1文字以上である必要があります",
	}),
	icon: z
		.custom<FileList>()
		.refine((file) => !!file, {
			message: "画像を選択して下さい",
		})
		.transform((file) => file[0]),
});

export const ProfileForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			displayname: "",
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="displayname"
						render={({ field }) => (
							<FormItem>
								<FormLabel>表示名</FormLabel>
								<FormControl>
									<Input placeholder="表示名" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="icon"
						render={({ field }) => (
							<FormItem>
								<FormLabel>アイコン</FormLabel>
								<FormControl>
									{/*@ts-ignore*/}
									<FileInput
										accept="image/png, image/jpeg, image/webp"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex gap-x-2">
						<Button type="submit">保存する</Button>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="destructive">アカウントを削除する</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>本当に削除しますか?</AlertDialogTitle>
									<AlertDialogDescription>
										一度削除すると、復元することはできなくなります
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>キャンセル</AlertDialogCancel>
									<AlertDialogAction asChild>
										<Button variant="destructive">削除する</Button>
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</form>
			</Form>
		</>
	);
};
