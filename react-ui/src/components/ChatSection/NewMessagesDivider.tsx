import { forwardRef } from "react";
import NewMessagesTriangle from "../Icons/NewMessagesTriangleIcon";

interface Props {
  date?: string | null;
}

const NewMesaggesDivider = forwardRef<HTMLDivElement, Props>(({ date }, ref) => {
  return (
    <div
      ref={ref}
      className="mb-[-1px] top-2 border-red-divider z-[1] h-0 border-t flex items-center justify-center relative pointer-events-none ml-4 mr-[0.875rem]"
    >
      {date && (
        <span className="block grow-0 shrink-0 basis-auto py-[2px] px-1 bg-primary text-red-divider leading-[13px] text-xs mt-[-1px] font-semibold rounded-lg">
          {date}
        </span>
      )}
      <span className="absolute h-[13px] flex items-center justify-center top-[-7px] right-0 text-[10px] leading-[9px] font-bold pr-1 pl-[1px] uppercase text-white bg-red-divider border-l-0">
        <div className="absolute -left-2 top-0 h-[13px] text-red-divider">
          <NewMessagesTriangle />
        </div>
        nouveau
      </span>
    </div>
  );
});

export default NewMesaggesDivider;
