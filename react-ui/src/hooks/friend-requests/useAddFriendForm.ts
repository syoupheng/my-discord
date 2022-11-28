import { ChangeEvent, FormEvent, useState } from "react";
import useAddFriend from "./useAddFriend";
import { z } from "zod";

const useAddFriendForm = () => {
  const [friendTag, setFriendTag] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState("");

  const [sendFriendRequest, { reset }] = useAddFriend();

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
    } catch (err: any) {
      setError(err.message);
    }
  };
  return { handleSubmit, handleChange, setIsFocused, error, success, friendTag, isFocused };
};

export default useAddFriendForm;
