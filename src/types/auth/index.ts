/** user's role */

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  refreshToken: string;
  authenticated: boolean
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  address: string;
  avatar?: string;
  coverImage?: string;
  role: string;
  categoryList: string[];
}

export interface Role {
  roleID: string;
  name: string;
}

export interface Wallet {
  walletId: string;
  balance: number;
}

export interface SignUpResponse {
  accountId?: string;
  username: string;
  handle?: string;
  email: string;
  bio?: string;
  gender?: string;
  address?: string;
  avatar?: string;
  createdDate?: string;
  status?: string;
  role?: Role;
  categoryList?: string[];
  wallet?: Wallet;
}

export interface LogoutParams {
  token: string;
}

export interface LogoutResult {

}

export interface RefreshTokenResponse {
  accessToken: string
}