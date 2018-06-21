import { User } from './user';
/**
 * Authentication model.
 */
export class Auth {
    token?: string;
    email?: string;
    password?: string;
    user?: User;
}
