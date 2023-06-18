import UserAvatar from "@/components/shared/UserAvatar";
import { AuthUserFragment, ChannelMemberFragment } from "@/gql/graphql";
import { Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";

type Props = {
  mention: ChannelMemberFragment;
  authUser: AuthUserFragment;
  mentionSearch: string;
  active: boolean;
};

const MentionOptionItem = ({ mention, authUser, mentionSearch, active }: Props) => {
  const { username, id, avatarColor, discriminator } = mention;
  const { friends, id: authUserId, status: authUserStatus } = authUser;
  const editor = useSlate();
  const { path, offset } = editor.selection?.anchor!;
  const onClick = () => {
    Transforms.delete(editor, {
      at: {
        anchor: editor.selection?.anchor!,
        focus: { path, offset: offset - (mentionSearch.length + 1) },
      },
    });

    Transforms.insertNodes(editor, { type: "mention", tag: `${username}#${discriminator}`, children: [{ text: "" }] });
    Transforms.move(editor, { distance: 1, unit: "offset" });
    Transforms.insertText(editor, " ");
    ReactEditor.focus(editor);
  };
  return (
    <div onClick={onClick} className="px-2 text-sm leading-4 font-medium" role="option">
      <div className={`cursor-pointer rounded-[3px] p-2 hover:bg-mod-hov ${active ? "bg-mod-hov" : ""}`}>
        <div className="flex items-center text-h-secondary min-h-[16px]">
          <div className="shrink-0 grow-0 basis-auto mr-2">
            <UserAvatar
              avatarColor={avatarColor}
              size="sm"
              status={[...friends, { id: authUserId, status: authUserStatus }].find((friend) => friend.id === id)?.status ?? "INVISIBLE"}
            />
          </div>
          <div className="flex-auto ">
            <div className=" text-white text-base leading-5 font-normal">{username}</div>
          </div>
          <div className="grow-0 shrink-0 basis-auto ml-4 overflow-hidden whitespace-nowrap text-ellipsis font-normal text-xs">
            <span>{username}</span>
            <span className="opacity-60">#{discriminator}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentionOptionItem;
