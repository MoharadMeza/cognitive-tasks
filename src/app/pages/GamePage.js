import React, { useEffect, useState } from "react";
import { useSubheader } from "../../_metronic/layout";
import Score from "../../_metronic/layout/components/challenges/Scores/Scores.component";
// import {
//   useSubheader
// } from "../../_metronic/layout/_core/MetronicSubheader";
import Game from "../../_metronic/layout/components/challenges/Game/game.component";

export const GamePage = (props) => {
  useEffect(() => {
    console.log("GamePage USE EFFECT");
  }, []);
  const suhbeader = useSubheader();
  suhbeader.setTitle(props.gameName);
  console.log("GamePage rendered", props.scoreAvailable);
  return (
    <>
      {/* begin::Dashboard */}
      {!props.scoreAvailable ? (
        <Game
          setStartGame={props.setStartGame}
          startGame={props.startGame}
          setScoreTable={props.setScoreTable}
          setScoreAvailable={props.setScoreAvailable}
          setNBackModalSetting={props.setNBackModalSetting}
          NBackModalSetting={props.NBackModalSetting}
          setCPTModalSetting={props.setCPTModalSetting}
          CPTModalSetting={props.CPTModalSetting}
          gonogoModalSetting={props.gonogoModalSetting}
          setGonogoModalSetting={props.setGonogoModalSetting}
          setStroopModalSetting={props.setStroopModalSetting}
          stroopModalSetting={props.stroopModalSetting}
        />
      ) : (
        <Score
          scoreTable={props.scoreTable}
          setScoreTable={props.setScoreTable}
          setStartGame={props.setStartGame}
          setScoreAvailable={props.setScoreAvailable}
        />
      )}
      {/* end::Dashboard */}
    </>
  );
};
