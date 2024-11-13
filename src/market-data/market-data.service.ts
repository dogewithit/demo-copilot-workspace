import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MarketDataService {
  async getBitcoinMarketData() {
    const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
    return response.data;
  }
}
