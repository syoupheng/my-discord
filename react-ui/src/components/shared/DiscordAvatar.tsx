import { FaDiscord } from 'react-icons/fa';

interface Props {
  className?: string
}

const DiscordAvatar = ({ className }: Props) => {
  return (
    <div className={`text-white rounded-full p-[5px] bg-red aspect-square ${className}`}>
      <FaDiscord size={22} />
    </div>
  );
}
 
export default DiscordAvatar;