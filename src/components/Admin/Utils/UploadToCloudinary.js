const upload_preset = "food_delivery_app";
const cloud_name = "dcrc8ucpr";

export const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);
    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
            method: "post",
            body: data,
        }
    );
    const fileData = await response.json();
    return fileData.url;
};
