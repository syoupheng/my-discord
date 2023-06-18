import useAuthUser from "@/hooks/auth/useAuthUser";

const useAuthUserCache = () => {
  const { data } = useAuthUser({ fetchPolicy: "cache-only" });
  if (!data) throw new Error("This hook must be called in the authenticated part of the application !");
  return data.me;
};

export default useAuthUserCache;
