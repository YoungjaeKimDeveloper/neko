/*

    SERVICE USER ENTITY

*/
export default interface User {
  id: string;
  email: string;
  password: string;
  user_name: string;
  user_profile_image?: string;
  location?: string;
  created_at?: Date;
}

// Searched User profile
// 19-07-2025
