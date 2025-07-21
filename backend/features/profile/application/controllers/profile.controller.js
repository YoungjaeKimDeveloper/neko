"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserProfile = exports.updateUserProfile = void 0;
const neon_profile_repo_1 = __importDefault(require("../../data/neon.profile.repo"));
const response_helper_1 = require("../../../../lib/utils/response/helper/response.helper");
const http_status_1 = require("../../../../../shared/constants/http-status");
const error_log_1 = require("../../../../../shared/error/error.log");
const cloudinary_config_1 = __importDefault(require("../../../../lib/cloudinary/cloudinary.config"));
// neon Profile - neon instance
const neonProfile = new neon_profile_repo_1.default();
const updateUserProfile = async (req, res) => {
    try {
        const { updated_location, updated_profile_image_url } = req.body;
        const userId = req.user.id;
        // Validation - Authenticated user
        if (!userId) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
                message: "Userid is required to update profile",
            });
        }
        // upload user profile to cloudinary
        const uploadImage = await cloudinary_config_1.default.uploader.upload(updated_profile_image_url);
        const updatedImageUrl = uploadImage.secure_url;
        // update user data - postgresql(neon) - data layer
        const result = await neonProfile.updateProfile({
            user_id: userId,
            updated_location: updated_location,
            updated_profile_image_url: updatedImageUrl,
        });
        // failed to update user profile
        if (result == null) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                success: false,
                status: http_status_1.RESPONSE_HTTP.INTERNAL,
                message: "Internal server error to update user profile",
            });
        }
        return (0, response_helper_1.sendResponseV2)({
            res: res,
            success: true,
            status: http_status_1.RESPONSE_HTTP.OK,
            message: "User profile updated successfully",
            data: result,
        });
    }
    catch (error) {
        return (0, error_log_1.errorLogV2)({
            error: error,
            file: "profile.controller.ts",
            function: "updateUserProfile",
        });
    }
};
exports.updateUserProfile = updateUserProfile;
const fetchUserProfile = async (req, res) => {
    // Extract the value
    try {
        const { userName } = req.params;
        // Validation 0 - no userName
        if (!userName) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                message: "User name is required to search user profile",
                status: http_status_1.RESPONSE_HTTP.BAD_REQUEST,
                success: false,
            });
        }
        // fetch user Profile - neon(DB)
        const userProfile = await neonProfile.fetchUserProfile({ userName });
        // Validation - 1 cannot find the userProfile from DB
        if (!userProfile) {
            return (0, response_helper_1.sendResponseV2)({
                res: res,
                message: "Failed to find the user profile from DB",
                status: http_status_1.RESPONSE_HTTP.NOT_FOUND,
                success: false,
            });
        }
        // return data
        return (0, response_helper_1.sendResponseV2)({
            res: res,
            data: userProfile,
            message: "Fetched User Profile Successfully",
            status: http_status_1.RESPONSE_HTTP.OK,
            success: true,
        });
    }
    catch (error) {
        (0, error_log_1.errorLogV2)({
            error: error,
            function: "fetchUserProfile",
            file: "profile.controller.ts",
        });
        return null;
    }
};
exports.fetchUserProfile = fetchUserProfile;
