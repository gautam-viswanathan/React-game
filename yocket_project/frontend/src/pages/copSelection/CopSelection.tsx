import React, { useEffect, useState } from "react";
import CopCard from "../../components/copCard/CopCard";
import { ICopSelectionProps } from "./ICopSelectionProps";
import "./_copselection.css";
import { useNavigate } from "react-router-dom";
import { ApiHandler } from "../../services/apiHandler";

const CopSelection: React.FC<ICopSelectionProps> = () => {
  const navigate = useNavigate();

  const [cops, setCops]: any = useState();
  const [selectedCop, setSelectedCop] = useState("");

  useEffect(() => {
    ApiHandler({
      apiName: "cops",
      body: {},
    })
      .then((res: any) => {
        setCops(res.data.cops);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const handleClick = () => {
    ApiHandler({
      apiName: "updateCops",
      body: { copName: selectedCop },
    })
      .then((res: any) => {
        navigate("/location");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  return (
    <div className="cop-selection-container">
      <div className="cop-selection-header">Who Goes where</div>
      <div className="cop-selection-subheader">
        We need to select a cop so we can decide where this cop is going to be
        headed so we don't send 2 cops to the same place and reduce our chance
        of capturing the criminal
      </div>
      <div className="cop-card-placement">
        {cops &&
          cops.map((cop: any) => {
            return (
              <CopCard
                cops={cop}
                isSelected={selectedCop === cop.name}
                onSelect={() => {
                  if (selectedCop !== "") {
                    setSelectedCop("");
                  }
                  setSelectedCop(cop.name);
                }}
              />
            );
          })}
      </div>
      <button
        className="next-btn-cop"
        disabled={selectedCop === ""}
        onClick={() => {
          handleClick();
        }}
      >
        Next
      </button>
    </div>
  );
};

export default CopSelection;
