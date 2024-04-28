import React from "react";
import { IResultsCardProps } from "./IResultsCardProps";
import "./_resultscard.css";

const ResultsCard: React.FC<IResultsCardProps> = (props) => {
  return (
    <div className="result-card-container">
      <img
        src={`/images/${
          props.cops.name === "Cop 1"
            ? "Cop1"
            : props.cops.name === "Cop 2"
            ? "Cop2"
            : "Cop3"
        }.png`}
        className="results-card-img"
        alt={`${props.cops.names}`}
      />
      <span className="results-number-text">{`${props.cops.name}`}</span>
      <span className="results-number-text">
        Location:
        <span className="location-results"> {`${props.cops.location}`}</span>
      </span>
    </div>
  );
};

export default ResultsCard;
