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
import { useAuth } from "@/hooks/auth";
import { useTranslations } from 'next-intl';

export const LoginButton = () => {
  const { signInWithGoogle, loginWithPassword } = useAuth();
  const t = useTranslations('Login');
  const ct = useTranslations('Check');

  const formSchema = z.object({
    email: z.string().email({
      message: ct("wrongemail"),
    }),
    password: z
      .string()
      .min(8, {
        message: ct('pw_length'),
      })
      .regex(/[!-/:-@[-`{-~]/, {
        message: ct('pw_include_symbol'),
      }),
  });

  const closeRef = useRef<null | HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    await loginWithPassword(
      values.email,
      values.password,
    )
    if (closeRef.current) closeRef.current.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand">{t('login')}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('login')}</DialogTitle>
        </DialogHeader>
        <div className="pt-4 w-full space-y-4">
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full flex gap-x-2">
              <Icons.google />
              {t('google')}
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
                    <FormLabel>{t('email')}</FormLabel>
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
                    <FormLabel>{t('password')}</FormLabel>
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
                {t('login')}
              </Button>
            </form>
          </Form>
        </div>
        <DialogTrigger ref={closeRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
};
