// const BASE_URL = "http://127.0.0.1:8000/api/v1";

import { ADM_EVENTS_NAME } from "./lib/settings";

// const BASE_URL = "http://127.0.0.1:8000/api/v1";
const BASE_URL = (process.env.NODE_ENV = "development"
  ? "http://127.0.0.1:8000/api/v1"
  : "https://port-0-insta-events-01-e9btb72mlh5nv7yh.sel4.cloudtype.app/api/v1");

// 인증후 랭킹 확인하기
export async function getRanking() {
  const response = await fetch(
    `${BASE_URL}/insta/ranking?name=${ADM_EVENTS_NAME}`,
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

export async function getStamp({ url, ADM_EVENTS_NAME }) {
  // console.log(url, ADM_EVENTS_NAME);
  const response = await fetch(`${BASE_URL}/insta/`, {
    method: "POST",
    body: JSON.stringify({
      url,
      ADM_EVENTS_NAME,
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
