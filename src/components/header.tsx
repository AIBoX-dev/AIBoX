"use client";

import { Button } from "./ui/button";
import { MoonIcon, SunIcon, DesktopIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { LoginButton } from "@/components/login"
import { AvatarButton } from "@/components/avatar"

const isLogin = true

const ModeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={theme}>
          <DropdownMenuRadioItem className="gap-x-2" value="light" onClick={() => setTheme("light")}>
            <SunIcon />
            ライト
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="gap-x-2" value="dark" onClick={() => setTheme("dark")}>
            <MoonIcon />
            ダーク
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="gap-x-2" value="system" onClick={() => setTheme("system")}>
            <DesktopIcon />
            システム
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const Header = () => {
  return (
    <header className="flex justify-between items-center w-full px-12 p-4 border-b">
      <div className="flex gap-x-24 items-center">
        <Link href="/" className="text-2xl font-semibold text-foreground">AIBoX</Link>
        <span className="flex text-sm gap-x-6 text-foreground/60">
          <Link href="/">ホーム</Link>
          <p>クリエイター</p>
          <p>お知らせ</p>
        </span>
      </div>
      <div className="flex gap-x-4 items-center">
        <AvatarButton />
        <LoginButton />
        <ModeToggle />
      </div>
    </header>
  );
};