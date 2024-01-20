import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsecasesModule } from 'src/usecases/usecases.module';

@Module({
  imports: [UsecasesModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
