import FriendsIcon from "@/components/FriendsPage/FriendIcon";
import MessageIcon from "@/components/Icons/MessageIcon";
import WelcomeToDiscord from "@/components/Icons/WelcomeToDiscord";
import MyModal from "@/components/shared/MyModal";
import Button from "@/components/shared/buttons/Button";
import useLocalStorage from "@/hooks/shared/useLocalStorage";
import { ReactNode, useEffect, useState } from "react";
import { BiBot } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi";

const WelcomeModal = () => {
  const [isNewUser, setIsNewUser] = useLocalStorage("isNewUser", true);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isNewUser) {
      setIsNewUser(false);
      setIsOpen(true);
    }
  }, [isNewUser]);
  return (
    <MyModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <MyModal.Panel className=" h-auto min-h-0 relative max-h-full flex flex-col" style={{ width: "480px" }}>
        <div className="relative overflow-x-hidden overflow-y-scroll scroll-container">
          <div className="relative overflow-hidden">
            <div className="flex justify-center mb-4 mt-8">
              <WelcomeToDiscord size={150} />
            </div>
            <div className="px-4">
              <MyModal.Content centered title="Bienvenu sur mon clone de Discord !">
                <ol className=" text-h-secondary mt-4 overflow-hidden">
                  <li className="mb-4 font-medium">
                    Salut ! Je m'appelle <b>Syou-P'heng</b> et j'ai développé ce clone de l'application web de Discord pour m'amuser et découvrir de
                    nouvelles technologies. Have fun !
                  </li>
                  <FeatureItem
                    icon={<FriendsIcon />}
                    description={<>Tu peux envoyer des demandes d'amis grâce à leur nom d'utilisateur et tag discord (#0000).</>}
                  />
                  <FeatureItem
                    icon={<HiUserGroup size={24} />}
                    description={<>Crée des groupes de conversation privés et invite jusqu'à 9 amis par groupe.</>}
                  />
                  <FeatureItem icon={<MessageIcon />} description={<>Envoie et reçois des messages de la part de tes amis en temps réel !</>} />
                  <FeatureItem
                    icon={<BiBot size={24} />}
                    description={
                      <>
                        Tu peux dès à présent discuter avec tes amis ! Leurs réponses sont générées par <b>ChatGPT</b> !
                      </>
                    }
                  />
                </ol>
              </MyModal.Content>
            </div>
          </div>
        </div>
        <MyModal.Controls alignment="center">
          <Button variant="blue" onClick={() => setIsOpen(false)}>
            C'est parti !
          </Button>
        </MyModal.Controls>
      </MyModal.Panel>
    </MyModal>
  );
};

type FeatureItemProps = {
  description: ReactNode;
  icon: ReactNode;
};

const FeatureItem = ({ icon, description }: FeatureItemProps) => {
  return (
    <li className="flex flex-nowrap items-start mb-4">
      <div className="rounded-full bg-secondary shrink-0 mr-4 p-2 grow-0">{icon}</div>
      <p className="text-btw-sm-xs font-medium text-left">{description}</p>
    </li>
  );
};

export default WelcomeModal;
