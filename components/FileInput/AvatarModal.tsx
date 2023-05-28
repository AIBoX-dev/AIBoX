import { Modal, Button, Text } from "@nextui-org/react";
import React, { useState, useRef } from "react";
import ReactCrop, {
    makeAspectCrop,
    centerCrop,
} from "react-image-crop";
import { canvasPreview } from "./utils/canvasPreview";

type props = {
    isOpen: boolean;
    onClose: () => void;
    onCancel: () => void;
    src: string;
    onBlob: (blob: Blob | null) => void;
};

type Cropprops = {
    src: string;
};

export interface Crop {
    x: number
    y: number
    width: number
    height: number
    unit: 'px' | '%'
}

export interface PixelCrop extends Crop {
    unit: 'px'
}

export interface PercentCrop extends Crop {
    unit: '%'
}

const saveBlob = (blob: Blob) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "aaa.png";
    downloadLink.click();
};

export const AvatarModal: React.FC<props> = ({
    isOpen,
    onClose,
    onCancel,
    src,
    onBlob
}) => {
    const completedRef = useRef<PixelCrop | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleBlob = (blob: Blob | null) => {
        onBlob(blob);
    };

    const AvatarCrop: React.FC<Cropprops> = ({ src }) => {
        const [crop, setCrop] = useState<PercentCrop | PixelCrop>({
            unit: "%",
            x: 0,
            y: 0,
            width: 75,
            height: 75,
        });

        function onImageLoad(e: any) {
            const { naturalWidth: width, naturalHeight: height } =
                e.currentTarget;

            const crop = centerCrop(
                makeAspectCrop(
                    {
                        unit: "%",
                        width: 90,
                    },
                    1,
                    width,
                    height
                ),
                width,
                height
            );
            setCrop(crop);
        }
        return (
            <ReactCrop
                crop={crop}
                onChange={(c) => {
                    setCrop(c);
                }}
                onComplete={(c) => {
                    completedRef.current = c;
                }}
                aspect={1}
                minHeight={1}
                minWidth={1}
                circularCrop
                ruleOfThirds
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="image" src={src} onLoad={onImageLoad} ref={imgRef} />
            </ReactCrop>
        );
    };

    return (
        <Modal open={isOpen} onClose={() => onClose()} preventClose>
            <Modal.Header>
                <Text>画像を切り抜く</Text>
            </Modal.Header>
            <Modal.Body>
                <AvatarCrop src={src} />
                <canvas ref={canvasRef} style={{ display: "none" }} />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    auto
                    onClick={() => {
                        onCancel();
                    }}
                >
                    キャンセル
                </Button>
                <Button
                    auto
                    onClick={() => {
                        if (!imgRef.current) return;
                        if (!canvasRef.current) return;
                        if (!completedRef.current) return;

                        canvasPreview(
                            imgRef.current,
                            canvasRef.current,
                            completedRef.current,
                            1,
                            0
                        );
                        canvasRef.current.toBlob(async function (blob) {
                            if (!blob) return;
                            console.log(URL.createObjectURL(blob));
                            handleBlob(blob);
                            //saveBlob(blob)

                        });
                        onClose();
                    }}
                >
                    変更する
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
