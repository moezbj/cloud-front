import localforage from "localforage";

export async function setItem(key, value) {
  try {
    await localforage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log("error in localforge setItem", e);
  }
}

export async function getItem(key) {
  try {
    const itemString = await localforage.getItem(key);
    return JSON.parse(itemString);
  } catch (e) {
    return {};
  }
}
