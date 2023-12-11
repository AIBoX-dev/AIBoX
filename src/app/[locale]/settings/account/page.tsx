import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./form";

export default function Dashboard() {
	return (
		<main className="pt-4 space-y-6 w-full">
			<h1 className="text-xl font-semibold">アカウント</h1>
			<Separator />
			<ProfileForm />
		</main>
	);
}
