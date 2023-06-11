import { graphql } from "@/gql";
import useAuthMutation from "@/hooks/auth/useAuthMutation";

const EDIT_PROFILE = graphql(`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(editProfileInput: $input) {
      id
      username
      status
      phoneNumber
    }
  }
`);

const useEditProfile = () => {
  return useAuthMutation(EDIT_PROFILE);
};

export default useEditProfile;
