/**
 * User model.
 */
export class User {
    user_id?: number;
    org_id?: number;
    role_id?: string;
    role_name?: string;
    email?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    create_time?: string;
    enabled?: number;
    token?: string;
}
