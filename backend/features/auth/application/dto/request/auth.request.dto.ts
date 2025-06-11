/*

    DTO - DATA TRANSFER OBJECT
    DTO for Auth part

*/

export interface SignUpDTO {
  email: string;
  password: string;
  userName: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}
