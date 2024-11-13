# demo-copilot-workspace

## NestJS Project

This project is a NestJS application that includes a module for collecting Bitcoin market data from Binance.

### Market Data Module

The `market-data` module is responsible for fetching Bitcoin market data from the Binance API. It includes a controller, service, and DTO for handling the data.

### Running the Project

To run the project, follow these steps:

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Start the NestJS application:
   ```bash
   npm run start
   ```

### Using the Market Data Module

The `market-data` module provides an endpoint to fetch the latest Bitcoin market data from Binance. You can access the endpoint at:

```
GET /market-data/bitcoin
```

This will return the latest Bitcoin market data in JSON format.
