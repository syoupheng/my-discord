import { useEffect, useState } from "react";
import { editGroupNameInputSchema, PrivateGroup } from "../../types/private-group";
import useEditGroupName from "./useEditGroupName";

const useGroupNameInput = ({ id, name }: PrivateGroup) => {
  const [nameInput, setNameInput] = useState(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [confirmName] = useEditGroupName();

  useEffect(() => {
    setNameInput(name);
  }, [name]);

  const onConfirm = async () => {
    try {
      const payload = editGroupNameInputSchema.parse({ groupId: id, name: nameInput });
      if (name !== nameInput)
        await confirmName({
          variables: { input: payload },
          optimisticResponse: {
            editGroupName: {
              id,
              typename: "PrivateGroup",
              name: nameInput,
            },
          },
        });
    } catch (err) {
      console.error(err);
    }
    setIsFocused(false);
  };
  return { nameInput, setNameInput, isFocused, setIsFocused, isHovered, setIsHovered, onConfirm };
};

export default useGroupNameInput;
