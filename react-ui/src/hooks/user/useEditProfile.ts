import { gql } from "@apollo/client";
import useAuthMutation from "../auth/useAuthMutation";

const EDIT_PROFILE = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(editProfileInput: $input) {
      id
      username
      status
      phoneNumber
      email
    }
  }
`;

const useEditProfile = () => {
  return useAuthMutation(EDIT_PROFILE);
};

export default useEditProfile;
