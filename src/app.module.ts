import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarketDataModule } from './market-data/market-data.module';
import { TriangularArbitrageModule } from './triangular-arbitrage/triangular-arbitrage.module';

@Module({
  imports: [MarketDataModule, TriangularArbitrageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
