import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
import { Button, Group } from "@mantine/core";
const UploadImage = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const [imageURL, setImageURL] = useState(propertyDetails.image);                    //imageurl in the addPropertyModel
  const cloudinaryRef = useRef();                                                       //for dealing widget
  const widgetRef = useRef();
  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageURL }));
    nextStep();
  };
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {                                                                                              //from cloudiinary acc
        cloudName: "dcdhklrjc",
        uploadPreset: "vx0dyjgc",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {                                                               //func if image is successfully uploaded then in the info .secure url we are going to have url of image
          setImageURL(result.info.secure_url);
        }
      }
    );
  }, []);
  return (
    <div className="flexColCenter uploadWrapper">
      {!imageURL ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}                                               //open our cuurent upload widget
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div
          className="uploadedImage"
          onClick={() => widgetRef.current?.open()}
        >
          <img src={imageURL} alt="" />
        </div>
      )}

      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!imageURL}>                                                       {/* if not uploaded image then no next step */}
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
