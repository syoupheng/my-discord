import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";
import useAddFriend from "@/hooks/friend-requests/useAddFriend";
import useRequestTimeout from "@/hooks/shared/useRequestTimeout";
import { toast } from "react-hot-toast";
import { ERROR_MESSAGE } from "@/utils/apollo";

const useAddFriendForm = () => {
  const [friendTag, setFriendTag] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState("");

  const {
    result: [sendFriendRequest, { reset, loading }],
    abortController,
  } = useAddFriend({
    onCompleted: () => {
      setSuccess(friendTag);
      setFriendTag("");
    },
    onError: setError,
  });

  useRequestTimeout({
    isLoading: loading,
    onTimeout: () => {
      abortController.current.abort();
      toast.error(ERROR_MESSAGE);
    },
    timeout: 20000,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFriendTag(e.target.value);
    setSuccess(null);
    reset();
  };

  const friendTagSchema = z.object({
    discriminator: z.string().length(4).regex(/^\d+$/),
    username: z.string().min(1),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const splitTag = friendTag.split("#");
    if (splitTag.length !== 2) {
      setError(`Nous avons besoin du tag de ${friendTag} pour le différencier des autres.`);
      return;
    }

    const [username, discriminator] = splitTag;
    const payload = { discriminator, username };
    try {
      friendTagSchema.parse(payload);
    } catch (err) {
      setError("Mhm, ça n'a pas bien marché. Vérifie bien que la casse, l'orthographe, les espaces et les chiffres sont correctes.");
      return;
    }
    sendFriendRequest({ variables: { input: payload } });
  };
  return { handleSubmit, handleChange, setIsFocused, error, success, friendTag, isFocused, loading };
};

export default useAddFriendForm;
