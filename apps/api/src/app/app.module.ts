import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../environments/config.service';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      ...configService.getTypeOrmConfig(),
    }),
    IngredientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
