import useAuthUserCache from "../../hooks/auth/useAuthUserCache";
import UserPopoverButton from "./UserPopoverButton";
import UserProfileCard from "./UserProfileCard";
import MyPopover from "../shared/MyPopover";

const UserProfilePopover = () => {
  const authUser = useAuthUserCache();

  return (
    <MyPopover className="grow max-w-[120px]">
      <MyPopover.Button className="flex items-center rounded hover:bg-grey-hov cursor-pointer focus:outline-none w-full">
        <UserPopoverButton {...authUser} />
      </MyPopover.Button>
      <MyPopover.Panel className="z-40 bg-secondary-alt rounded-md shadow-2xl animate-fade-in">
        {(close) => <UserProfileCard {...authUser} closePopover={close} />}
      </MyPopover.Panel>
    </MyPopover>
  );
};

export default UserProfilePopover;
