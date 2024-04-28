import React, { useEffect, useState } from "react";
import { IResultsProps } from "./IResultsProps";
import { ApiHandler } from "../../services/apiHandler";
import "./_results.css";
import ResultsCard from "../../components/resultsCard/ResultsCard";
import { useNavigate } from "react-router-dom";

const Results: React.FC<IResultsProps> = () => {
  const navigate = useNavigate();
  const [results, setResults]: any = useState();

  useEffect(() => {
    ApiHandler({ apiName: "capture", body: {} })
      .then((res: any) => {
        console.log(res.data);
        setResults(res.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const handleClick = () => {
    ApiHandler({ apiName: "endGame", body: {} })
      .then((res: any) => {
        navigate("/");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div
      className={`results-container ${
        results && results.captured ? "captured" : "uncaptured"
      }`}
    >
      <span
        className={`results-header ${
          results && results.captured ? "captured-result" : "uncaptured-result"
        }`}
      >
        {results && results.captured
          ? "Caught the criminal. YAAYYYY!"
          : "Did not catch the criminal. Better luck next time :("}
      </span>
      <div className="criminal-card">
        <img src="/images/Criminal.png" className="criminal-image" />
        <span className="fugitive-location">
          Location:
          <span className="results-location">
            {" "}
            {results && results.fugitive.name}
          </span>
        </span>
        <span className="fugitive-status">
          Status:
          <span
            className={`${
              results && results.captured
                ? "fugitive-captured"
                : "fugitive-missing"
            } `}
          >
            {results && results.captured ? " caught" : " missing"}
          </span>
        </span>
      </div>
      <div className="cops-location-result">
        {results &&
          results.cops.map((cop: any) => {
            return <ResultsCard cops={cop} />;
          })}
      </div>
      <button
        onClick={() => {
          handleClick();
        }}
        className={`result-btn ${
          results && results.captured ? "success" : "failure"
        }`}
      >
        {results && results.captured ? "Finish" : "Try Again"}
      </button>
    </div>
  );
};

export default Results;
