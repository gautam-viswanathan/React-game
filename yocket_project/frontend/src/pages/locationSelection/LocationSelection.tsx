import React, { useEffect, useState } from "react";
import { ILocationSelectionProps } from "./ILocationSelectionProps";
import "./_locationselection.css";
import ImageCard from "../../components/imageCard/ImageCard";
import { ApiHandler } from "../../services/apiHandler";
import { useNavigate } from "react-router-dom";

const LocationSelection: React.FC<ILocationSelectionProps> = () => {
  const navigate = useNavigate();

  const [cities, setCities]: any = useState();
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    ApiHandler({ apiName: "locations", body: {} })
      .then((res: any) => {
        setCities(res.data.availableCities);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const handleLocation = (city: any) => {
    if (selectedLocation !== "") {
      setSelectedLocation("");
    }
    setSelectedLocation(city.name);
  };
  const handleClick = () => {
    ApiHandler({
      apiName: "updateLocation",
      body: { location: selectedLocation },
    })
      .then((res: any) => {
        navigate("/vehicle");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  return (
    <div className="location-selection-container">
      <span className="location-selection-header">
        Select the location for the cop to inspect
      </span>
      <span className="location-selection-task-explanation">
        The plan is to allocate a vehicle each officer so it is easier for them
        to catch the criminal, the catch for selecting each location is that you
        have to be aware of the range of the vehicle such that the cop goes to a
        city and can drive back to base and the distance given against each
        location is one way
        <ul>
          <li>EV SUV range: 120km</li>
          <li>EV Car range: 100km</li>
          <li>EV Bike range: 60km</li>
        </ul>
      </span>
      <div className="city-detail-container">
        {cities &&
          cities.map((city: any) => {
            return (
              <ImageCard
                locationDetails={city}
                onSelect={() => {
                  if (selectedLocation !== "") {
                    setSelectedLocation("");
                  }
                  setSelectedLocation(city.name);
                }}
                isSelected={selectedLocation === city.name}
              />
            );
          })}
      </div>
      <div>
        <span>Available vehicles</span>
      </div>
      <button
        className="next-btn"
        onClick={() => {
          handleClick();
        }}
      >
        Next
      </button>
    </div>
  );
};

export default LocationSelection;
