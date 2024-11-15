import { Controller, Get } from '@nestjs/common';
import { TriangularArbitrageService } from './triangular-arbitrage.service';

@Controller('triangular-arbitrage')
export class TriangularArbitrageController {
  constructor(private readonly triangularArbitrageService: TriangularArbitrageService) {}

  @Get()
  async getArbitrageOpportunities() {
    return this.triangularArbitrageService.performTriangularArbitrage();
  }
}
