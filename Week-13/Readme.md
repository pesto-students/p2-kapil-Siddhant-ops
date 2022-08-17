# W13 Assignment

In this assignment we need to create a backend service in NodeJs.

Design architecture of the service.

Start Creating following Api's

- Data of Multiple cities
  - Api which returns weather data of multiple cities.
  - Api also filters the result by city name or city code.
  - Api should return the data in pagination.
- Detailed Forecast for the next `X` days.
  - `X` days should be decided by the user.
  - Data should be very detailed.
- Filter the data by any particular city, any particular date , any particular moment
- Current weather conditions of any particular city.

Following are the API endpoints

1. [Current weather - multiple cities](http://localhost:8080/weather/getMultipleCities)

Body should be raw JSON.
Property `cities` should be an Array of string. (city names)

```javascript
body - raw JSON
{
    "cities": [
        "mumbai",
        "helsinki",
        "london",
        "new york",
        "ontario",
        "rio",
        "dubai",
        "sydney",
        "bangkok"
    ]
}
```

Making request to the endpoint

```javascript
var requestOptions = {
  method: "GET",
  body: raw,
  redirect: "follow",
};

fetch("http://localhost:8080/weather/getMultipleCities", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
```

2. [Current weather - multiple cities Paginated](http://localhost:8080/weather/getMultipleCities?pageSize=3&page=4)

Body should be raw JSON.
Property `cities` should be an Array of string. (city names)
Request parameters has 2 properties

- `pageSize` - Total elements in each page. (Starts from 1)
- `page` - Page Number to be returned. (Starts from 1)

```javascript
body - raw JSON
{
    "cities": [
        "mumbai",
        "helsinki",
        "london",
        "new york",
        "ontario",
        "rio",
        "dubai",
        "sydney",
        "bangkok"
    ]
}
```

Making request to the endpoint

```javascript
var requestOptions = {
  method: "GET",
  body: raw,
  redirect: "follow",
};

fetch(
  "http://localhost:8080/weather/getMultipleCities?pageSize=3&page=4",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
```

3. [Current weather - 1 city](http://localhost:8080/weather/getCity)

Body should be raw JSON.
Property `city` should be a valid of string. (city name)

```javascript
body - raw JSON
{
    "city": "mumbai"
}
```

Making request to the endpoint

```javascript
var requestOptions = {
  method: "GET",
  body: raw,
  redirect: "follow",
};

fetch("http://localhost:8080/weather/getCity", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
```

4. [Forecast weather - multiple cities](http://localhost:8080/forecast/)

Body should be raw JSON.
Property `forecastArray` should be an Array of object containing 2 properties

- `city` - should be a valid city name.
- `days` - forecast of number of days required

```javascript
body - raw JSON
{
    "forecastArray":[
        {
            "city": "mumbai",
            "days": 5
        },
        {
            "city": "rio",
            "days": 7
        },
        {
            "city": "ontario",
            "days": 9
        },
        {
            "city": "helsinki",
            "days": 3
        }
    ]
}
```

Making request to the endpoint

```javascript
var requestOptions = {
  method: "GET",
  body: raw,
  redirect: "follow",
};

fetch("http://localhost:8080/forecast/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
```

5. [Filter - city, date, time](http://localhost:8080/filter?city=mumbai&date=2022-8-17&time=12:30)

Request parameters has 2 properties

- `city` - required city name
- `date` - date format `YYYY-MM-DD (Optional param)`
- `time` - time format `HH:MM (Optional param)`

Making request to the endpoint

```javascript
var requestOptions = {
  method: "GET",
  redirect: "follow",
};

fetch(
  "http://localhost:8080/filter?city=mumbai&date=2022-8-17&time=12:30",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
```

## To use postman documentation.

please click the link
[Postman - Documentation](https://documenter.getpostman.com/view/22832091/VUjTjhiW#5abef96d-593b-4ddc-bd6b-c13470bb9e7a)

## To run the API

Clone the repository

```
git clone {repo-name}
```

Install all dependencies - run command in the root of the project folder

```
npm i
```

or

```
yarn install
```

Initiaize Typescript compilation

```
npm run build
```

or

```
yarn run build
```

To start in dev mode

```
npm run dev
```

or

```
yarn run dev
```

To start in production mode

```
npm start
```

or

```
yarn start
```

## Env

Add a `.env` file in the root of the project

There are 3 env variables

```
PORT
WEATHER_API_KEY
WEATHER_API_URL
```

## Acquiring API key

Create an account [WeatherAPI](https://www.weatherapi.com/)

## Project built using

- [Express](https://expressjs.com/) - NodeJS framework
- [TypeScript](https://www.typescriptlang.org/) - TypeScript language
- [Postman](https://www.getpostman.com/) - API testing tool
