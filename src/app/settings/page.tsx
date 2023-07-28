import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./form";

export const metadata = {
  title: "設定",
  description: "",
};

export default function Dashboard() {
  return (
    <main className="pt-4 space-y-6 w-full">
      <h1 className="text-xl font-semibold">プロフィール</h1>
      <Separator />
      <ProfileForm />
    </main>
  );
}
