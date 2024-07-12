import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUseGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const { email, displayName, photoURL } = result.user;

      const { data } = await axios.post("/api/auth/sign-in-with-google", {
        name: displayName,
        email: email,
        photoUrl: photoURL,
      });

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Could not sign in with google", error);
    }
  };

  return (
    <button
      onClick={handleUseGoogle}
      type="button"
      className="bg-accent text-white p-3 rounded-lg hover:opacity-95"
    >
      Continue With Google
    </button>
  );
};

export default OAuth;
