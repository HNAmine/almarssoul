export interface Credentials {
  login: string;
  password: string;
}

export interface User {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  repassword?: string;
  phone?: string;
  address?: string;
  roles?: Role[];
}

export interface Token {
  sub?: string;
  user?: User;
  iat: number | Date;
  exp: number | Date;
}

export enum Role {
  ROLE_ADMIN = 'ROLE_ADMIN', ROLE_CLIENT = 'ROLE_CLIENT'
}

export interface PasswordConfirmation {
  id?: number;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  receiveNotification?: boolean;
}
