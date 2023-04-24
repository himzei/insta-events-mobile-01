// const BASE_URL = "http://127.0.0.1:8000/api/v1";
// const BASE_URL = "http://127.0.0.1:8000/api/v1";
const BASE_URL =
  "https://port-0-insta-stamp-test-by52fb24lbbufx8n.gksl2.cloudtype.app/api/v1";

export async function getRanking() {
  const response = await fetch(`${BASE_URL}/insta/ranking/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
}

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

export async function getKeywords(params) {
  const name = params.queryKey[1];
  const response = await fetch(
    `${BASE_URL}/insta-admin/edit-keywords?name=${name}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await response.json();
  return json;
}