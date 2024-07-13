import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRef, useState } from "react";
import { app } from "../firebase";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const fileRef = useRef();
  const navigate = useNavigate();

  //async images upload
  const handleImageUpload = () => {
    if (files.length > 0 && files.length < 7) {
      setUploading(true);
      setImageUploadError("");
      const promises = [];
      const progressArray = new Array(files.length).fill(0);
      setUploadProgress(progressArray);

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i], i));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploading(false);
          setFiles([]);
        })
        .catch((error) => {
          setUploading(false);
          setImageUploadError(error.message);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  //firestore file upload function
  const storeImage = async (file, index) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `Listings/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress((prevProgress) => {
            const newProgress = [...prevProgress];
            newProgress[index] = progress;
            return newProgress;
          });
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  //form data collection
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  //file change
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  //remove image from list of uploaded images..
  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  //submit the form to create a listing
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageUrls.length < 3) {
        return setError("You must upload at least three(3) images");
      }
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than the regular price");

      setLoading(true);
      setError("");

      const { data } = await axios.post("api/listing/create-listing", {
        ...formData,
        userRef: currentUser._id,
      });
      setLoading(false);

      if (data.success !== true) {
        setError(data.message);
      }

      navigate(`/listing/${data.listing._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name of property"
            id="name"
            maxLength={62}
            minLength={10}
            required
            onChange={handleChange}
            value={formData.name}
            className="border p-3 rounded-lg dark:text-darkText dark:bg-darkBackground focus:outline-none focus-within:ring-2 focus:ring-accent"
          />
          <textarea
            name="description"
            id="description"
            placeholder="Description.."
            required
            onChange={handleChange}
            value={formData.description}
            className="border p-3 rounded-lg dark:text-darkText dark:bg-darkBackground focus:outline-none focus-within:ring-2 focus:ring-accent"
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            required
            onChange={handleChange}
            value={formData.address}
            className="border p-3 rounded-lg dark:text-darkText dark:bg-darkBackground focus:outline-none focus-within:ring-2 focus:ring-accent"
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="radio"
                id="sale"
                name="type"
                value="sale"
                onChange={handleChange}
                checked={formData.type === "sale"}
                className="w-5"
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="rent"
                name="type"
                value="rent"
                onChange={handleChange}
                checked={formData.type === "rent"}
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                onChange={handleChange}
                checked={formData.parking}
                className="w-5"
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                onChange={handleChange}
                checked={formData.furnished}
                className="w-5"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                onChange={handleChange}
                checked={formData.offer}
                className="w-5"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min={1}
                max={10}
                required
                onChange={handleChange}
                value={formData.bedrooms}
                className="border p-3 rounded-lg dark:text-darkText dark:bg-darkBackground focus:outline-none focus-within:ring-2 focus:ring-accent"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bathrooms}
                className="border p-3 rounded-lg dark:text-darkText dark:bg-darkBackground focus:outline-none focus-within:ring-2 focus:ring-accent"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                // min="50"
                max="10000000"
                required
                onChange={handleChange}
                value={formData.regularPrice}
                className="border p-3 rounded-lg dark:text-darkText dark:bg-darkBackground focus:outline-none focus-within:ring-2 focus:ring-accent"
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min={0}
                max={10000000}
                required
                onChange={handleChange}
                value={formData.discountPrice}
                className="border p-3 rounded-lg dark:text-darkText dark:bg-darkBackground focus:outline-none focus-within:ring-2 focus:ring-accent"
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover of (max 6){" "}
            </span>
          </p>
          <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 dark:bg-darkBackground dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700">
            <div
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={() => fileRef.current.click()}
            >
              <svg
                className="w-12 h-12 text-accent dark:text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v6m0 0l-3-3m3 3l3-3M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-gray-600 dark:text-gray-300 text-lg text-center">
                Click to upload or drag and drop your images
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                Max 6 images, each up to 5MB
              </p>
            </div>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              ref={fileRef}
              hidden
              className="absolute cursor-pointer"
            />

            <div className="mt-4 flex gap-4 flex-wrap">
              {files.length > 0 &&
                Array.from(files).map((file, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="object-cover w-full h-full rounded-lg shadow-md"
                    />
                  </div>
                ))}
            </div>
            <button
              type="button"
              onClick={handleImageUpload}
              disabled={uploading}
              className="mt-4 px-6 py-2 bg-accent text-white rounded-lg shadow-md hover:bg-accent/20 disabled:opacity-80 transition"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {uploadProgress.map((progress, index) => (
            <div key={index} className="my-2">
              <p>
                Image {index + 1}: {Math.round(progress)}%
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-accent h-2.5 rounded-sm"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ))}
          <button
            disabled={loading || uploading}
            className={`p-3 bg-accent uppercase text-white rounded-lg hover:opacity-95 disabled:opacity-80 ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? "Creating!..." : "Create Listing"}
          </button>
          {error && <p className="text-red-700  text-sm">{error}</p>}

          {imageUploadError && (
            <p className="text-red-700 text-sm">{imageUploadError}</p>
          )}
          <div className="grid grid-cols-2 gap-4">
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex items-center  justify-between p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={url}
                    alt={`Listing image ${index + 1}`}
                    className="object-cover w-16 h-16 rounded-lg shadow-md"
                  />
                  <button
                    className="ml-3 p-1 text-accent hover:text-red-800 transition-colors"
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
