import useIsMessageAuthor from "../../../hooks/chat-messages/useIsMessageAuthor";
import DeleteMessageButton from "./DeleteMessageButton";
import MessageRespondButton from "./MessageRespondButton";

interface Props {
  isConsecutive: boolean;
}

const ButtonContainer = ({ isConsecutive }: Props) => {
  const isAuthor = useIsMessageAuthor();
  return (
    <div className="absolute top-0 right-0">
      <div
        className={`absolute ${
          isConsecutive ? "top-[-25px]" : "top-[-16px]"
        } top-[-16px] right-0 z-[1] py-0 pr-[14px] pl-8 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto hover:drop-shadow-xl`}
      >
        <div className="bg-primary shadow-[0_0_0_1px_rgba(5,5,6,0.15)] grid grid-flow-col h-8 rounded items-center justify-start select-none transition-shadow duration-100 ease-out relative overflow-hidden">
          <MessageRespondButton />
          {isAuthor && <DeleteMessageButton />}
        </div>
      </div>
    </div>
  );
};

export default ButtonContainer;
