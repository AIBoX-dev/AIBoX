import { findChildren } from "@tiptap/core";
import highlight from "highlight.js/lib/core";
import { Node as ProsemirrorNode } from "prosemirror-model";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import styles from "@/styles/Editor.module.css";

const cn = (...str: string[]) => {
    return str.join(" ")
}

function parseNodes(
    nodes: any[],
    className: string[] = []
): { text: string; classes: string[] }[] {
    return nodes
        .map((node) => {
            const classes = [
                ...className,
                ...(node.properties ? node.properties.className : []),
            ];

            if (node.children) {
                return parseNodes(node.children, classes);
            }

            return {
                text: node.value,
                classes,
            };
        })
        .flat();
}

function getHighlightNodes(basestr: string) {
    var temparr: any = [];
    var tempobj: any = {
        type: "",
        values: [],
    };
    var resultarr: any = [];

    /*
    第一段階: 括弧だけ先に処理
    */

    function makeObj(obj: any) {
        if (tempobj.type === obj.type) {
            tempobj.values.push(obj.value);
        } else {
            temparr.push({
                type: tempobj.type,
                value: tempobj.values.join(""),
            });
            tempobj = {
                type: obj.type,
                values: [obj.value],
            };
        }
    }

    basestr.split("").forEach((v, idx) => {
        var type = "text";
        if (["{", "}", "[", "]", "(", ")", ",", "|"].includes(v)) {
            type = v;
        }
        makeObj({
            type: type,
            value: v,
        });
        if (idx === basestr.length - 1) {
            temparr.push({
                type: tempobj.type,
                value: tempobj.values.join(""),
            });
        }
    });

    /*
    第二段階: その他も処理
    */

    function makeSpanObj(value: string, classname: string) {
        resultarr.push({
            type: "element",
            tagName: "span",
            properties: {
                className: [classname],
            },
            children: [
                {
                    type: "text",
                    value: value,
                },
            ],
        });
    }

    function makeTextObj(value: string) {
        resultarr.push({
            type: "text",
            value: value,
        });
    }

    var andregex = /(AND)/;
    var colonregex = /(\:(?:\d+\.?\d*|\.\d+))/;
    var doublecolonregex = /(\:\:(?:\d+\.?\d*|\.\d+))/;

    temparr.filter(Boolean).forEach((v: any) => {
        if (v.type !== "text") {
            switch (v.type) {
                case "{":
                    makeSpanObj(
                        v.value,
                        cn(styles.codeGradient, styles.codeGradientPink)
                    );
                    break;
                case "}":
                    makeSpanObj(
                        v.value,
                        cn(styles.codeGradient, styles.codeGradientPinkReverse)
                    );
                    break;
                case "[":
                    makeSpanObj(
                        v.value,
                        cn(styles.codeGradient, styles.codeGradientYellow)
                    );
                    break;
                case "]":
                    makeSpanObj(
                        v.value,
                        cn(styles.codeGradient, styles.codeGradientYellowReverse)
                    );
                    break;
                case "(":
                    makeSpanObj(
                        v.value,
                        cn(styles.codeGradient, styles.codeGradientSky)
                    );
                    break;
                case ")":
                    makeSpanObj(
                        v.value,
                        cn(styles.codeGradient, styles.codeGradientSkyReverse)
                    );
                    break;
                case ",":
                    makeSpanObj(v.value, styles.codeGray);
                    break;
                case "|":
                    makeSpanObj(v.value, styles.codeOrange);
                    break;
            }
        } else {
            const flag =
                andregex.test(v.value) ||
                colonregex.test(v.value) ||
                doublecolonregex.test(v.value);
            if (flag) {
                if (andregex.test(v.value)) {
                    v.value.split(andregex).forEach((v: any) => {
                        if (andregex.test(v)) {
                            makeSpanObj(v, styles.codeOrange);
                        } else {
                            makeTextObj(v);
                        }
                    });
                } else if (doublecolonregex.test(v.value)) {
                    v.value.split(doublecolonregex).forEach((v: any) => {
                        if (doublecolonregex.test(v)) {
                            makeSpanObj(v, styles.codeLime);
                        } else {
                            makeTextObj(v);
                        }
                    });
                } else if (colonregex.test(v.value)) {
                    v.value.split(colonregex).forEach((v: any) => {
                        if (colonregex.test(v)) {
                            makeSpanObj(v, styles.codeLime);
                        } else {
                            makeTextObj(v);
                        }
                    });
                }
            } else {
                if (v.value !== undefined) {
                    makeTextObj(v.value);
                }
            }
        }
    });

    return resultarr;
}

function registered(aliasOrLanguage: string) {
    return Boolean(highlight.getLanguage(aliasOrLanguage));
}

function getDecorations({
    doc,
    name,
    lowlight,
    defaultLanguage,
}: {
    doc: ProsemirrorNode;
    name: string;
    lowlight: any;
    defaultLanguage: string | null | undefined;
}) {
    const decorations: Decoration[] = [];

    findChildren(doc, (node) => node.type.name === name).forEach((block) => {
        let from = block.pos + 1;

        const nodes = getHighlightNodes(block.node.textContent);

        parseNodes(nodes).forEach((node) => {
            const to = from + node.text.length;

            if (node.classes.length) {
                const decoration = Decoration.inline(from, to, {
                    class: node.classes.join(" "),
                });

                decorations.push(decoration);
            }

            from = to;
        });
    });

    return DecorationSet.create(doc, decorations);
}

function isFunction(param: Function) {
    return typeof param === "function";
}

export function LowlightPlugin({
    name,
    lowlight,
    defaultLanguage,
}: {
    name: string;
    lowlight: any;
    defaultLanguage: string | null | undefined;
}) {
    if (
        !["highlight", "highlightAuto", "listLanguages"].every((api) =>
            isFunction(lowlight[api])
        )
    ) {
        throw Error(
            "You should provide an instance of lowlight to use the code-block-lowlight extension"
        );
    }

    const lowlightPlugin: Plugin<any> = new Plugin({
        key: new PluginKey("lowlight"),

        state: {
            init: (_, { doc }) =>
                getDecorations({
                    doc,
                    name,
                    lowlight,
                    defaultLanguage,
                }),
            apply: (transaction, decorationSet, oldState, newState) => {
                const oldNodeName = oldState.selection.$head.parent.type.name;
                const newNodeName = newState.selection.$head.parent.type.name;
                const oldNodes = findChildren(
                    oldState.doc,
                    (node) => node.type.name === name
                );
                const newNodes = findChildren(
                    newState.doc,
                    (node) => node.type.name === name
                );

                if (
                    transaction.docChanged &&
                    // Apply decorations if:
                    // selection includes named node,
                    ([oldNodeName, newNodeName].includes(name) ||
                        // OR transaction adds/removes named node,
                        newNodes.length !== oldNodes.length ||
                        // OR transaction has changes that completely encapsulte a node
                        // (for example, a transaction that affects the entire document).
                        // Such transactions can happen during collab syncing via y-prosemirror, for example.
                        transaction.steps.some((step: any) => {
                            // @ts-ignore
                            return (
                                step.from !== undefined &&
                                // @ts-ignore
                                step.to !== undefined &&
                                oldNodes.some((node) => {
                                    // @ts-ignore
                                    return (
                                        node.pos >= step.from &&
                                        // @ts-ignore
                                        node.pos + node.node.nodeSize <= step.to
                                    );
                                })
                            );
                        }))
                ) {
                    return getDecorations({
                        doc: transaction.doc,
                        name,
                        lowlight,
                        defaultLanguage,
                    });
                }

                return decorationSet.map(transaction.mapping, transaction.doc);
            },
        },

        props: {
            decorations(state) {
                return lowlightPlugin.getState(state);
            },
        },
    });

    return lowlightPlugin;
}
