/*

    SERVICE USER ENTITY

*/
export default interface User {
  id: string;
  email: string;
  password: string;
  user_name: string;
  user_profile_image?: string;
  created_at: Date;
}
