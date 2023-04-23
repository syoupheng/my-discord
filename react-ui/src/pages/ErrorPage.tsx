import { Link } from "react-router-dom";
import Button from "../components/shared/buttons/Button";
import { DEFAULT_ROUTE } from "../main";

const ErrorPage = () => {
  return (
    <main className="flex flex-col justify-center items-center h-full">
      <div className="flex-initial mb-10" style={{ backgroundImage: "url(/error-image.svg)", height: "272px", width: "222px" }}></div>
      <h2 className="text-center uppercase text-muted mb-4">Un problème est survenu, veuillez nous excuser pour la gène occasionnée</h2>
      <Link to={DEFAULT_ROUTE}>
        <Button className="px-4 py-1">Revenir à l'accueil</Button>
      </Link>
    </main>
  );
};

export default ErrorPage;
