import { cfImage } from "@/hooks/cfImages";
import { Convert } from "@/hooks/convertImage";

export const imageHandler = () => {
    const { uploadImage } = cfImage();
    const { blobToFile, convertToWebP, saveBlob} = Convert();

    const uploadProfileAvatar = async (blob: Blob, uid: string): Promise<string> => {
        const image = blobToFile(blob, uid);
        return convertToWebP(image).then(async webpBlob => {
            console.log(webpBlob.type)
            return Promise.resolve(await uploadImage(webpBlob, uid))
        });
    };

    return {
        uploadProfileAvatar,
    };
};
