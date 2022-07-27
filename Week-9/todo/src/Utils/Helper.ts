import { encrypt } from "./Encryption";

interface TaskInterface {
  taskContent: string;
  taskDate: string;
  state: "active" | "completed";
}

const NAMESPACE = "JSBDBUSDFFF7S7FDS";

const localStorageExists = () => {
  try {
    return !!window.localStorage;
  } catch (e) {
    return false;
  }
};

const localStorageHasTasks = () => {
  if (localStorageExists()) {
    const tasks = localStorage.getItem("tasks");
    return tasks ? true : false;
  }
  return false;
};

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

// return string like 21 june 2022 03:44 pm
const getDateTime = () => {
  const date = new Date();
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
};

const setLocalStorage = (tasks: TaskInterface[] | null) => {
  if (tasks) {
    localStorage.setItem("tasks", encrypt(tasks));
    return;
  }
  return;
};

const getLocalStorage = () => {
  if (localStorageHasTasks()) {
    const tasks = localStorage.getItem("tasks");
    return tasks ?? null;
  }
  return null;
};

export type { TaskInterface };
export { getDateTime, NAMESPACE, setLocalStorage, getLocalStorage };
