import { UserRole } from './UserRole';
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string; 
  deleted_at?: string | null;

  UserRoles?: UserRole[];
}