interface Props {
  text: string,
  green?: boolean
}

const FriendsNavlink = ({ text, green = false }: Props) => {
  return (
    <div
      className={`mx-2 px-2 text-center align-middle min-w-[40px] shrink-0 rounded font-medium cursor-pointer text-btw-base-sm ${
        green
          ? "text-white bg-green-700"
          : "hover:bg-grey-hov hover:text-secondary-light"
      }`}
    >
      {text}
    </div>
  );
}
 
export default FriendsNavlink;