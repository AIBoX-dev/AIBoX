export const cfImage = () => {
  const getDirectCreatorUploadLink = async () => {
    try {
      return await (await fetch(`/api/directCreatorUploadLink`)).json();
    } catch(error) {

    }
  }

  const uploadImage = async (blob: Blob, user_id: string): Promise<string> => {
    const { id, uploadURL } = await getDirectCreatorUploadLink();
    const form = new FormData();
    form.append("file", blob, user_id + "");
    return fetch(uploadURL, {
      method: "POST",
      body: form,
    }).then(
      response => {
        const urlObject = new URL(response.url);
        const id = urlObject.pathname.split('/')[2];
        console.log(id)
        return Promise.resolve(`https://imagedelivery.net/ixYF3FkF_lFGPNWGS94NUg/${id}/public`)

      }
    )
  }

  return {
    uploadImage
  }
};