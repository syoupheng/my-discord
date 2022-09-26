import useAuthUserCache from "../hooks/auth/useAuthUserCache";

const UserPage = () => {

  const authUser = useAuthUserCache();

  return (
    <h2>{authUser?.username}</h2>
  );
}
 
export default UserPage;