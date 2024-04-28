import React, { useEffect, useState } from "react";
import { IVehicleSelectionProps } from "./IVehicleSelectionProps";
import "./_vehicleselection.css";
import VehicleCard from "../../components/vehicleCard/VehicleCard";
import { useNavigate } from "react-router-dom";
import { ApiHandler } from "../../services/apiHandler";

const VehicleSelection: React.FC<IVehicleSelectionProps> = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [vehicles, getVehicles]: any = useState();

  useEffect(() => {
    ApiHandler({
      apiName: "vehicles",
      body: {},
    })
      .then((res: any) => {
        getVehicles(res.data);
        console.log(res.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const gameNavigation = () => {
    ApiHandler({
      apiName: "updateVehicle",
      body: { vehicle: selected },
    })
      .then((res: any) => {
        console.log(vehicles);
        if (vehicles.index == 3) {
          navigate("/results");
        } else {
          navigate("/cop");
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div className="vehicle-selection-container">
      <span className="vehicle-selection-header">
        Select the Available vehicle to ride
      </span>
      <span className="vehicle-selection-subheader">
        Select the avaiblable vehicle to go capture the criminal and comeback
      </span>
      <div className="vehicle-card-placement">
        {vehicles &&
          vehicles.vehicle.map((vehicle: any) => {
            return (
              <VehicleCard
                vehicles={vehicle}
                onSelect={() => {
                  if (selected !== "") {
                    setSelected("");
                  }
                  setSelected(vehicle.kind);
                }}
                isSelected={selected === vehicle.kind}
              />
            );
          })}
      </div>
      {vehicles && vehicles.vehicle.length == 0 ? (
        <div className="restart-game">
          <span className="restart-game-text">
            please read the instruction carefully
          </span>
          <button
            className="confirmation-btn"
            onClick={() => {
              navigate("/");
            }}
          >
            Restart
          </button>
        </div>
      ) : (
        <button
          className="confirmation-btn"
          disabled={selected === ""}
          onClick={gameNavigation}
        >
          Let's go
        </button>
      )}
    </div>
  );
};

export default VehicleSelection;
