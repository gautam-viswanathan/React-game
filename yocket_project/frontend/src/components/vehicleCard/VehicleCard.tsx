import React from "react";
import { IVehicleCardProps } from "./IVehicleCardProps";
import "./_vehiclecard.css";

const VehicleCard: React.FC<IVehicleCardProps> = (props) => {
  return (
    <div
      className={`vehicle-card-container ${
        props.isSelected ? "selected-vehicle" : ""
      }`}
      onClick={props.onSelect}
    >
      <img
        className="vehicle-img"
        src={`/images/${props.vehicles.image}.png`}
      />
      <span className="vehicle-text">{props.vehicles.kind}</span>
    </div>
  );
};

export default VehicleCard;
