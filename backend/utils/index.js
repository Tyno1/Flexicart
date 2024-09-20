const cloudinary = require("../cloudinary/cloudinary");

module.exports.imageUploader = async (data, image, imageLabel) => {
  let response;

  if (image) {
    const options = {
      use_filename: false,
      unique_filename: false,
      overwrite: true,
      public_id: `${Date.now()}`,
      resource_type: "auto",
    };

    response = await cloudinary.uploader.upload(image, options);

    console.log("Response => ", response);

    data[imageLabel] = response.url;
  }

  return data;
};

module.exports.currencyConverter = (value) => {
  switch (value) {
    case "usd":
      return "<span>&#36;</span>";
    case "eur":
      return "<span>&#x20AC;</span>";
    case "gbp":
      return "<span>&#163;</span>";
    default:
      return value;
  }
};
