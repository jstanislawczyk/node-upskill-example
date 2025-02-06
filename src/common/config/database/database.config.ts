import {DataSourceOptions} from 'typeorm';
import {User} from '../../../user-management/user.entity';

export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'node-example',
  entities: [
    User,
  ],
  synchronize: true,
} satisfies DataSourceOptions;
