"use client"

import * as z from "zod"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  username: z.string().nonempty({
    message: "ユーザー名は1文字以上である必要があります"
  }),
  displayname: z.string().nonempty({
    message: "表示名は1文字以上である必要があります"
  }),
  description: z.string().optional(),
  socialLinks: z.array(
    z.object({
      value: z.string().url({ message: "正しいurlを入力してください" }),
    })
  ).optional(),
  // image: z.custom<FileList>().refine((file) => !!file, {
  //   message: '画像を選択して下さい'
  // }).transform((file) => file[0]),
})

export const ProfileForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      displayname: "",
      description: "",
      socialLinks: [{
        value: ""
      }]
    },
  })

  const { fields, append } = useFieldArray({
    name: "socialLinks",
    control: form.control,
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ユーザーID</FormLabel>
              <FormControl>
                <Input placeholder="ユーザーID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>自己紹介</FormLabel>
              <FormControl>
                <Textarea placeholder="自己紹介" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`socialLinks.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URL
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 gap-x-2"
            onClick={() => append({ value: "" })}
          >
            <Plus className="w-4 h-4" />
            URLを追加する
          </Button>
        </div>
        <Button type="submit">保存する</Button>
      </form>
    </Form>
  )
}