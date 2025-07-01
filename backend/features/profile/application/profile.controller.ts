/*
    Profile Controller
*/
import { Response, Request } from "express";
import NeonProfile from "../data/neon.profile.repo";
import { ResponseDTO } from "../../../../shared/dto/common/response.dto";
import { ProfileUpdateDto } from "../domain/dto/profile.dto";
import { VerifiedUserRequest } from "../../post/application/controllers/post.controller";
import { sendResponseV2 } from "../../../lib/utils/response/helper/response.helper";
import { RESPONSE_HTTP } from "../../../../shared/constants/http-status";
import { errorLogV2 } from "../../../../shared/error/error.log";
import cloudinary from "../../../lib/cloudinary/cloudinary.config";

const neonProfile = new NeonProfile();
export const updateUserProfile = async (
  req: Request,
  res: Response<ResponseDTO>
): Promise<any> => {
  try {
    const { updated_location, updated_profile_image_url } = req.body;
    const userId = (req as VerifiedUserRequest).user.id;
    if (!userId) {
      return sendResponseV2({
        res: res,
        status: RESPONSE_HTTP.BAD_REQUEST,
        success: false,
        message: "Userid is required to update profile",
      });
    }
    const uploadImage = await cloudinary.uploader.upload(
      updated_profile_image_url
    );
    const updatedImageUrl = uploadImage.secure_url;
    const result = await neonProfile.updateProfile({
      user_id: userId,
      updated_location: updated_location,
      updated_profile_image_url: updatedImageUrl,
    });
    if (result == null) {
      throw new Error("Failed to update Profile");
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
