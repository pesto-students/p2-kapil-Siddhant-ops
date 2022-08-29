import { Request, Response, Router } from "express";
import {
  capitalizeCityItems,
  checkForecastArray,
  filter,
  forecastMemoizedFetchCity,
  validateDate,
  validateTime,
  vallidateCity,
  weatherMemoizedFetchCity,
} from "../utils/helper";
import { ForecastObj } from "../utils/responseTypes";

const weatherRouter = Router({ caseSensitive: true });
const forecastRouter = Router({ caseSensitive: true });
const filterRouter = Router({ caseSensitive: true });

weatherRouter.get("/getMultipleCities", async (req: Request, res: Response) => {
  if (!req.body.cities) {
    return res.status(400).json({
      error: "cities parameter not defined",
    });
  }

  if (req.body.cities.length < 1) {
    return res.status(400).json({
      error: "cities parameter should be a valid array",
    });
  }

  const cities: string[] = req.body.cities;

  capitalizeCityItems(cities);

  console.time("Weather multiple cities");
  const fetchRes = await weatherMemoizedFetchCity(cities);
  console.timeEnd("Weather multiple cities");

  if (req.query.pageSize && req.query.page) {
    if (
      parseInt(req.query.pageSize.toString()) === 0 ||
      parseInt(req.query.page.toString()) === 0
    ) {
      return res.status(400).json({
        error:
          "request query parameters page & pageSize should not be 0 or null",
      });
    }

    let pagination = {
      currentPage: parseInt(req.query.page.toString()),
      itemsPerPage: parseInt(req.query.pageSize.toString()),
    };

    const paginatedResp = fetchRes.slice(
      pagination.currentPage * pagination.itemsPerPage -
        pagination.itemsPerPage,
      pagination.currentPage * pagination.itemsPerPage
    );

    return res.status(200).json({
      length: paginatedResp.length,
      result: paginatedResp,
    });
  }

  return res.status(200).json({
    length: fetchRes.length,
    result: fetchRes,
  });
});

weatherRouter.get("/getCity", async (req, res) => {
  if (!req.body.city) {
    return res.status(400).json({
      error: "cities parameter not defined",
    });
  }

  if (typeof req.body.city !== "string") {
    return res.status(400).json({
      error: "cities parameter should be a valid string",
    });
  }

  if (req.body.city === "" || req.body.city.length < 1) {
    return res.status(400).json({
      error: "cities parameter should be a valid city",
    });
  }

  let city = req.body.city as string;

  city = city[0].toUpperCase() + city.slice(1).toLowerCase();

  console.time("Weather - city");
  const fetchRes = await weatherMemoizedFetchCity([city]);
  console.timeEnd("Weather - city");

  return res.status(200).json({
    length: fetchRes.length,
    result: fetchRes[0],
  });
});

forecastRouter.get("/", async (req, res) => {
  if (!req.body.forecastArray) {
    return res.status(400).json({
      error: "forecastArray parameter not defined",
    });
  }

  if (req.body.forecastArray.length < 1) {
    return res.status(400).json({
      error:
        "forecastArray parameter should be a valid array of object city and days. (days range from 1 to 10) ",
    });
  }

  const reqForecastArr: ForecastObj[] = req.body.forecastArray;

  if (checkForecastArray(reqForecastArr)) {
    return res.status(400).json({
      error:
        "forecastArray parameter -> days property should range from 1 to 10",
    });
  }

  console.time("Forecast multiple cities");
  const fetchRes = await forecastMemoizedFetchCity(reqForecastArr);
  console.timeEnd("Forecast multiple cities");

  return res.status(200).json({
    length: fetchRes.length,
    result: fetchRes,
  });
});

filterRouter.get("/", async (req, res) => {
  if (
    !req.query.city ||
    req.query.city === "" ||
    !vallidateCity(req.query.city.toString())
  ) {
    return res.status(400).json({
      error: "query parameter should be a valid city name",
    });
  }

  const query = {
    city: "",
    date: "",
    time: "",
  };

  if (req.query.city) {
    query.city = req.query.city.toString();
  }

  if (req.query.date && req.query.date !== "") {
    if (validateDate(req.query.date.toString()) === false) {
      return res.status(400).json({
        error:
          "query parameter -> date should be a valid date format (YYYY-MM-DD)",
      });
    }
    query.date = req.query.date.toString();
  }

  if (req.query.time && req.query.time !== "") {
    const queryTime = validateTime(req.query.time.toString());
    if (queryTime === false) {
      return res.status(400).json({
        error:
          "query parameter -> time should be a valid time format (HH:MM) 24h",
      });
    }

    query.time = req.query.time.toString();
  }

  console.time("Weather - filter city, date, time");
  const fetchRes = await filter(query.city, query.date, query.time);
  console.timeEnd("Weather - filter city, date, time");

  return res.status(200).json({
    result: fetchRes,
  });
});

export { weatherRouter, forecastRouter, filterRouter };
