"use client";

import { cn } from "@/lib/utils";
import {
	useEditor,
	EditorContent,
	BubbleMenu,
	FloatingMenu,
	Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Focus from "@tiptap/extension-focus";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import "tippy.js/animations/shift-away-subtle.css";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import { Toggle } from "@/components/ui/toggle";
import {
	Bold,
	Italic,
	Strikethrough,
	Underline as UnderlineIcon,
	Link2,
	Quote,
	Code,
	Plus,
	Image as ImageIcon,
	ImagePlus,
} from "lucide-react";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CustomBubbleMenu = ({ editor }: { editor: Editor }) => {
	return (
		<BubbleMenu
			tippyOptions={{ duration: 200, animation: "shift-away-subtle" }}
			editor={editor}
		>
			<Menubar>
				{editor.can().toggleBold() && (
					<MenubarMenu>
						<Toggle
							size="sm"
							pressed={editor.isActive("bold")}
							onClick={() => editor.chain().focus().toggleBold().run()}
						>
							<Bold className="w-4 h-4" />
						</Toggle>
					</MenubarMenu>
				)}
				{editor.can().toggleItalic() && (
					<MenubarMenu>
						<Toggle
							size="sm"
							pressed={editor.isActive("italic")}
							onClick={() => editor.chain().focus().toggleItalic().run()}
						>
							<Italic className="w-4 h-4" />
						</Toggle>
					</MenubarMenu>
				)}
				{editor.can().toggleStrike() && (
					<MenubarMenu>
						<Toggle
							size="sm"
							pressed={editor.isActive("strike")}
							onClick={() => editor.chain().focus().toggleStrike().run()}
						>
							<Strikethrough className="w-4 h-4" />
						</Toggle>
					</MenubarMenu>
				)}
				{editor.can().toggleUnderline() && (
					<MenubarMenu>
						<Toggle
							size="sm"
							pressed={editor.isActive("underline")}
							onClick={() => editor.chain().focus().toggleUnderline().run()}
						>
							<UnderlineIcon className="w-4 h-4" />
						</Toggle>
					</MenubarMenu>
				)}
				{editor.can().toggleLink({
					href: "https://example.com",
					target: "_blank",
				}) && (
					<MenubarMenu>
						<Toggle
							size="sm"
							pressed={editor.isActive("link")}
							onClick={() => editor.chain().focus().toggleItalic().run()}
						>
							<Link2 className="w-4 h-4" />
						</Toggle>
					</MenubarMenu>
				)}
				{editor.can().toggleBlockquote() && (
					<MenubarMenu>
						<Toggle
							size="sm"
							pressed={editor.isActive("blockquote")}
							onClick={() => editor.chain().focus().toggleBlockquote().run()}
						>
							<Quote className="w-4 h-4" />
						</Toggle>
					</MenubarMenu>
				)}
				{editor.can().toggleCodeBlock() && (
					<MenubarMenu>
						<Toggle
							size="sm"
							pressed={editor.isActive("codeBlock")}
							onClick={() => editor.chain().focus().toggleCodeBlock().run()}
						>
							<Code className="w-4 h-4" />
						</Toggle>
					</MenubarMenu>
				)}
			</Menubar>
		</BubbleMenu>
	);
};

const CustomFloatingMenu = ({ editor }: { editor: Editor }) => {
	return (
		<>
			{editor && (
				<FloatingMenu
					className="relative -left-20"
					tippyOptions={{
						duration: 200,
						animation: "shift-away-subtle",
					}}
					editor={editor}
				>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="rounded-full p-2"
								onMouseEnter={(e) => {
									(e.target as HTMLButtonElement).focus();
								}}
							>
								<Plus />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent side="right" align="start" sideOffset={12}>
							<DropdownMenuItem className="gap-x-2">
								<ImageIcon className="w-4 h-4" />
								画像
							</DropdownMenuItem>
							<DropdownMenuItem
								className="gap-x-2"
								onClick={() => {
									editor.commands.insertContent(
										"<blockquote><p></p></blockquote>",
									);
								}}
							>
								<Quote className="w-4 h-4" />
								引用
							</DropdownMenuItem>
							<DropdownMenuItem
								className="gap-x-2"
								onClick={() => {
									editor.commands.insertContent(
										'<pre><code class="language-prompt"></code></pre>',
									);
								}}
							>
								<Code className="w-4 h-4" />
								コードブロック
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</FloatingMenu>
			)}
		</>
	);
};

const Tiptap = () => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Focus.configure({
				className: "prosemirror-focus before:bg-secondary",
				mode: "shallowest",
			}),
			Underline.configure({
				HTMLAttributes: {
					class: "underline",
				},
			}),
			Link.configure({
				protocols: ["http", "https"],
				HTMLAttributes: {
					class: "te",
				},
			}),
			Placeholder.configure({
				placeholder: "記事を書く",
			}),
		],
		editorProps: {
			attributes: {
				class: cn(`
          prose
          prose-slate
          dark:prose-invert
          pb-[10vh]
          prose-blockquote:text-base
          prose-blockquote:not-quote
          prose-blockquote:not-italic
          prose-blockquote:font-normal
          prose-blockquote:px-6
          prose-blockquote:py-3
          prose-blockquote:bg-secondary
          prose-blockquote:rounded-lg
          prose-blockquote:border-none
          focus:outline-none
        `),
			},
		},
	});

	return (
		<div className="ml-12 space-y-8">
			<Button variant="secondary" className="flex mt-4 gap-x-2 items-center">
				<ImagePlus className="w-4 h-4" />
				画像をアップロード
			</Button>
			<input
				className="text-4xl font-semibold focus:outline-none "
				placeholder="タイトル"
			></input>
			{editor && <CustomBubbleMenu editor={editor} />}
			{editor && <CustomFloatingMenu editor={editor} />}
			<EditorContent editor={editor} />
		</div>
	);
};

export default Tiptap;
