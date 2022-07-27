import { getLocalStorage, NAMESPACE, TaskInterface } from "./Helper";

const encrypt = (tasks: TaskInterface[]) => {
  const salt = NAMESPACE;
  const textToChars = (text: string) =>
    text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n: any) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code: any) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return JSON.stringify(tasks)
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

const decrypt = (encoded: string | null) => {
  const salt = NAMESPACE;
  const textToChars = (text: string) =>
    text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code: any) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    ?.match(/.{1,2}/g)
    ?.map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("") as string;
};

const getTasks = () => {
  const decryptedStorage = decrypt(getLocalStorage());
  if (decryptedStorage) {
    return JSON.parse(decryptedStorage) as TaskInterface[];
  }
  return null;
};

export { decrypt, encrypt, getTasks };
