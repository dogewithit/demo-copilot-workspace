import { Controller, Get } from '@nestjs/common';
import { MarketDataService } from './market-data.service';

@Controller('market-data')
export class MarketDataController {
  constructor(private readonly marketDataService: MarketDataService) {}

  @Get('bitcoin')
  async getBitcoinMarketData() {
    return this.marketDataService.getBitcoinMarketData();
  }
}
