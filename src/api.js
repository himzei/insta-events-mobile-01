// const BASE_URL = "http://127.0.0.1:8000/api/v1";
const BASE_URL =
  "https://port-0-insta-stamp-by52fb24lbbufx8n.gksl2.cloudtype.app/api/v1";

export async function getStamp({ url }) {
  const response = await fetch(`${BASE_URL}/insta/`, {
    method: "POST",
    body: JSON.stringify({
      url,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
}
