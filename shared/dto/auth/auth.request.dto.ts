/*

    DTO - DATA TRANSFER OBJECT
    DTO for Auth part
    // Next Step - Add Zod 

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
