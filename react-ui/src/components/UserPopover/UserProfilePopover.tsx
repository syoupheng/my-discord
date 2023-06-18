import MyPopover from "@/components/shared/MyPopover";
import PopoverLoadingFallback from "@/components/shared/PopoverLoadingFallback";
import UserPopoverButton from "@/components/UserPopover/UserPopoverButton";
import useAuthUserCache from "@/hooks/auth/useAuthUserCache";
import { lazy, Suspense } from "react";

const UserProfileCard = lazy(() => import("@/components/UserPopover/UserProfileCard"));

const UserProfilePopover = () => {
  const authUser = useAuthUserCache();

  return (
    <MyPopover className="overflow-hidden mr-2" style={{ minWidth: "100px" }}>
      <MyPopover.Button className="flex items-center rounded hover:bg-grey-hov cursor-pointer focus:outline-none w-full">
        <UserPopoverButton {...authUser} />
      </MyPopover.Button>
      <MyPopover.Panel className="z-40 bg-secondary-alt rounded-md shadow-2xl animate-fade-in" style={{ width: "335px" }}>
        {(close) => (
          <Suspense fallback={<PopoverLoadingFallback style={{ minHeight: "284px", minWidth: "335px" }} />}>
            <UserProfileCard {...authUser} closePopover={close} />
          </Suspense>
        )}
      </MyPopover.Panel>
    </MyPopover>
  );
};

export default UserProfilePopover;
