import fs from "fs";

export const Convert = () => {
    const blobToFile = (blob: Blob, fileName: string) => {
        const type = blob.type; // Blobのフォーマットを取得
        const options = { type };
        return new File([blob], fileName, options);
    };

    const convertToWebP = (file: File): Promise<Blob> => {
        return new Promise<Blob>((resolve, reject) => {
            const image = new Image();

            image.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;

                const context = canvas.getContext("2d");
                if (context) {
                    context.drawImage(image, 0, 0, image.width, image.height);
                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                resolve(blob);
                            } else {
                                reject(new Error("converterror"));
                            }
                        },
                        "image/webp",
                        0
                    );
                } else {
                    reject(new Error("2dcontext"));
                }
            };

            image.onerror = () => {};

            image.src = URL.createObjectURL(file);
        });
    };

    const saveBlob = (blob: Blob) => {
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "aaa.png";
        downloadLink.click();
    };

    const getImageType = (blob: Blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = function () {
                const buffer = new Uint8Array(reader.result as ArrayBuffer);
                const header = buffer.slice(0, 8);

                if (
                    header[0] === 0x89 &&
                    header[1] === 0x50 &&
                    header[2] === 0x4e &&
                    header[3] === 0x47
                ) {
                    resolve("png");
                } else if (
                    header[0] === 0x52 &&
                    header[1] === 0x49 &&
                    header[2] === 0x46 &&
                    header[3] === 0x46 &&
                    header[8] === 0x57 &&
                    header[9] === 0x45 &&
                    header[10] === 0x42 &&
                    header[11] === 0x50
                ) {
                    resolve("webp");
                } else {
                    resolve("unknown");
                }
            };

            reader.onerror = reject;
            reader.readAsArrayBuffer(blob);
        });
    };

    return {
        blobToFile,
        convertToWebP,
        saveBlob,
        getImageType,
    };
};
