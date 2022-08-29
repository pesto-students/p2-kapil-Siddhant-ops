import fetch from "node-fetch";
import {
  ForecastObj,
  Forecast_API_EXP_Resp,
  Forecast_API_Resp,
  Weather_API_EXP_Resp,
  Weather_API_Resp,
} from "./responseTypes";

const fetchCity = async (city: string, days?: string, isForecast?: boolean) => {
  const apiURL = process.env.WEATHER_API_URL;
  const apiKey = process.env.WEATHER_API_KEY;
  const validity = 30;

  const apiFetch = await fetch(
    `${apiURL}${
      isForecast ? "forecast" : "current"
    }.json?key=${apiKey}&q=${city}${isForecast ? `&days=${days}` : ""}&aqi=yes${
      isForecast ? "&alerts=no" : ""
    }`,
    {
      method: "POST",
    }
  ).then(
    (_res) => _res.json() as unknown as Weather_API_Resp | Forecast_API_Resp
  );
  const initDate = new Date();
  const expDate = new Date(initDate.getTime() + validity * 60000);
  const apiResp: Weather_API_EXP_Resp | Forecast_API_EXP_Resp = {
    ...apiFetch,
    expDate,
  };
  return apiResp;
};

const removeProp = (
  obj: Weather_API_EXP_Resp | Forecast_API_EXP_Resp,
  propertyName: string[]
) => {
  const respArr: Weather_API_Resp | Forecast_API_Resp = Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => !propertyName.includes(key))
  );
  return respArr;
};

const weatherMemoizeCities = (
  fn: (
    city: string,
    days?: string,
    isForecast?: boolean
  ) => Promise<Weather_API_EXP_Resp>
) => {
  const cityMap = new Map<string, Weather_API_EXP_Resp>();
  const returnRespFn = async (cities: string[]) => {
    if (cities.length === 1) {
      const city = cities[0];
      const cityMapObj = cityMap.get(city);
      const currentDate = new Date();
      if (cityMapObj && currentDate <= cityMapObj.expDate) {
        const respObj: Weather_API_Resp[] = [
          removeProp(cityMapObj, ["expDate"]),
        ];
        return respObj;
      } else {
        const cityResult = await fn(city, undefined, false);
        cityMap.set(city, cityResult);
        const respObj: Weather_API_Resp[] = [
          removeProp(cityResult, ["expDate"]),
        ];
        return respObj;
      }
    }
    const memoizeResp: Weather_API_Resp[] = [];
    for (const city of cities) {
      const cityMapObj = cityMap.get(city);
      const currentDate = new Date();
      if (cityMapObj && currentDate <= cityMapObj.expDate) {
        memoizeResp.push(removeProp(cityMapObj, ["expDate"]));
      } else {
        const cityResult = await fn(city, undefined, false);
        cityMap.set(city, cityResult);
        memoizeResp.push(removeProp(cityResult, ["expDate"]));
      }
    }
    return memoizeResp;
  };

  return returnRespFn;
};

const weatherMemoizedFetchCity = weatherMemoizeCities(fetchCity);

const capitalizeCityItems = (cities: string[]) => {
  cities.map((city, index) => {
    cities[index] = city[0].toUpperCase() + city.slice(1).toLowerCase();
  });
};

const forecastMemoizeCities = (
  fn: (
    city: string,
    days: string,
    isForecast?: boolean
  ) => Promise<Forecast_API_EXP_Resp>
) => {
  const cityForecastMap = new Map<string, Forecast_API_EXP_Resp>();
  const returnRespFn = async (forecastCities: ForecastObj[]) => {
    if (forecastCities.length === 1) {
      const cityForecastObj = forecastCities[0];
      const cityForecastObjKey = Object.values(cityForecastObj)
        .join("--")
        .toLowerCase();
      const cityForecastMapObj = cityForecastMap.get(cityForecastObjKey);
      const currentDate = new Date();
      if (cityForecastMapObj && currentDate <= cityForecastMapObj.expDate) {
        const respObj: Forecast_API_Resp[] = [
          removeProp(cityForecastMapObj, ["expDate", "current"]),
        ];
        return respObj;
      } else {
        const cityForecastResult = await fn(
          cityForecastObj.city,
          validateDate(cityForecastObj.days).toString(),
          true
        );
        cityForecastMap.set(cityForecastObjKey, cityForecastResult);
        const respObj: Forecast_API_Resp[] = [
          removeProp(cityForecastResult, ["expDate", "current"]),
        ];
        return respObj;
      }
    }
    const memoizeResp: Forecast_API_Resp[] = [];

    for (const forecastCity of forecastCities) {
      const forecastCityObjKey = Object.values(forecastCity)
        .join("--")
        .toLowerCase();
      const cityForecastObj = cityForecastMap.get(forecastCityObjKey);
      const currentDate = new Date();
      if (cityForecastObj && currentDate <= cityForecastObj.expDate) {
        memoizeResp.push(removeProp(cityForecastObj, ["expDate", "current"]));
      } else {
        const cityForecastResult = await fn(
          forecastCity.city,
          validateDate(forecastCity.days).toString(),
          true
        );
        cityForecastMap.set(forecastCityObjKey, cityForecastResult);
        memoizeResp.push(
          removeProp(cityForecastResult, ["expDate", "current"])
        );
      }
    }
    return memoizeResp;
  };

  return returnRespFn;
};

const forecastMemoizedFetchCity = forecastMemoizeCities(fetchCity);

const checkForecastArray = (forecastArr: ForecastObj[]) => {
  for (const forecastObj of forecastArr) {
    if (
      forecastObj.days &&
      (parseInt(forecastObj.days) < 1 || parseInt(forecastObj.days) > 10)
    ) {
      return true;
    }
    forecastObj.city =
      forecastObj.city[0].toUpperCase() +
      forecastObj.city.slice(1).toLowerCase();
  }
  return false;
};

const vallidateCity = (city: string) => {
  if (city.length < 3) {
    return false;
  }
  const regexExp = "([a-zA-Z])";
  const regex = new RegExp(regexExp);
  if (!regex.test(city)) {
    return false;
  }
  return true;
};

const validateDate = (date: string) => {
  const regexExp = "[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}";
  const regex = new RegExp(regexExp);
  if (regex.test(date)) {
    const paramYear = parseInt(date.split("-")[0]);
    const paramMonth = parseInt(date.split("-")[1]);
    const paramDate = parseInt(date.split("-")[2]);
    const currentDate = new Date();
    const diffDays = +paramDate - currentDate.getDate();
    if (
      paramYear === currentDate.getFullYear() &&
      paramMonth === currentDate.getMonth() + 1 &&
      diffDays >= 0 &&
      diffDays <= 10
    )
      return diffDays + 1;

    return false;
  }
  return false;
};

const validateTime = (time: string) => {
  // regex for time format HH:MM (24 hours)
  const regexExp = "([0-9]{2}):([0-9]{2})";
  const regex = new RegExp(regexExp);
  if (regex.test(time)) {
    const paramHour = parseInt(time.split(":")[0]);
    const paramMin = parseInt(time.split(":")[1]);
    if (paramHour >= 0 && paramHour <= 23 && paramMin >= 0 && paramMin <= 59) {
      return time;
    }
    return false;
  }
  return false;
};

const filter = async (city: string, date: string, time: string) => {
  const filterQueryDay = validateDate(date);

  // check if diffDays is 1 // current Day or later
  if (filterQueryDay === 1) {
    // fetch city data
    const fetchedResult = (await weatherMemoizedFetchCity([city]))[0];
    return fetchedResult;
  }

  const fetchedResult = (
    await forecastMemoizedFetchCity([{ city, days: date }])
  )[0];

  if (filterQueryDay && filterQueryDay > 1) {
    const fetchedForecastDay =
      fetchedResult?.forecast?.forecastday![filterQueryDay - 1];

    const filterQueryTime = validateTime(time);

    if (filterQueryTime) {
      const fetchedForecastTimeArr = fetchedForecastDay?.hour;

      for (let i = 0; i < fetchedForecastTimeArr!.length; i++) {
        const hourObj = fetchedForecastTimeArr![i];
        const hr = parseInt(
          hourObj.time
            .split(":")[0]
            .slice(hourObj.time.split(":")[0].length - 3)
        );

        const filterQueryHr = parseInt(filterQueryTime.split(":")[0]);

        if (hr === filterQueryHr) {
          return {
            location: fetchedResult?.location,
            forecast: {
              ...fetchedForecastDay,
              hour: hourObj,
            },
          };
        }
      }
    }

    return {
      location: fetchedResult?.location,
      forecast: fetchedForecastDay,
    };
  }

  return fetchedResult;
};

export {
  weatherMemoizedFetchCity,
  capitalizeCityItems,
  checkForecastArray,
  forecastMemoizedFetchCity,
  filter,
  vallidateCity,
  validateDate,
  validateTime,
};
