import axios from 'axios';

const cloudflare_account_id = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID as string;
const cloudflare_token = process.env.NEXT_PUBLIC_CLOUDFLARE_TOKEN as string

export const images = () => {
    const uploadImage = async (image: Blob) => {
        try {
            const form = new FormData();
            form.append('requireSignedURLs', 'true');
            form.append('metadata', JSON.stringify({ key: 'value' }));
            form.append('file', image);
    
            const { data } = await axios(`https://api.cloudflare.com/client/v4/accounts/${cloudflare_account_id}/images/v1`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${cloudflare_token}`,
                    'Content-Type': 'multipart/form-data'
                },
                data: form,
            });
        
            console.log(data);
      } catch (e) {
        console.log(e);
      }
};
    
    
    return {
        uploadImage
    }
}
