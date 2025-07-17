/*
    Profile Repo
*/

import User from "../../../auth/domain/entities/user";
import { ProfileUpdateDTO } from "../dto/profile.dto";

export interface ProfileRepo {
  updateProfileWithImages: (
    parameters: ProfileUpdateDTO
  ) => Promise<User | null>;
  updateProfileWithoutImages: (
    parameters: ProfileUpdateDTO
  ) => Promise<User | null>;
}
