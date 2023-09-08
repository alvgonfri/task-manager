import BackButton from "../../components/BackButton";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <>
      <BackButton />
      <div className="flex justify-center mt-5">
        <div className="bg-slate-200 border border-slate-300 flex justify-center p-6 lg:w-1/4 rounded-lg shadow-md">
          <div>
            <p className="mb-4 text-xl">
              <FontAwesomeIcon icon={faUser} className="mr-3" />
              {user.username}
            </p>
            <p className="text-xl">
              <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
