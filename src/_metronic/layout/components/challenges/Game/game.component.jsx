import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import Generate from '../../../../../app/Generate'
import Modal from 'react-bootstrap/Modal'
import CPT from '../CPT/CPT.component'
import NBack from '../NBack/NBack.component'
import './game.css'
import eStar from '../../../../../images/CPT/empty-star.png'
import hStar from '../../../../../images/CPT/half-tiny-star.png'
import fStar from '../../../../../images/CPT/star.png'

const Game = (props) => {
    useEffect(() => {
        console.log("USE EFFECT CALLED !");
    }, [])
    //console.log(props.CPTModalSetting);

    let CPT_obj = {
        numbers: props.CPTModalSetting.numbers,
        targetPercentage: props.CPTModalSetting.targetPercentage,
        time: 3000,
        isi: 1000,
        targets: [],
        arr: props.CPTModalSetting.arr,
        mode: 0
    }
    let NBack_obj = {
        time: 3000,
        isi: 1000,
        target: 1,
        NumberOfStimuli: 0,
        arr: [],
        mode: 0
    };
    const [showModal, setShowModal] = useState(false);
    const [startBtn, setStartBtn] = useState(0);
    const [mode, setMode] = useState(0);
    const [NBackObj, setNBackObj] = useState(props.NBackModalSetting)
    const { pathname } = useLocation();
    const currentRoute = pathname;

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const startHandler = () => {
        //currentRoute === "/NBack" ? setNBackObj(props.NBackModalSetting) : setCPTObj(props.CPTModalSetting);
        props.setStartGame(true);
        setStartBtn(1);
    }
    const setArray = (n, t) => {
        let totalTargets = [0, 1 ,2]
        console.log(totalTargets.filter(item => !CPT_obj.targets.includes(item), CPT_obj.targets));
        const generateArray = new Generate(n, t);
        generateArray
            .cpt(totalTargets.filter(item => !CPT_obj.targets.includes(item)), CPT_obj.targets)
            .then((cptOut) => {
                console.log("success");
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(generateArray.outSamples);
        return generateArray.outSamples;
    }

    const handleMode = (event) => {
        if (event.target.id === "demo")
            setMode(0);
        else
            setMode(1);
    }

    const updateSetting = (event) => {
        let target = [];
        event.preventDefault();
        if (currentRoute === "/NBack") {
            debugger;
            NBack_obj = props.NBackModalSetting;
            if (parseInt(event.target[0].value) > 0)
                NBack_obj.time = parseInt(event.target[0].value);
            if (parseInt(event.target[1].value) >= 0)
                NBack_obj.isi = parseInt(event.target[1].value);
            if (parseInt(event.target[2].value) > 0)
                NBack_obj.target = parseInt(event.target[2].value);
            if (parseInt(event.target[3].value) > 0)
                NBack_obj.NumberOfStimuli = parseInt(event.target[3].value);
            if (event.target[6].value)
                NBack_obj.arr = event.target[6].value.split(',').map(function (item) {
                    return parseInt(item, 10);
                })
            if (NBack_obj.isi === 0)
                NBack_obj.mode = 1
            else
                NBack_obj.mode = mode;

            setNBackObj(NBack_obj);
            props.setNBackModalSetting(NBack_obj);
        }
        else {
            console.log(props.CPTModalSetting);
            CPT_obj = props.CPTModalSetting;
            if (parseInt(event.target[0].value) > 0)
                CPT_obj.time = parseInt(event.target[0].value);
            if (parseInt(event.target[1].value) >= 0)
                CPT_obj.isi = parseInt(event.target[1].value);
            if (parseInt(event.target[2].value) >= 0)
                CPT_obj.numbers = parseInt(event.target[2].value);
            if (parseInt(event.target[3].value) >= 0)
                CPT_obj.targetPercentage = parseInt(event.target[3].value);
            if (event.target[4].checked)
                target.push(0);
            if (event.target[5].checked)
                target.push(1);
            if (event.target[6].checked)
                target.push(2);
            CPT_obj.targets = target;
            CPT_obj.arr = setArray(CPT_obj.numbers, CPT_obj.targetPercentage)
            CPT_obj.mode = mode;

            //setCPTObj(CPT_obj);
            props.setCPTModalSetting(CPT_obj);
            console.log(props.CPTModalSetting);
        }
        setShowModal(false);
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
                <Modal show={showModal} onHide={handleClose} className="game-modal">
                    <form onSubmit={updateSetting}>
                        <Modal.Header className="bg-light">
                            <Modal.Title className="w-100">
                                تنظیمات
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="bg-light">
                            <div className="container">

                                <div className="row form-group mb-2">
                                    <label htmlFor="input1" className="col-auto col-form-label">مدت زمان نمایش (ms) :</label>
                                    <div className="col ps-0">
                                        <input type="number" className="form-control" id="input3" min="20" placeholder={`پیشفرض : ${currentRoute === "/NBack" ? props.NBackModalSetting.time : props.CPTModalSetting.time}`} />
                                    </div>
                                </div>
                                <div className="row form-group mb-2">
                                    <label htmlFor="input2" className="col-auto col-form-label" dir="ltr">  : (ms) ISI </label>
                                    <div className="col ps-0">
                                        <input type="number" className="form-control" id="input4" min="20" placeholder={`پیشفرض : ${currentRoute === "/NBack" ? props.NBackModalSetting.isi : props.CPTModalSetting.isi}`} />
                                    </div>
                                </div>
                                <div className="row form-group mb-2">
                                    <label htmlFor="input3" className="col-auto col-form-label"> سایز آرایه :</label>
                                    <div className="col ps-0">
                                        <input type="number" className="form-control" id="input1" min="5" placeholder={`پیشفرض : ${currentRoute === "/NBack" ? props.NBackModalSetting.time : props.CPTModalSetting.numbers}`} />
                                    </div>
                                </div>
                                <div className="row form-group mb-2">
                                    <label htmlFor="input4" className="col-auto col-form-label"> درصد هدف :</label>
                                    <div className="col ps-0">
                                        <input type="number" className="form-control" id="input2" min="2" placeholder={`پیشفرض : ${currentRoute === "/NBack" ? props.NBackModalSetting.time : props.CPTModalSetting.targetPercentage}`} />
                                    </div>
                                </div>
                                {currentRoute === "/NBack" ?
                                    <>
                                        <div className="row form-group mb-2">
                                            <label htmlFor="input3" className="col-md-3 col-form-label"> n : </label>
                                            <div className="col-md-9 ps-0">
                                                <input type="number" className="form-control" id="target" min="1" placeholder={`پیشفرض : ${currentRoute === "/NBack" ? props.NBackModalSetting.target : props.CPTModalSetting.target}`} />
                                            </div>
                                        </div>
                                        <div className="row form-group mb-2">
                                            <label htmlFor="input4" className="col-md-5 col-form-label">طول آرایه : </label>
                                            <div className="col-md-7 ps-0">
                                                <input type="number" className="form-control" id="NumberOfStimuli" min="1" placeholder="پیشفرض : طول آرایه" />
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="row form-group mb-2">
                                            <div className="col-md-3">
                                                <label className="col-form-label mt-2">  هدف :</label>
                                            </div>
                                            <div className="col-md-9 ps-0">
                                                <div className="row justify-content-around">
                                                    <div className="form-check form-check-inline col-2 p-0">
                                                        <label className="checkbox checkbox-success ms-5">
                                                            <img src={fStar} className="w-50 mt-3 mb-3 mr-2 ml-3" />
                                                            <input type="checkbox" name="RadioOptions1" />
                                                            <span className="mt-2"></span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline col-2 p-0">
                                                        <label className="checkbox checkbox-success ms-5">
                                                            <img src={hStar} className="w-50 mt-3 mb-3 mr-2 ml-3" />
                                                            <input type="checkbox" name="RadioOptions1" />
                                                            <span className="mt-2"></span>
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline col-2 p-0">
                                                        <label className="checkbox checkbox-success ms-5">
                                                            <img src={eStar} className="w-50 mt-3 mb-3 mr-2 ml-3" />
                                                            <input type="checkbox" name="RadioOptions1"/>
                                                            <span className="mt-2"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                                <div className="row form-group mb-2">
                                    <div className="col">
                                        <label className="mt-2">  حالت :</label>
                                    </div>
                                    <div className="col form-check-inline">
                                        <label className="radio radio-success mt-1">  دمو
                                            <input type="radio" name="radioOptions2" id="demo" defaultChecked={mode === 0 ? true : false} onClick={handleMode} />
                                            <span className="m-1"></span>
                                        </label>
                                    </div>
                                    <div className="col form-check-inline">
                                        <label className="radio radio-success mt-1">  تست
                                            <input type="radio" name="radioOptions2" id="test" defaultChecked={mode === 1 ? true : false} onClick={handleMode} />
                                            <span className="m-1"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="bg-light">
                            <input className="btn btn-success" type="submit" value="ذخیره" />
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        )
    else {
        if (currentRoute === "/NBack")
            return (
                <NBack NBack_obj={NBackObj} setScoreTable={props.setScoreTable} setScoreAvailable={props.setScoreAvailable} />
            )
        else
            return (
                <CPT CPT_obj={props.CPTModalSetting} setScoreTable={props.setScoreTable} setScoreAvailable={props.setScoreAvailable} />
            )
    }
}
export default Game;

