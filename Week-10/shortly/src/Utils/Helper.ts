import { Dispatch, SetStateAction } from "react";
import { AlertStateType } from "../Components/Alert";

const APIURL = "https://api.shrtco.de/v2/shorten?url=";

const validateURL = (url: string) => {
  // regex for validating a url
  const regex =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
  // if the url is valid, return the url
  if (regex.test(url)) {
    return url;
  }
  // if the url is not valid, return null
  return null;
};

export interface APIResponseResult {
  code: string;
  short_link: string;
  full_short_link: string;
  short_link2: string;
  full_short_link2: string;
  short_link3: string;
  full_short_link3: string;
  share_link: string;
  full_share_link: string;
  original_link: string;
}

interface APIResponse {
  ok: boolean;
  result?: APIResponseResult;
  error_code?: number;
  error?: string;
}

const submitURL = async (
  url: string,
  setInputURL: Dispatch<SetStateAction<string>>,
  setAlertState: Dispatch<SetStateAction<AlertStateType>>,
  setModalState: Dispatch<
    SetStateAction<{
      visible: boolean;
      message: string;
      links: APIResponseResult | null;
    }>
  >,
  setLinksState: Dispatch<SetStateAction<APIResponseResult[]>>
) => {
  if (validateURL(url)) {
    setAlertState({
      message: "Shorting it...",
      severity: "info",
      visible: true,
    });
    await fetch(`${APIURL}${url}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data: APIResponse) => {
            if (data.result) {
              setAlertState({
                message: "URL successfully shortened",
                severity: "success",
                visible: true,
              });
              setModalState({
                visible: true,
                message: "URL successfully shortened",
                links: data.result,
              });
              setLinksState((prevLinksState) => {
                if (data.result) return [...prevLinksState, data.result];
                return prevLinksState;
              });
              setInputURL("");
              setLocalStorage(data.result);
              return;
            }
            throw new Error("Result not found");
          });
        }
        throw new Error("Network response was not ok.");
      })
      .catch((error) => {
        console.log(error);
        setAlertState({
          message: "Error shortening URL",
          severity: "error",
          visible: true,
        });
        return;
      });
  }
  setAlertState({
    message: "Invalid URL",
    severity: "error",
    visible: true,
  });
  return;
};

const copyLinkToClipboard = (
  link: string,
  setAlertState: Dispatch<SetStateAction<AlertStateType>>
) => {
  if (navigator) {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setAlertState({
          message: "Link copied to clipboard",
          severity: "success",
          visible: true,
        });
      })
      .catch(() => {
        setAlertState({
          message: "Error copying link to clipboard",
          severity: "error",
          visible: true,
        });
      });
    return;
  }
  setAlertState({
    message: "Error copying link to clipboard",
    severity: "error",
    visible: true,
  });
  return;
};

const getLocalStorage = (): APIResponseResult[] => {
  if (localStorage) {
    const links = localStorage.getItem("links");
    if (links) {
      return JSON.parse(links);
    }
  }
  return [];
};

const setLocalStorage = (value: APIResponseResult) => {
  if (localStorage) {
    const links = localStorage.getItem("links");
    if (links) {
      const linksArray = JSON.parse(links);
      if (linksArray)
        localStorage.setItem("links", JSON.stringify([...linksArray, value]));
    } else localStorage.setItem("links", JSON.stringify([value]));
  }
};

// regex Name Validation for name like firstName Middlename lastname or firstName lastname
const validateName = (name: string) => {
  const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
  if (regex.test(name)) {
    return name;
  }
  return null;
};

const validateEmail = (email: string) => {
  const regex = /[a-z0-9]+@[a-z0-9]+\.[a-z]{2,7}/g;
  if (regex.test(email)) {
    return email.trim();
  }
  return null;
};

const submitContactForm = (
  contactFormData: {
    name: string;
    email: string;
    message: string;
  },
  setContactFormData: Dispatch<
    SetStateAction<{
      name: string;
      email: string;
      message: string;
    }>
  >,
  setAlertState: Dispatch<SetStateAction<AlertStateType>>
) => {
  const { name, email, message } = contactFormData;
  if (validateName(name) && validateEmail(email) && message) {
    setAlertState({
      message: "Sending message...",
      severity: "success",
      visible: true,
    });
    setContactFormData({
      name: "",
      email: "",
      message: "",
    });
    return;
  }
  setAlertState({
    message: "Please fill in all fields correctly",
    severity: "error",
    visible: true,
  });
  return;
};

const getLinkObjArr = (links: APIResponseResult) => {
  const returnObj: {
    shortLink: string;
    fullShortLink: string;
  }[] = [
    {
      shortLink: links.short_link,
      fullShortLink: links.full_short_link,
    },
    {
      shortLink: links.short_link2,
      fullShortLink: links.full_short_link2,
    },
    {
      shortLink: links.short_link3,
      fullShortLink: links.full_short_link3,
    },
  ];
  return returnObj;
};

export {
  validateURL,
  submitURL,
  copyLinkToClipboard,
  getLocalStorage,
  validateName,
  validateEmail,
  submitContactForm,
  getLinkObjArr,
};
