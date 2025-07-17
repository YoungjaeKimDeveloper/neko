/*
    Profile Repo
*/

import User from "../../../auth/domain/entities/user";
import { ProfileUpdateDTO } from "../dto/profile.dto";

export interface ProfileRepo {
  updateProfile: (parameters: ProfileUpdateDTO) => Promise<User | null>;
}
