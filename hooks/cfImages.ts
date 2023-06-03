import axios from 'axios';

const cloudflare_account_id = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID as string;
const cloudflare_token = process.env.NEXT_PUBLIC_CLOUDFLARE_TOKEN as string;

export const cfImage = () => {
  const getDirectCreatorUploadLink = async () => {
    try {
      const response = await axios.post(
        `https://api.cloudflare.com/client/v4/accounts/${cloudflare_account_id}/images/v2/direct_upload`,
        null,
        {
          headers: {
            Authorization: `Bearer ${cloudflare_token}`,
            'Content-Type': 'multipart/form-data',
          },
          params: {
            requireSignedURLs: true,
          },
          data: {
            metadata: JSON.stringify({ key: 'value' }),
          },
        }
        );

      console.log(response.data);
      return response.data.result.uploadURL
    } catch (error) {
      console.error(error);
    }
  }

  const uploadImage = async (blob: Blob) => {
    await getDirectCreatorUploadLink().then(async uploadURL => {
      const formData = new FormData()
      formData.append('file', blob)
      const cloudflareResponse = await fetch(uploadURL, {
        method: 'POST',
        body: formData
      })
      console.log(await cloudflareResponse.json())
    })
  }


  return {
    uploadImage
  }
};