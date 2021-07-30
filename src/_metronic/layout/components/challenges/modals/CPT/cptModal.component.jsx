import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import Generate from '../../../../../../app/Generate'
import eStar from '../../../../../../images/CPT/empty-star.png'
import hStar from '../../../../../../images/CPT/half-tiny-star.png'
import fStar from '../../../../../../images/CPT/star.png'

const CptModal = (props) => {
    let status = 0;
    let CPT_obj = props.CPTModalSetting;
    let target = [];
    const [mode, setMode] = useState(0);
    const [error , setError] = useState("");

    const setArray = (n, t) => {
        let totalTargets = [0, 1, 2]
        let none_target = totalTargets.filter(item => !CPT_obj.targets.includes(item))
        const generateArray = new Generate(n, t);
        generateArray
            .cpt(none_target, CPT_obj.targets)
            .then((cptOut) => {
                CPT_obj.arr = cptOut;
            })
            .catch((err) => {
                debugger;

                setError(err)
                status = 1
                console.log(err);
            });
    }
    const handleMode = (event) => {
        if (event.target.id === "demo")
            setMode(0);
        else
            setMode(1);
    }

    const handleClose = () => props.setShowModal(false);
    const updateSetting = (event) => {
        event.preventDefault();
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
        setArray(CPT_obj.numbers, CPT_obj.targetPercentage)
        CPT_obj.mode = mode;
        if(status)
        {
            console.log(error);
            CPT_obj = {};
            return;
        }
        props.setCPTModalSetting(CPT_obj);
        props.setShowModal(false);
    }

    return (
        <Modal show={props.showModal} onHide={handleClose} className="game-modal">
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
                                <input type="number" className="form-control" id="input3" min="20" placeholder={`پیشفرض : ${props.CPTModalSetting.time}`} />
                            </div>
                        </div>
                        <div className="row form-group mb-2">
                            <label htmlFor="input2" className="col-auto col-form-label" dir="ltr">  : (ms) ISI </label>
                            <div className="col ps-0">
                                <input type="number" className="form-control" id="input4" min="20" placeholder={`پیشفرض : ${props.CPTModalSetting.isi}`} />
                            </div>
                        </div>
                        <div className="row form-group mb-2">
                            <label htmlFor="input3" className="col-auto col-form-label"> سایز آرایه :</label>
                            <div className="col ps-0">
                                <input type="number" className="form-control" id="input1" min="5" placeholder={`پیشفرض : ${props.CPTModalSetting.numbers}`} />
                            </div>
                        </div>
                        <div className="row form-group mb-2">
                            <label htmlFor="input4" className="col-auto col-form-label"> درصد هدف :</label>
                            <div className="col ps-0">
                                <input type="number" className="form-control" id="input2" min="2" placeholder={`پیشفرض : ${props.CPTModalSetting.targetPercentage}`} />
                            </div>
                        </div>

                        <div className="row form-group mb-2">
                            <div className="col-md-3">
                                <label className="col-form-label mt-2">  هدف :</label>

                            </div>
                            <div className="col-md-9 ps-0">
                                <div className="row justify-content-around">
                                    <div className="form-check form-check-inline col-2 p-0">
                                        <label className="checkbox checkbox-success ms-5">
                                            <img src={fStar} className="w-50 mt-3 mb-3 mr-2 ml-3" />
                                            <input type="checkbox" name="RadioOptions1" defaultChecked={props.CPTModalSetting.targets.includes(0)}/>
                                            <span className="mt-2"></span>
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline col-2 p-0">
                                        <label className="checkbox checkbox-success ms-5">
                                            <img src={hStar} className="w-50 mt-3 mb-3 mr-2 ml-3" />
                                            <input type="checkbox" name="RadioOptions1" defaultChecked={props.CPTModalSetting.targets.includes(1)}/>
                                            <span className="mt-2"></span>
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline col-2 p-0">
                                        <label className="checkbox checkbox-success ms-5">
                                            <img src={eStar} className="w-50 mt-3 mb-3 mr-2 ml-3" />
                                            <input type="checkbox" name="RadioOptions1" defaultChecked={props.CPTModalSetting.targets.includes(2)}/>
                                            <span className="mt-2"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        {error ? error : null}
                    </div>
                </Modal.Body>
                <Modal.Footer className="bg-light">
                    <input className="btn btn-success" type="submit" value="ذخیره" />
                </Modal.Footer>
            </form>
        </Modal>
    )
}
export default CptModal;