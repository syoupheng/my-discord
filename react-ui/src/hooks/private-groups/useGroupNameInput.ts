import { useState } from "react";
import { PrivateGroupFragment } from "@/gql/graphql";
import useEditGroupName from "@/hooks/private-groups/useEditGroupName";
import { ZodError, z } from "zod";
import { toast } from "react-hot-toast";
import { ERROR_MESSAGE } from "@/utils/apollo";

export const editGroupNameInputSchema = z.object({
  groupId: z.number().int().positive(),
  name: z.string().min(1).max(50),
});

const useGroupNameInput = ({ id, name }: PrivateGroupFragment) => {
  const [nameInput, setNameInput] = useState(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [confirmName] = useEditGroupName();

  const onConfirm = async () => {
    try {
      const payload = editGroupNameInputSchema.parse({ groupId: id, name: nameInput });
      if (name !== nameInput)
        await confirmName({
          variables: { input: payload },
          optimisticResponse: {
            editGroupName: {
              id,
              __typename: "PrivateGroup",
              name: nameInput,
            },
          },
        });
    } catch (err) {
      console.error(err);
      if (err instanceof ZodError) toast.error(err.errors[0] ? err.errors[0].message : ERROR_MESSAGE);
      setNameInput(name);
    }
    setIsFocused(false);
  };
  return { nameInput, setNameInput, isFocused, setIsFocused, isHovered, setIsHovered, onConfirm };
};

export default useGroupNameInput;
