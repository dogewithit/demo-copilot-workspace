import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MarketDataService } from './market-data.service';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('MarketDataService', () => {
  let service: MarketDataService;
  let mock: MockAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketDataService],
    }).compile();

    service = module.get<MarketDataService>(MarketDataService);
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should fetch Bitcoin market data successfully', async () => {
    const mockData = { symbol: 'BTCUSDT', priceChange: '100.00' };
    mock.onGet('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT').reply(200, mockData);

    const result = await service.getBitcoinMarketData();
    expect(result).toEqual(mockData);
  });

  it('should handle Binance API error response', async () => {
    mock.onGet('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT').reply(400, { msg: 'Bad Request' });

    try {
      await service.getBitcoinMarketData();
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Binance API error: [object Object]');
      expect(error.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should handle no response from Binance API', async () => {
    mock.onGet('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT').networkError();

    try {
      await service.getBitcoinMarketData();
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('No response from Binance API');
      expect(error.getStatus()).toBe(HttpStatus.GATEWAY_TIMEOUT);
    }
  });

  it('should handle other errors', async () => {
    mock.onGet('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT').timeout();

    try {
      await service.getBitcoinMarketData();
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Error in fetching data: timeout of 0ms exceeded');
      expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });
});
