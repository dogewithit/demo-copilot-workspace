import { Test, TestingModule } from '@nestjs/testing';
import { MarketDataController } from './market-data.controller';
import { MarketDataService } from './market-data.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('MarketDataController', () => {
  let controller: MarketDataController;
  let service: MarketDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketDataController],
      providers: [
        {
          provide: MarketDataService,
          useValue: {
            getBitcoinMarketData: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MarketDataController>(MarketDataController);
    service = module.get<MarketDataService>(MarketDataService);
  });

  it('should return Bitcoin market data successfully', async () => {
    const mockData = { symbol: 'BTCUSDT', priceChange: '100.00' };
    jest.spyOn(service, 'getBitcoinMarketData').mockResolvedValue(mockData);

    const result = await controller.getBitcoinMarketData();
    expect(result).toEqual(mockData);
  });

  it('should handle HttpException from service', async () => {
    const error = new HttpException('Binance API error', HttpStatus.BAD_REQUEST);
    jest.spyOn(service, 'getBitcoinMarketData').mockRejectedValue(error);

    try {
      await controller.getBitcoinMarketData();
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect(err.message).toBe('Binance API error');
      expect(err.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    }
  });

  it('should handle unexpected errors', async () => {
    const error = new Error('Unexpected error');
    jest.spyOn(service, 'getBitcoinMarketData').mockRejectedValue(error);

    try {
      await controller.getBitcoinMarketData();
    } catch (err) {
      expect(err).toBeInstanceOf(HttpException);
      expect(err.message).toBe('Internal server error');
      expect(err.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });
});
