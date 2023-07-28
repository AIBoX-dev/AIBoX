"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Icons } from "@/components/icons";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "正しいメールアドレスを入力してください",
  }),
  password: z
    .string()
    .min(8, {
      message: "パスワードは8文字以上である必要があります",
    })
    .regex(/[!-/:-@[-`{-~]/, {
      message: "パスワードには記号を入れてください",
    }),
});

export const LoginButton = () => {
  const closeRef = useRef<null | HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (closeRef.current) closeRef.current.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand">ログイン</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ログイン</DialogTitle>
        </DialogHeader>
        <div className="pt-4 w-full space-y-4">
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full flex gap-x-2">
              <Icons.google />
              Googleでログイン
            </Button>
          </DialogTrigger>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>メールアドレス</FormLabel>
                    <FormControl>
                      <Input placeholder="e-mail" {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>パスワード</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                ログイン
              </Button>
            </form>
          </Form>
        </div>
        <DialogTrigger ref={closeRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
};
