/*
    Profile Repo
    contract base 
    - DDD
    */

import User from "../../../auth/domain/entities/user";
import { ProfileUpdateDTO, SearchUserProfileDTO } from "../dto/profile.dto";

export interface ProfileRepo {
  updateProfile: (parameters: ProfileUpdateDTO) => Promise<any>;
  fetchUserProfile: (userName: SearchUserProfileDTO) => Promise<any>;
}
