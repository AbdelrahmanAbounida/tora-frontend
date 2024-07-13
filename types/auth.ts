export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
  }
  
  export interface DecodedToken {
    exp: number;
    iat: number;
    [key: string]: any;
  }
