import { User } from '../user.entity';

export type NewUser = Omit<User, 'id'>;
