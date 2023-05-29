import { images } from "@/hooks/cfImages";
import { Convert } from "@/hooks/convertImage";

export const imageHandler = () => {
    const { uploadImage } = images();
    const { blobToFile, convertToWebP, saveBlob, getImageType } = Convert();
    const uploadProfileAvatar = async (blob: Blob, uid: string) => {
        const image = blobToFile(blob, uid);
        convertToWebP(image).then((webpBlob) => {
            console.log(webpBlob.type);
        });
        // await uploadImage(webp_image)
    };

    return {
        uploadProfileAvatar,
    };
};
