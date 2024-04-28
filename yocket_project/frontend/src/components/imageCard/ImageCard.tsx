import React from "react";
import { IImageCardProps } from "./IImageCardProps";

import "./_imagecard.css";

const ImageCard: React.FC<IImageCardProps> = (props) => {
  return (
    <div
      className={`image-card-container ${
        props.isSelected ? "selected-location" : ""
      }`}
      onClick={props.onSelect}
    >
      <img
        src={`/images/${props.locationDetails.image}.png`}
        className="location-img"
      />
      <span className="location-details">{props.locationDetails.name}</span>
      <span className="distance-indicator">
        Distance:
        <span className="distance-actual">
          {props.locationDetails.distance}KM
        </span>
      </span>
      <span className="location-description">
        {props.locationDetails.description}
      </span>
    </div>
  );
};

export default ImageCard;
