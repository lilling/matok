import { Injectable } from '@nestjs/common';
import { configService } from '../../environments/config.service';

@Injectable()
export class DbService {
  getDbConnection() {
    return configService.getTypeOrmConfig();
  }
}
