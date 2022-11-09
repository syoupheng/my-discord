import { gql, useMutation } from "@apollo/client";

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
  return useMutation(EDIT_PROFILE);
};

export default useEditProfile;
