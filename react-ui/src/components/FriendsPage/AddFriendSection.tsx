import { ChangeEvent, FormEvent, useState } from "react";
import useAddFriend from "../../hooks/friend-requests/useAddFriend";
import Button from "../shared/buttons/Button";
import EmptyFriends from "./EmptyFriends";
import { z } from "zod";

const AddFriendSection = () => {
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
      setError(
        "Mhm, ça n'a pas bien marché. Vérifie bien que la casse, l'orthographe, les espaces et les chiffres sont correctes."
      );
      return;
    }
    const payload = { id: parseInt(id), username };
    try {
      friendTagSchema.parse(payload);
    } catch (err) {
      setError(
        "Mhm, ça n'a pas bien marché. Vérifie bien que la casse, l'orthographe, les espaces et les chiffres sont correctes."
      );
      return;
    }
    try {
      await sendFriendRequest({
        variables: { input: payload },
      });
      setFriendTag("");
      setSuccess(friendTag);
    } catch (err: any) {
      setError(err.message);
    }
  };

  let borderCorlor = "border-input-border";

  if (success) {
    borderCorlor = "border-positive";
  } else if (error) {
    borderCorlor = "border-red";
  } else if (isFocused) {
    borderCorlor = "border-link";
  }

  return (
    <>
      <header className="shrink-0 px-8 py-5 border-b border-b-grey-border">
        <h2 className="mb-2 uppercase text-white font-medium">Ajouter un ami</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="lala text-h-secondary cursor-default text-btw-sm-xs">
            Tu peux ajouter un ami grâce à son Discord Tag. Attention aux mAjUsCuLeS !
          </div>
          <div
            className={`${borderCorlor} flex items-center bg-tertiary border rounded-lg mt-4 py-0 px-3 relative`}
          >
            <div className="bg-transparent border-0 text-secondary-light flex-auto mr-4 py-1 px-0">
              <input
                type="text"
                autoComplete="off"
                autoFocus
                name="add-friend"
                placeholder="Entre un nom d'utilisateur#0000"
                aria-label="Entre un nom d'utilisateur#0000"
                className="border-0 p-0 bg-inherit font-medium whitespace-pre h-10 w-full rounded-sm text-btw-base-sm focus:outline-none"
                value={friendTag}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
            <Button
              disabled={friendTag === ""}
              className="h-8 relative flex justify-center items-center border-0 px-4 py-[2px] text-btw-sm-xs font-medium"
            >
              Envoyer une demande d'ami
            </Button>
          </div>
          {success ? (
            <div className="text-positive cursor-default text-sm mt-2">
              Bravo ! Ta demande d'ami a été envoyée à <span className="font-bold">{success}</span>.
            </div>
          ) : (
            error && <div className="text-danger cursor-default text-sm mt-2">{error}</div>
          )}
        </form>
      </header>
      <EmptyFriends />
    </>
  );
};

export default AddFriendSection;
