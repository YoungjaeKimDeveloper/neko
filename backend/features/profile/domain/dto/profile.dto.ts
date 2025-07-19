/*

    ProfileUpdate DTO 
    DTO(Data Transfer Object)

*/
export interface ProfileUpdateDTO {
  user_id: string;
  updated_location?: string;
  updated_profile_image_url?: string;
}

export interface SearchUserProfileDTO {
  userName: string;
}

//  DTO 만들고 유저 프로파일 찾는로직 repo - neon - controller - router - frontend순으로가야함
