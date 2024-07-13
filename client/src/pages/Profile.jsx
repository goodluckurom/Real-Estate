import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import axios from "axios";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const [uploadPerc, setUploadPerc] = useState(0);
  const [fileUplaodError, setFileUplaodError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `Avatars/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPerc(Math.round(progress));
      },
      (error) => {
        setFileUplaodError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
          setFormData({ ...formData, avatar: downloadUrl })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart);

      const { data } = await axios.post(
        `/api/user/update/${currentUser._id}`,
        {
          ...formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success !== true) {
        dispatch(updateUserFailure(data.message));
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const { data } = await axios.delete(
        `/api/user/delete/${currentUser._id}`
      );

      if (data.success !== true) {
        dispatch(deleteUserFailure(data.message));
      }
      dispatch(deleteUserSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());

      const { data } = await axios.get("/api/auth/sign-out");
      if (data.success !== true) {
        dispatch(signOutFailure(data.message));
      }
      dispatch(signOutSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>
      <form
        action=""
        className="flex flex-col gap-4"
        onSubmit={handleUserUpdate}
      >
        <input
          type="file"
          ref={fileRef}
          hidden
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={
            (currentUser && currentUser.avatar) || (formData && formData.avatar)
          }
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 mb-2 border-2 border-accent"
        />
        <p className="text-sm self-center">
          {fileUplaodError ? (
            <span className="text-red-700">
              Error uploading image (image must be less than 4 mb)
            </span>
          ) : uploadPerc > 0 && uploadPerc < 100 ? (
            <span className="text-green-700">{`Uploading ${uploadPerc}`}</span>
          ) : uploadPerc === 100 ? (
            <span className="text-green-700">
              Image uploaded successfully...
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg  dark:text-darkText dark:bg-darkBackground focus:outline-none focus-within:ring-2 focus:ring-accent"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email address"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg  dark:text-darkText dark:bg-darkBackground focus:outline-none focus:ring-2 focus:ring-accent"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          className="border p-3 rounded-lg  dark:text-darkText dark:bg-darkBackground focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          disabled={loading}
          className="bg-accent text-white rounded-lg text-center hover:opacity-95 cursor-pointer p-3"
        >
          {loading ? "Updating!..." : "Update"}
        </button>
        <Link
          to={"/create-listing"}
          className="bg-accent text-white rounded-lg text-center hover:opacity-95 cursor-pointer p-3"
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>

      <p className="text-red-700">{error ? error : ""}</p>
      <p className="text-green-700">
        {updateSuccess ? "User updated successfully" : ""}
      </p>
    </div>
  );
};

export default Profile;
