import { SearchUserProfileDTO } from "./../../domain/dto/profile.dto";
/*
    Profile Controller
      - Feat: Update users' profile
*/
import { Response, Request } from "express";
import NeonProfile from "../../data/neon.profile.repo";
import { ResponseDTO } from "../../../../../shared/dto/common/response.dto";
import { VerifiedUserRequest } from "../../../post/application/controllers/post.controller";
import { sendResponseV2 } from "../../../../lib/utils/response/helper/response.helper";
import { RESPONSE_HTTP } from "../../../../../shared/constants/http-status";
import { errorLogV2 } from "../../../../../shared/error/error.log";
import cloudinary from "../../../../lib/cloudinary/cloudinary.config";
import { RESPONSE_MESSAGES } from "../../../../lib/utils/constants/messages";

// neon Profile - neon instance
const neonProfile = new NeonProfile();
export const updateUserProfile = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    const { updated_location, updated_profile_image_url } = req.body;
    const userId = (req as VerifiedUserRequest).user.id;
    // Validation - Authenticated user
    if (!userId) {
      return sendResponseV2({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: "Userid is required to update profile",
      });
    }
    // upload user profile to cloudinary
    const uploadImage = await cloudinary.uploader.upload(
      updated_profile_image_url
    );
    const updatedImageUrl = uploadImage.secure_url;
    // update user data - postgresql(neon) - data layer
    const result = await neonProfile.updateProfile({
      user_id: userId,
      updated_location: updated_location,
      updated_profile_image_url: updatedImageUrl,
    });
    // failed to update user profile
    if (result == null) {
      return sendResponseV2({
        res: res,
        success: false,
        status: RESPONSE_HTTP.INTERNAL,
        message: "Internal server error to update user profile",
      });
    }
    return sendResponseV2({
      res: res,
      success: true,
      status: RESPONSE_HTTP.OK,
      message: "User profile updated successfully",
      data: result,
    });
  } catch (error) {
    return errorLogV2({
      error: error,
      file: "profile.controller.ts",
      function: "updateUserProfile",
    });
  }
};

export const fetchUserProfile = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  // Extract the value
  try {
    const { userName } = req.params;
    // Validation 0 - no userName
    if (!userName) {
      return sendResponseV2({
        res: res,
        message: "User name is required to search user profile",
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
      });
    }
    // fetch user Profile - neon(DB)
    const userProfile = await neonProfile.fetchUserProfile({ userName });
    // Validation - 1 cannot find the userProfile from DB
    if (!userProfile) {
      return sendResponseV2({
        res: res,
        message: "Failed to find the user profile from DB",
        status: RESPONSE_HTTP.NOT_FOUND,
        success: false,
      });
    }
    // return data
    return sendResponseV2({
      res: res,
      data: userProfile,
      message: "Fetched User Profile Successfully",
      status: RESPONSE_HTTP.OK,
      success: true,
    });
  } catch (error) {
    errorLogV2({
      error: error,
      function: "fetchUserProfile",
      file: "profile.controller.ts",
    });
    return null;
  }
};
