// import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "CodeHunt");
  data.append("cloud_name", "arvindkumar");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/arvindkumar/image/upload",
      {
        method: "post",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const responseData = await response.json();
    const imageUrl = responseData.secure_url;

    return imageUrl;
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err; // Rethrow the error for handling in the calling code
  }
};

export default upload;
