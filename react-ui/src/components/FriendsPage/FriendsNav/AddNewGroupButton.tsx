import NewPrivateGroupIcon from "@/components/Icons/NewPrivateGroupIcon";
import MyPopover from "@/components/shared/MyPopover";
import PopoverLoadingFallback from "@/components/shared/PopoverLoadingFallback";
import TooltipWrapper from "@/components/shared/TooltipWrapper";
import { Suspense, lazy } from "react";

const AddNewGroupPopup = lazy(() => import("@/components/privateGroups/AddNewGroupPopup"));

const AddNewGroupButton = () => {
  return (
    <MyPopover placement="bottom-end" offset={5} className="shrink-0 mx-2">
      <TooltipWrapper tooltipTxt="Nouveau groupe privé" direction="left" size="sm" className="cursor-pointer hover:text-secondary-light">
        <MyPopover.Button className="focus:outline-none">
          <NewPrivateGroupIcon />
        </MyPopover.Button>
      </TooltipWrapper>
      <MyPopover.Panel className="z-40 bg-primary border border-gray-800 w-[440px] rounded-md drop-shadow-lg animate-fade-in">
        {(close) => (
          <Suspense fallback={<PopoverLoadingFallback style={{ height: "400px" }} />}>
            <AddNewGroupPopup closePopover={close} />
          </Suspense>
        )}
      </MyPopover.Panel>
    </MyPopover>
  );
};

export default AddNewGroupButton;
