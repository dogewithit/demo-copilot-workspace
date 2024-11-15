import { Module } from '@nestjs/common';
import { TriangularArbitrageService } from './triangular-arbitrage.service';
import { TriangularArbitrageController } from './triangular-arbitrage.controller';

@Module({
  providers: [TriangularArbitrageService],
  controllers: [TriangularArbitrageController],
  exports: [TriangularArbitrageService],
})
export class TriangularArbitrageModule {}
