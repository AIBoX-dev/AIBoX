import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, PenSquare, BarChartBig } from "lucide-react";
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
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/auth";

export const AvatarButton = () => {
	const t = useTranslations("Dashboard");
	const { logoutUser } = useAuth();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-10 w-10 rounded-full">
					<Avatar className="h-10 w-10">
						<AvatarImage src="undefined" />
						<AvatarFallback>User</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuLabel>ユーザー名</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/post" className="flex gap-x-2 w-full">
						<PenSquare className="w-4 h-4" />
						{t("assets")}
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/dashboard" className="flex gap-x-2 w-full">
						<BarChartBig className="w-4 h-4" />
						{t("dashboard")}
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem className="gap-x-2">
					<Link href="/settings" className="flex gap-x-2 w-full">
						<Settings className="w-4 h-4" />
						設定
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="gap-x-2">
					<LogOut className="w-4 h-4" onClick={() => logoutUser()} />
					ログアウト
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
