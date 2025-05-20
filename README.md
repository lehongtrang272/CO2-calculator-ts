# CO2 Calculator Nodejs & Typescript Application

### Introduction

This is an Express.js & Typescript microservice that calculates CO2 footprint based on transport type, product footprint and target country.

The project is created with future extensibility in mind while trying to keep the set up from getting too complicated and following closely SOLID principles.

Using the two provided service: https://frankvisuals.github.io/co2-data/footprints.json & https://frankvisuals.github.io/co2-data/transport.json , the application provides a post endpoint `/calculate ` that calculate the carbon footprint using the request body format:

```json
{
  "footprint": "product_name",
  "transport": "transport_type",
  "targetCountry": "target_country"
}
```

For more information about the request structure, please check out the file http-requests/calculate-api.http for example structure of the api request. The file can also be used as a point of simple integration testing using Rest-client plugin on VSCode.

### Start the application

When running the project for the first time please run

```shell
npm install
```

Afterward you can run the project using:

```shell
npm start
```

### Run the test

```shell
npm test
```

### Dependencies

- express
- axios
- typescript
- ts-node
- nodemon // for local hot-reload
- jest
