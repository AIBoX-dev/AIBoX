import { useState, useRef } from "react";
import { Image as ImageIcon } from "react-feather";
import styled from "styled-components";
import { AvatarModal } from "./AvatarModal";

const InputContainer = styled.div`
    display: flex;
    align-content: center;
    column-gap: 12px;
    border: 2px solid lightgray;
    border-radius: 1rem;
    padding: 0.5rem;
    cursor: pointer;
    :hover {
        border-color: black;
    }
`;

type FileInputProps = {
    setBlob: (blob: Blob | null) => void;
};

export const FileInput: React.FC<FileInputProps> = ({ setBlob }) => {
    const [fileName, setFileName] = useState<string>("選択されていません");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleBlob = (blob: Blob | null) => {
        setBlob(blob);
    };
    return (
        <>
            <p>アイコン</p>
            <AvatarModal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
                onCancel={() => {
                    if (!inputRef.current) return
                    inputRef.current.value = ""
                    setFileName("選択されていません")
                    setIsOpen(false)
                }}
                src={url}
                onBlob={handleBlob}
            />
            <InputContainer
                onClick={() => {
                    if (inputRef.current) {
                        inputRef.current.click();
                    }
                }}
            >
                <label style={{ userSelect: "none" }}>
                    <input
                        type="file"
                        style={{ display: "none" }}
                        accept="image/png, image/jpeg, image/webp"
                        ref={inputRef}
                        onChange={(e) => {
                            if (!e.currentTarget.files?.[0]) return;
                            const file = e.currentTarget.files?.[0];
                            const fr = new FileReader();
                            fr.readAsArrayBuffer(file);
                            fr.onload = function () {
                                const blob = new Blob([fr.result as BlobPart], {
                                    type: "image/png",
                                });
                                const url = URL.createObjectURL(blob);
                                setUrl(url);
                                setIsOpen(true);
                            };

                            setFileName(
                                e.currentTarget.files?.[0].name || fileName
                            );
                        }}
                    />
                    {/*eslint-disable-next-line jsx-a11y/alt-text*/}
                    <ImageIcon color="gray"></ImageIcon>
                </label>
                <p>{fileName}</p>
            </InputContainer>
        </>
    );
};
