import { cfImage } from "@/hooks/cfImages";
import { Convert } from "@/hooks/convertImage";

export const imageHandler = () => {
    const { uploadImage } = cfImage();
    const { blobToFile, convertToWebP, saveBlob} = Convert();

    const uploadProfileAvatar = async (blob: Blob, uid: string) => {
        const image = blobToFile(blob, uid);
        convertToWebP(image).then(async webpBlob => {
            console.log(webpBlob.type)
            await uploadImage(webpBlob)
        });
    };

    return {
        uploadProfileAvatar,
    };
};
