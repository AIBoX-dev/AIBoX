/* eslint-disable import/no-named-as-default */
import { faBold, faItalic, faCode, faStrikethrough, faUnderline, faQuoteLeft, faPlus, faImage, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from '@headlessui/react'
import Focus from '@tiptap/extension-focus'
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import Link from '@tiptap/extension-link'
import Underline from "@tiptap/extension-underline"
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { lowlight } from 'lowlight'
import React, { Fragment } from 'react'
import { Bold, Italic, Minus, Underline as UnderlineIcon, ChevronRight, Code, Plus, Image as ImageIcon } from 'react-feather';
import CodeBlockLowlight from './highlight/index'
import styles from "@/styles/Editor.module.css";
import 'tippy.js/animations/shift-away-subtle.css';

const cn = (...str: string[]) => {
    return str.join(" ")
}


const Tiptap = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
			Underline.configure({
				HTMLAttributes: {
					class: 'underline',
				},
			}),
			Link.configure({
				protocols: ['http', 'https'],
				HTMLAttributes: {
					class: 'te',
				},
			}),
            CodeBlockLowlight.configure({
                lowlight,
            }),
            Focus.configure({
                className: styles.focusBorder,
                mode: 'shallowest',
            }),
            HorizontalRule
        ],
        content: `
        <h2>Editorのテスト</h2>
        <p>
            ノーマル<strong>太字</strong><s>取り消し</s><em>斜体</em>
        </p>
        <ul>
            <li>
                箇条書き1
            </li>
            <li>
                箇条書き2
            </li>
        </ul>
        <ol>
            <li>
                番号書き1
            </li>
            <li>
                番号書き2
            </li>
        </ol>
        <pre><code class="language-prompt">masterpiece, best quality,{{{aaa}}}, (((bbb))), [[[ccc]]], (ddd:1.3), eee:1.3|fff:20 [ggg|hhh|iii|jjj], kkk AND lll, [mmm::2]</code></pre>
        <blockquote>
            引用
        </blockquote>
        <hr></hr>
        <p></p>
        `,
        editorProps: {
            attributes: {
                class: cn(styles.container)
            }
        }
    });

    return (
        <>
            {editor && 
                <BubbleMenu className={styles.bubbleMenu} tippyOptions={{ duration: 200, animation: "shift-away-subtle" }} editor={editor}>
                    {editor.can().toggleBold() &&
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={cn(styles.bubbleMenuButton, editor.isActive('bold') ? 'text-sky-500' : '')}
                        title="太字"
                    >
                        <FontAwesomeIcon icon={faBold} />
                    </button>}
                    {editor.can().toggleItalic() &&
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={cn(styles.bubbleMenuButton, editor.isActive('italic') ? 'text-sky-500' : '')}
                        title="斜体"
                    >
                        <FontAwesomeIcon icon={faItalic} />
                    </button>}
                    {editor.can().toggleStrike() &&
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={cn(styles.bubbleMenuButton, editor.isActive('strike') ? 'text-sky-500' : '')}
                        title="取り消し線"
                    >
                        <FontAwesomeIcon icon={faStrikethrough} />
                    </button>}
                    {editor.can().toggleUnderline() &&
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={cn(styles.bubbleMenuButton, editor.isActive('underline') ? 'text-sky-500' : '')}
                        title="下線"
                    >
                        <FontAwesomeIcon icon={faUnderline} />
                    </button>}
                    {editor.can().toggleBlockquote() &&
                    <button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={cn(styles.bubbleMenuButton, editor.isActive('blockquote') ? 'text-sky-500' : '')}
                        title="引用"
                    >
                        <FontAwesomeIcon icon={faQuoteLeft} />
                    </button>}
                    {editor.can().toggleCodeBlock() &&
                    <button
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={cn(styles.bubbleMenuButton, editor.isActive('codeBlock') ? 'text-sky-500' : '')}
                        title="コード"
                    >
                        <FontAwesomeIcon icon={faCode} />
                    </button>}
                </BubbleMenu>
            }
            {editor && 
                <FloatingMenu className={styles.floatingMenu} tippyOptions={{ duration: 200, animation: "shift-away-subtle" }} editor={editor}>
                    <Menu as="div">
                        <div>
                            <Menu.Button className={styles.floatingMenuButton}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 -translate-x-2"
                            enterTo="transform opacity-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100"
                            leaveTo="transform opacity-0 -translate-x-2"
                        >
                            <Menu.Items className={styles.floatingMenuContent}>
                                <div className="py-1">
                                    <Menu.Item>
                                        <button
                                            className={styles.floatingMenuItem}
                                        >
                                            <FontAwesomeIcon icon={faImage} />
                                            画像
                                        </button>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <button
                                            className={styles.floatingMenuItem}
                                        >
                                            <FontAwesomeIcon icon={faLink} />
                                            埋め込み
                                        </button>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <button
                                            className={styles.floatingMenuItem}
                                            onClick={() => {
                                                editor.chain().focus().setBlockquote().run()
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faQuoteLeft} />
                                            引用
                                        </button>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <button
                                            className={styles.floatingMenuItem}
                                            onClick={() => {
                                                editor.chain().focus().setCodeBlock().run()
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faCode} />
                                            コードブロック
                                        </button>
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </FloatingMenu>
            }
            <EditorContent editor={editor} />
        </>
    );
};

export default Tiptap;
