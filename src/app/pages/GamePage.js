import React, { useEffect, useState } from "react";
import { useSubheader } from "../../_metronic/layout";
import Score from '../../_metronic/layout/components/challenges/Scores/Scores.component'
// import {
//   useSubheader
// } from "../../_metronic/layout/_core/MetronicSubheader";
import Game from '../../_metronic/layout/components/challenges/Game/game.component'

export const GamePage = (props) => {
  useEffect(()=>{
    console.log("Game page mount");
  })
  const suhbeader = useSubheader();
  suhbeader.setTitle(props.gameName);
  return (
    <>
      {/* begin::Dashboard */}
      {!props.scoreAvailable ?
        <Game setStartGame={props.setStartGame} startGame={props.startGame} setScoreTable={props.setScoreTable} setScoreAvailable={props.setScoreAvailable}
          setNBackModalSetting={props.setNBackModalSetting} NBackModalSetting={props.NBackModalSetting} 
          setCPTModalSetting={props.setCPTModalSetting} CPTModalSetting={props.CPTModalSetting} CPT_defaultArr = {props.CPT_defaultArr}/>
        : <Score scoreTable={props.scoreTable} scoreAvailable={props.scoreAvailable} setStartGame={props.setStartGame} setScoreAvailable={props.setScoreAvailable}/>
      }
      {/* end::Dashboard */}
    </>
  );
};
