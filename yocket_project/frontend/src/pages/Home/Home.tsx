import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IHomeProps } from "./IHomeProps";
import "./_home.css";
import { ApiHandler } from "../../services/apiHandler";

const Home: React.FC<IHomeProps> = () => {
  const navigate = useNavigate();
  useEffect(() => {
    ApiHandler({ apiName: "endGame", body: {} })
      .then((res: any) => {
        console.log(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="home-container">
      <div className="header-home">Catch me if you can</div>
      <div className="game-desc-container">
        <span className="game-description">
          A notorious criminal escape artist has vanished again. However, the
          criminal may be hiding in only one of the possible 5 neighbouring
          cities. 3 fearless cops have volunteered in capturing the fugitive
          hiding and they need your help!
        </span>
      </div>
      <button
        className="game-btn"
        onClick={() => {
          navigate("/cop");
        }}
      >
        Start Game
      </button>
    </div>
  );
};

export default Home;
