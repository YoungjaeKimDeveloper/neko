/*
    Profile Repo
*/

import User from "../../../auth/domain/entities/user";
import { ProfileUpdateDto } from "../dto/profile.dto";

export interface ProfileRepo {
  updateProfile: (parameters: ProfileUpdateDto) => Promise<User | null>;
}
