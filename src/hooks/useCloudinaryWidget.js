import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { config } from "../config";

/**
 * ## useCloudinaryWidget
 * * Hook to
 * **use:**
 * ```
 * const { imgCld, imgCldId, thumbCld, showWidget, changed } = useCloudinaryWidget()
 * ```
 * @returns {Object} - {String, String, Function, Boolean}
 */
export const useCloudinaryWidget = (type = "user") => {
  const [imgCld, setImgCld] = useState(null);
  const [imgCldId, setImgCldId] = useState(null);
  const [thumbCld, setThumbCld] = useState(null);
  const [changed, setChanged] = useState(false);

  const configWidget = {
    cloudName: config.cloudinary.cloudName,
    uploadPreset: config.cloudinary.uploadPreset,
    default_transformations: [
      [{ quality: "auto" }, { fetch_format: "auto" }],
      [
        {
          width: 80,
          height: 80,
          crop: "fill",
          gravity: "auto",
          radius: "max",
        },
        { fetch_format: "auto", quality: "auto" },
      ],
    ],
    sources: ["local"],
    styles: {
      palette: {
        window: "#263238",
        sourceBg: "#FFFFFF",
        windowBorder: "#90a0b3",
        tabIcon: "#29E58B",
        inactiveTabIcon: "#69778A",
        menuIcons: "#29E58B",
        link: "#29E58B",
        action: "#71BDF8",
        inProgress: "#71BDF8",
        complete: "#29E58B",
        error: "#FF4F5B",
        textDark: "#455A64",
        textLight: "#FFFFFF",
      },
      fonts: {
        default: null,
        "'Fira Sans', sans-serif": {
          url: "https://fonts.googleapis.com/css?family=Fira+Sans",
          active: true,
        },
      },
    },
    // cropping: true,
    multiple: false,
    reset: true,
  };

  const setImageResize = (id = null, w = 150, h = 150) => {
    const cld = new Cloudinary({
      cloud: {
        cloudName: config.cloudinary.cloudName,
      },
    });

    const myImage = cld.image(id);
    myImage.format("webp");
    myImage.resize(
      thumbnail().width(w).height(h).gravity(focusOn(FocusOn.face()))
    );
    const thumb = myImage.toURL();

    return thumb;
  };

  const showWidget = () => {
    setChanged(true);
    window.cloudinary.openUploadWidget(configWidget, (err, result) => {
      const { event } = result;
      // console.log(event);
      if (!err && event === "display-changed") {
        setChanged(false);
      }
      if (!err && event === "success") {
        const { secure_url, public_id } = result.info;
        setImgCld(secure_url);
        setImgCldId(public_id);

        const thumb = setImageResize(public_id);
        setThumbCld(thumb);
      }
    });
  };

  return { imgCld, imgCldId, thumbCld, showWidget, changed };
};
