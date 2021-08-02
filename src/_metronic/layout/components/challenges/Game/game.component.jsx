import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import CPT from '../CPT/CPT.component'
import NBack from '../NBack/NBack.component'
import CptModal from '../modals/CPT/CptModal.component'
import NBackModal from '../modals/NBack/NBackModal.component'
import StroopModal from '../modals/StroopModal/StroopModal.component'
import Stroop from '../Stroop/Stroop.component'
import GonogoModal from ".././modals/gonogo/gonogoModal.component";
import Gonogo from ".././gonogo-test/gonogo.component" 
import './game.css'
const Game = (props) => {

    const { pathname } = useLocation();
    const currentRoute = pathname;

  const [showModal, setShowModal] = useState(false);
  const [startBtn, setStartBtn] = useState(0);

    const switchModal = () => {
        switch (currentRoute) {
            case "/NBack":
                return (
                    <NBackModal showModal={showModal} setShowModal={setShowModal} setNBackModalSetting={props.setNBackModalSetting} NBackModalSetting={props.NBackModalSetting} />
                )
            case "/CPT":
                return (
                    <CptModal showModal={showModal} setShowModal={setShowModal} setCPTModalSetting={props.setCPTModalSetting} CPTModalSetting={props.CPTModalSetting} />
                )
            case "/gonogo":
                  return(
                    <GonogoModal
                      showModal={showModal}
                      setShowModal={setShowModal}
                      setGonogoModalSetting={props.setGonogoModalSetting}
                      gonogoModalSetting={props.gonogoModalSetting}
                    />
                  )
                break;
            case "/Stroop":
                return (
                    <StroopModal showModal={showModal} setShowModal={setShowModal}
                        setStroopModalSetting={props.setStroopModalSetting}
                        stroopModalSetting={props.stroopModalSetting}
                    />
                )
        }
    }
    const switchGame = () => {
        switch (currentRoute) {
            case "/NBack":
                return (
                    <NBack NBack_obj={props.NBackModalSetting} setScoreTable={props.setScoreTable} setScoreAvailable={props.setScoreAvailable} />
                )
            case "/CPT":
                return (
                    <CPT CPT_obj={props.CPTModalSetting} setScoreTable={props.setScoreTable} setScoreAvailable={props.setScoreAvailable} />
                )
            case "/gonogo":
                  return(
                    <Gonogo
                      gonogoModalSetting={props.gonogoModalSetting}
                      setScoreTable={props.setScoreTable}
                      setScoreAvailable={props.setScoreAvailable}
                    />
                  )
                break;
            case "/Stroop":
                return (
                    <Stroop stroop_obj={props.stroopModalSetting} setScoreTable={props.setScoreTable} setScoreAvailable={props.setScoreAvailable} />
                )
                break;
        }
    }
    const handleShow = () => setShowModal(true);
    const startHandler = () => {
        props.setStartGame(true);
        setStartBtn(1);
    }

    if (!startBtn && !props.startGame)
        return (
            <div className="bg-light game-modal h-100 d-flex justify-content-center align-items-center">
                <div className="w-50 h-100 d-flex flex-column justify-content-around">
                    <div className="text-center mb-md-0 mb-3 h-25">
                        <button onClick={startHandler} className="btn btn-secondary w-100 fs-1 mb-3 h-75  display-4">
                            شروع
                        </button>
                    </div>
                    <div className="text-center h-25">
                        <button onClick={handleShow} className="btn btn-primary w-100 display-4 h-75">
                            تنظیمات
                        </button>
                    </div>
                </div>
                {switchModal()}
            </div>
        )
    else
        return (
            <>
                {switchGame()}
            </>
        )
}
export default Game;
