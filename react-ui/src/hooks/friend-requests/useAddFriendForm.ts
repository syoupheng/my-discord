import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";
import { ApolloError } from "@apollo/client";
import useAddFriend from "@/hooks/friend-requests/useAddFriend";
import useRequestTimeout from "@/hooks/shared/useRequestTimeout";
import { toast } from "react-hot-toast";
import { ERROR_MESSAGE } from "@/utils/apollo";

const useAddFriendForm = () => {
  const [friendTag, setFriendTag] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState("");

  const { result: [sendFriendRequest, { reset, loading }], abortController } = useAddFriend();

  useRequestTimeout({ isLoading: loading, onTimeout: () => {
    abortController.current.abort();
    toast.error(ERROR_MESSAGE);
  }, timeout: 2000});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFriendTag(e.target.value);
    setSuccess(null);
    reset();
  };

  const friendTagSchema = z.object({
    id: z.number().int().positive(),
    username: z.string().min(1),
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const splitTag = friendTag.split("#");
    if (splitTag.length !== 2) {
      setError(`Nous avons besoin du tag de ${friendTag} pour le différencier des autres.`);
      return;
    }

    const [username, id] = splitTag;
    if (parseInt(id).toString() !== id) {
      setError("Mhm, ça n'a pas bien marché. Vérifie bien que la casse, l'orthographe, les espaces et les chiffres sont correctes.");
      return;
    }
    const payload = { id: parseInt(id), username };
    try {
      friendTagSchema.parse(payload);
    } catch (err) {
      setError("Mhm, ça n'a pas bien marché. Vérifie bien que la casse, l'orthographe, les espaces et les chiffres sont correctes.");
      return;
    }
    try {
      await sendFriendRequest({ variables: { input: payload } });
      setFriendTag("");
      setSuccess(friendTag);
    } catch (err: unknown) {
      if (err instanceof ApolloError) setError(err.message);
    }
  };
  return { handleSubmit, handleChange, setIsFocused, error, success, friendTag, isFocused, loading };
};

export default useAddFriendForm;
