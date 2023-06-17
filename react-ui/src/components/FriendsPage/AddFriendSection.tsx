import useAddFriendForm from "@/hooks/friend-requests/useAddFriendForm";
import Button from "../shared/buttons/Button";
import LoadingDotsIcon from "@/components/Icons/LoadingDotsIcon";

const emptyImage = {
  imageUrl: "/no_friends.svg",
  text: "Wumpus attend des amis. Mais rien ne t'oblige à en ajouter !",
  height: "162px",
  width: "376px",
};

const AddFriendSection = () => {
  const { handleSubmit, handleChange, setIsFocused, error, success, friendTag, isFocused, loading } = useAddFriendForm();
  const { imageUrl, text, height, width } = emptyImage;

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
          <div className={`${borderCorlor} flex items-center bg-tertiary border rounded-lg mt-4 py-0 px-3 relative`}>
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
            <Button disabled={friendTag === "" || loading} className="text-btw-sm-xs font-medium" style={{ minWidth: "204px", minHeight: "34px" }}>
              {loading ? (
                <div className="pointer-events-none animate-pulse">
                  <LoadingDotsIcon />
                </div>
              ) : (
                "Envoyer une demande d'ami"
              )}
            </Button>
          </div>
          {success ? (
            <div className="text-positive cursor-default text-sm mt-2">
              Bravo ! Ta demande d'ami a été envoyée à <span className="font-bold">{success}</span>.
            </div>
          ) : (
            !!error && <div className="text-danger cursor-default text-sm mt-2">{error}</div>
          )}
        </form>
      </header>
      <div className="flex items-center justify-center h-full">
        <div className="w-full h-full max-w-md mx-auto flex-auto flex flex-col flex-nowrap justify-center items-center">
          <div className="flex-initial bg-cover mb-10" style={{ backgroundImage: `url(${imageUrl})`, height, width }} />
          <div className="flex-initial mt-2 text-center text-sm text-muted">{text}</div>
        </div>
      </div>
    </>
  );
};

export default AddFriendSection;
