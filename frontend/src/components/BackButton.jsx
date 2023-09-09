import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function BackButton() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <button onClick={handleGoBack} className="text-slate-700">
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
}

export default BackButton;
