# demo-copilot-workspace

## NestJS Project

This project is a NestJS application that includes a module for collecting Bitcoin market data from Binance.

### Market Data Module

The `market-data` module is responsible for fetching Bitcoin market data from the Binance API. It includes a controller, service, and DTO for handling the data.

### Triangular Arbitrage Module

The `triangular-arbitrage` module is responsible for performing triangular arbitrage on BTC, ETH, and BNB using the Binance API. It includes a controller, service, and DTO for handling arbitrage data.

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

### Using the Triangular Arbitrage Module

The `triangular-arbitrage` module provides an endpoint to fetch the latest triangular arbitrage opportunities. You can access the endpoint at:

```
GET /triangular-arbitrage
```

This will return the latest triangular arbitrage opportunities in JSON format.
