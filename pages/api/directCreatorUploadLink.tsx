import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};

const cloudflare_account_id = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID as string;
const cloudflare_token = process.env.NEXT_PUBLIC_CLOUDFLARE_TOKEN as string;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${cloudflare_account_id}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cloudflare_token}`,
        },
      }
    )
  ).json();
  res.json({
    ok: true,
    ...response.result,
  });
}