import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TriangularArbitrageService {
  async performTriangularArbitrage() {
    const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ETHBTC', 'BNBBTC', 'BNBETH'];
    const marketData = await Promise.all(
      symbols.map(async (symbol) => {
        const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
        return response.data;
      })
    );

    const prices = {};
    marketData.forEach((data) => {
      prices[data.symbol] = parseFloat(data.lastPrice);
    });

    const arbitrageOpportunities = [];

    // BTC -> ETH -> BNB -> BTC
    const btcEthBnbBtc = (prices['BTCUSDT'] / prices['ETHUSDT']) * prices['BNBETH'] * prices['BNBUSDT'];
    if (btcEthBnbBtc > prices['BTCUSDT']) {
      arbitrageOpportunities.push({
        path: 'BTC -> ETH -> BNB -> BTC',
        profit: btcEthBnbBtc - prices['BTCUSDT'],
      });
    }

    // BTC -> BNB -> ETH -> BTC
    const btcBnbEthBtc = (prices['BTCUSDT'] / prices['BNBUSDT']) * prices['BNBETH'] * prices['ETHUSDT'];
    if (btcBnbEthBtc > prices['BTCUSDT']) {
      arbitrageOpportunities.push({
        path: 'BTC -> BNB -> ETH -> BTC',
        profit: btcBnbEthBtc - prices['BTCUSDT'],
      });
    }

    return arbitrageOpportunities;
  }
}
