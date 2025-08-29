"use server";

import { getCookies } from "next-client-cookies/server";
import { base_url, pathao_base_url } from "./config";

export const fetchData = async ({ url, cache }: any) => {
  try {
    const jsonData = await fetch(base_url + url, {
      next: { revalidate: 100 },
      method: "GET",
      cache: cache ?? "force-cache",
    });

    const result = await jsonData.json();

    return result;
  } catch (error: any) {
    console.log({ error });
  }
};

export const fetchDataWithToken = async ({ url, cache }: any) => {
  try {
    const cookies = await getCookies();
    const jsonData = await fetch(base_url + url, {
      // next: { revalidate: 100 },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${cookies.get("token")}`,
      },
      cache: cache ?? "force-cache",
    });

    const result = await jsonData.json();

    console.log(result);

    return result;
  } catch (error: any) {
    console.log({ error });
  }
};

export const fetchDataWithTokenPathao = async ({ url, token }: any) => {
  try {
    // const cookies = await getCookies();
    const jsonData = await fetch(pathao_base_url + url, {
      // next: { revalidate: 100 },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "force-cache",
    });

    const result = await jsonData.json();

    console.log(result);

    return result;
  } catch (error: any) {
    console.log({ error });
  }
};

export const postData = async (url: string, payload: any) => {
  try {
    const jsonData = await fetch(base_url + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await jsonData.json();

    console.log({ result });
    console.log({ payload });

    return result;
  } catch (error: any) {
    console.log({ error });
  }
};

export const postDataPathao = async (url: string, payload: any) => {
  try {
    const jsonData = await fetch(pathao_base_url + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await jsonData.json();

    console.log({ result });
    console.log({ payload });

    return result;
  } catch (error: any) {
    console.log({ error });
  }
};

export const postDataWithToken = async (url: string, payload: any) => {
  try {
    const cookies = await getCookies();
    console.log(cookies.get("token"));
    const jsonData = await fetch(base_url + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await jsonData.json();

    console.log({ result });
    console.log({ payload });

    return result;
  } catch (error: any) {
    console.log({ error });
  }
};

export const postDataPathaoWithToken = async (
  url: string,
  token: string,
  payload: any
) => {
  try {
    // const cookies = await getCookies();
    // console.log(cookies.get("token"));
    const jsonData = await fetch(pathao_base_url + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    console.log({ token });

    const result = await jsonData.json();

    console.log({ result });
    console.log({ payload });

    return result;
  } catch (error: any) {
    console.log({ error });
  }
};

export const putDataWithToken = async (url: string, payload: any) => {
  try {
    const cookies = await getCookies();
    console.log(cookies.get("token"));
    const jsonData = await fetch(base_url + url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await jsonData.json();

    console.log({ result });
    console.log({ payload });

    return result;
  } catch (error: any) {
    console.log({ error });
  }
};
