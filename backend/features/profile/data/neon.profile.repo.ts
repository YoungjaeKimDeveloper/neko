/*
    Implement Profile repo using Neon
    01/07/2025 
    
*/

import User from "../../auth/domain/entities/user";
import { ProfileRepo } from "../domain/repo/profile.repo";
import { ProfileUpdateDto } from "../domain/dto/profile.dto";
import sql from "../../../db/config/db";
import { errorLogV2 } from "../../../../shared/error/error.log";
// Class
class NeonProfile implements ProfileRepo {
  updateProfile = async (
    parameters: ProfileUpdateDto
  ): Promise<User | null> => {
    try {
      const users = await sql`
    UPDATE users
    SET
    user_profile_image = ${parameters.updated_profile_image_url},
    location = ${parameters.updated_location}
    WHERE id = ${parameters.user_id}
    RETURNING * 
    `;
      return users[0] as User;
    } catch (error) {
      errorLogV2({
        error: error,
        file: "neon.profile.repo.ts",
        function: "NeonProfile",
      });
    }
    return null;
  };
}

export default NeonProfile;
