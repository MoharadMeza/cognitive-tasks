import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CPT from "../CPT/CPT.component";
import CptModal from "../modals/CPT/CptModal.component";
import NBack from "../NBack/NBack.component";
import NBackModal from "../modals/NBack/NBackModal.component";
import StroopModal from "../modals/Stroop/StroopModal.component";
import Stroop from "../Stroop/Stroop.component";
import GonogoModal from "../modals/GonoGo/gonogoModal.component";
import Gonogo from "../GonoGo/gonogo.component";
import "./game.css";
const Game = (props) => {
    const { pathname } = useLocation();
    const currentRoute = pathname;

    const [showModal, setShowModal] = useState(false);
    const [startBtn, setStartBtn] = useState(0);

    const switchModal = () => {
        switch (currentRoute) {
            case "/n-back":
                return (
                    <NBackModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        setNBackModalSetting={props.setNBackModalSetting}
                        NBackModalSetting={props.NBackModalSetting}
                    />
                );
            case "/cpt":
                return (
                    <CptModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        setCPTModalSetting={props.setCPTModalSetting}
                        CPTModalSetting={props.CPTModalSetting}
                    />
                );
            case "/go-nogo":
                return (
                    <GonogoModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        setGonogoModalSetting={props.setGonogoModalSetting}
                        gonogoModalSetting={props.gonogoModalSetting}
                    />
                );
            case "/stroop":
                return (
                    <StroopModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        setStroopModalSetting={props.setStroopModalSetting}
                        stroopModalSetting={props.stroopModalSetting}
                    />
                );
        }
    };
    const switchGame = () => {
        switch (currentRoute) {
            case "/n-back":
                return (
                    <NBack
                        setStartGame={props.setStartGame}
                        NBack_obj={props.NBackModalSetting}
                        setScoreTable={props.setScoreTable}
                        setScoreAvailable={props.setScoreAvailable}
                    />
                );
            case "/cpt":
                return (
                    <CPT
                        setStartGame={props.setStartGame}
                        CPT_obj={props.CPTModalSetting}
                        setScoreTable={props.setScoreTable}
                        setScoreAvailable={props.setScoreAvailable}
                    />
                );
            case "/go-nogo":
                return (
                    <Gonogo
                        setStartGame={props.setStartGame}
                        gonogoModalSetting={props.gonogoModalSetting}
                        setScoreTable={props.setScoreTable}
                        setScoreAvailable={props.setScoreAvailable}
                    />
                );

            case "/stroop":
                return (
                    <Stroop
                        setStartGame={props.setStartGame}
                        stroop_obj={props.stroopModalSetting}
                        setScoreTable={props.setScoreTable}
                        setScoreAvailable={props.setScoreAvailable}
                    />
                );
        }
    };
    const handleShow = () => setShowModal(true);
    const startHandler = () => {
        props.setStartGame(true);
        setStartBtn(1);
    };

    if (!startBtn && !props.startGame)
        return (
            <div className="bg-light game-modal h-100 d-flex justify-content-center align-items-center">
                <div className="w-50 h-100 d-flex flex-column justify-content-around">
                    <div className="text-center mb-md-0 mb-3 h-25">
                        <button
                            onClick={startHandler}
                            className="btn btn-secondary w-100 fs-1 mb-3 h-75  display-4"
                        >
                            شروع
                        </button>
                    </div>
                    <div className="text-center h-25">
                        <button
                            onClick={handleShow}
                            className="btn btn-primary w-100 display-4 h-75"
                        >
                            تنظیمات
                        </button>
                    </div>
                </div>
                {switchModal()}
            </div>
        );
    else return (<>{switchGame()}</>);
};
export default Game;
