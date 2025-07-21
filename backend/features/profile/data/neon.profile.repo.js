"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../db/config/db"));
const error_log_1 = require("../../../../shared/error/error.log");
class NeonProfile {
    constructor() {
        this.updateProfile = async (parameters) => {
            try {
                const users = await (0, db_1.default) `
      UPDATE users
      SET
      user_profile_image = ${parameters.updated_profile_image_url},
      location = ${parameters.updated_location}
      WHERE id = ${parameters.user_id}
      RETURNING * 
    `;
                return users.length > 0 ? users[0] : null;
            }
            catch (error) {
                (0, error_log_1.errorLogV2)({
                    error: error,
                    file: "neon.profile.repo.ts",
                    function: "NeonProfile",
                });
            }
            return null;
        };
        // fetch user profile
        // Data layer
        this.fetchUserProfile = async ({ userName, }) => {
            try {
                const user = await (0, db_1.default) `
        SELECT email,user_name,user_profile_image,location,created_at
        FROM users
        WHERE user_name = ${userName}
      `;
                return user.length > 0 ? user[0] : null;
            }
            catch (error) {
                (0, error_log_1.errorLogV2)({
                    error: error,
                    function: "fetchUserProfile",
                    file: "neon.profile.repo.ts",
                });
            }
            return null;
        };
    }
}
exports.default = NeonProfile;
