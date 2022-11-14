import CloseIcon from "../Icons/CloseIcon";
import Button from "./buttons/Button";

const AddNewGroupPopup = () => {
  return (
    <div className="flex flex-col">
      <div className="grow-0 shrink-0 basis-auto p-4 relative overflow-x-hidden flex flex-nowrap flex-col justify-start items-stretch">
        <h1 className="text-white font-medium text-xl">Sélectionne des amis</h1>
        <div className="text-h-secondary mt-1 text-xs">Tu peux encore ajouter autres amis</div>
        <div className="flex-auto mt-5 flex flex-nowrap justify-start items-stretch">
          <div className="flex-1 flex rounded bg-tertiary">
            <div className="overflow-x-hidden overflow-y-scroll relative flex-auto flex flex-wrap p-[1px]">
              <a
                className="h-[30px] px-2 rounded-sm text-center m-[1px] leading-8 flex items-center cursor-pointer bg-primary text-secondary-light text-sm hover:bg-mod-hov hover:text-h-secondary"
                role="button"
              >
                Andrei Susai
                <div className="ml-1">
                  <CloseIcon size={12} />
                </div>
              </a>
              <input
                className="leading-8 h-[30px] px-2 bg-transparent border-0 resize-none flex-1 min-w-[48px] m-[1px] text-secondary-light text-sm focus:outline-none"
                type="text"
                spellCheck="false"
                placeholder="Rechercher/lancer une conversation"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-hidden overflow-y-scroll max-h-[190px] relative flex-auto min-h-0"></div>
      <div className="h-[1px] mx-[10px] shadow-[0_-1px_0px_rgba(255,255,255,0.04)]"></div>
      <div className="flex-auto p-5 flex flex-col flex-nowrap justify-start items-stretch">
        <Button className="h-[38px]">
          <div className="text-btw-sm-xs">Créer un groupe privé</div>
        </Button>
      </div>
    </div>
  );
};

export default AddNewGroupPopup;
