import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MarketDataService {
  async getBitcoinMarketData() {
    try {
      const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new HttpException(`Binance API error: ${error.response.data}`, HttpStatus.BAD_REQUEST);
      } else if (error.request) {
        // The request was made but no response was received
        throw new HttpException('No response from Binance API', HttpStatus.GATEWAY_TIMEOUT);
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new HttpException(`Error in fetching data: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
