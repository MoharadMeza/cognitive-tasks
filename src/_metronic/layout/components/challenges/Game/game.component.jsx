import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import CPT from '../CPT/CPT.component'
import NBack from '../NBack/NBack.component'
import CptModal from '../modals/CPT/CptModal.component'
import './game.css'
const Game = (props) => {
    // useEffect(() => {
    //     console.log("GAME USE EFFECT !");
    //     return () => {
    //         console.log("GAME UNMOUNT !");
    //     }
    // }, [])
    // console.log("Game renderd");
    const { pathname } = useLocation();
    const currentRoute = pathname;

    const [showModal, setShowModal] = useState(false);
    const [startBtn, setStartBtn] = useState(0);

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
                {currentRoute === '/CPT' ? <CptModal showModal={showModal} setShowModal={setShowModal} setCPTModalSetting={props.setCPTModalSetting} CPTModalSetting={props.CPTModalSetting} /> : null}
            </div>
        )
    else {
        if (currentRoute === "/CPT")
            return (
                <CPT CPT_obj={props.CPTModalSetting} setScoreTable={props.setScoreTable} setScoreAvailable={props.setScoreAvailable} />
            )
        else
            return (
                <NBack NBack_obj={props.NBackModalSetting} setScoreTable={props.setScoreTable} setScoreAvailable={props.setScoreAvailable} />
            )
    }
}
export default Game;

