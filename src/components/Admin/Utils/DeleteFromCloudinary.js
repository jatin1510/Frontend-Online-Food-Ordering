// const crypto = require("crypto");
// const apiKey = 977244679853224;
// const apiSecret = "Dr96yjmRU_UVfPrtX7uMm02XNkg";
// const cloudName = "dcrc8ucpr";



// export const deleteFromCloudinary = async (publicId) => {
//     const timestamp = Math.floor(Date.now() / 1000);
//     const toSign = `public_id=${publicId}&timestamp=${timestamp}&api_key=${apiKey}`;
//     const signature = crypto
//         .createHash("sha1")
//         .update(toSign + apiSecret)
//         .digest("hex");

//     const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
//         {
//             method: "post",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 public_id: publicId,
//                 api_key: apiKey,
//                 signature: signature,
//             }),
//         }
//     );
//     const fileData = await response.json();
//     return fileData;
// };