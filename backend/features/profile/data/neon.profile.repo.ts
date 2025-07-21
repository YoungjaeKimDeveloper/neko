import { UserProfile } from "./../../../../shared/dto/profile/profile.dto";
/*
    Implement Profile repo using Neon(01/07/2025)
     - 1.update user porifle - data layer
     - 2.fetch user Profile
*/

import type User from "../../auth/domain/entities/user";

import { ProfileRepo } from "../domain/repo/profile.repo";
import {
  ProfileUpdateDTO,
  SearchUserProfileDTO,
} from "../domain/dto/profile.dto";
import sql from "../../../db/config/db";
import { errorLogV2 } from "../../../../shared/error/error.log";

class NeonProfile implements ProfileRepo {
  updateProfile = async (parameters: ProfileUpdateDTO): Promise<any> => {
    try {
      const users = await sql`
      UPDATE users
      SET
      user_profile_image = ${parameters.updated_profile_image_url},
      location = ${parameters.updated_location}
      WHERE id = ${parameters.user_id}
      RETURNING * 
    `;
      return users.length > 0 ? (users[0] as User) : null;
    } catch (error) {
      errorLogV2({
        error: error,
        file: "neon.profile.repo.ts",
        function: "NeonProfile",
      });
    }
    return null;
  };
  // fetch user profile
  // Data layer
  fetchUserProfile = async ({
    userName,
  }: SearchUserProfileDTO): Promise<UserProfile | null> => {
    try {
      const user = await sql`
        SELECT email,user_name,user_profile_image,location,created_at
        FROM users
        WHERE user_name = ${userName}
      `;
      return user.length > 0 ? (user[0] as UserProfile) : null;
    } catch (error) {
      errorLogV2({
        error: error,
        function: "fetchUserProfile",
        file: "neon.profile.repo.ts",
      });
    }
    return null;
  };
}

export default NeonProfile;



