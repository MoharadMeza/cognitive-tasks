import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Generate from "../../../../../../app/Generate";
import eStar from "../../../../../../images/CPT/empty-star.png";
import hStar from "../../../../../../images/CPT/half-tiny-star.png";
import fStar from "../../../../../../images/CPT/star.png";

const CptModal = (props) => {
    console.log(props.showModal);
    let CPT_obj = props.CPTModalSetting;
    let target = [];
    const [mode, setMode] = useState(0);
    const [error, setError] = useState(false);

    const setArray = (n, t) => {
        return new Promise((resolve, reject) => {
            let totalTargets = [0, 1, 2]
            let none_target = totalTargets.filter(item => !CPT_obj.targets.includes(item))
            const generateArray = new Generate(n, t);
            generateArray
                .cpt(none_target, CPT_obj.targets)
                .then((cptOut) => {
                    console.log("rafte to then");
                    resolve(cptOut);
                })
                .catch((err) => {
                    console.log("rafte to catch");
                    reject(err.message)

                });
        })
    };
    const handleMode = (event) => {
        if (event.target.id === "demo") setMode(0);
        else setMode(1);
    };

    const handleClose = () => props.setShowModal(false);

    const updateSetting = async (event) => {
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
        if (event.target[4].checked) target.push(0);
        if (event.target[5].checked) target.push(1);
        if (event.target[6].checked) target.push(2);
        CPT_obj.targets = target;
        try {
            let array = await setArray(CPT_obj.numbers, CPT_obj.targetPercentage);
            CPT_obj.arr = array;
            CPT_obj.mode = mode;
            props.setCPTModalSetting(CPT_obj);
            props.setShowModal(false);
            setError(false);
        } catch (err) {
            setError(true);
        }
        props.setCPTModalSetting(CPT_obj);
        props.setShowModal(false);
    };

    return (
        <Modal show={props.showModal} onHide={handleClose} className="game-modal">
            <form onSubmit={updateSetting} id="setting-form">
                <Modal.Header className="bg-light">
                    <Modal.Title className="w-100">??????????????</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-light">
                    <div className="container">
                        <div className="row form-group mb-2">
                            <label htmlFor="input1" className="col-auto col-form-label">
                                ?????? ???????? ?????????? (ms) :
                            </label>
                            <div className="col ps-0">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="input3"
                                    min="20"
                                    placeholder={props.CPTModalSetting.time}
                                    defaultValue={props.CPTModalSetting.time}
                                />
                            </div>
                        </div>
                        <div className="row form-group mb-2">
                            <label
                                htmlFor="input2"
                                className="col-auto col-form-label"
                                dir="ltr"
                            >
                                : (ms) ISI
                            </label>
                            <div className="col ps-0">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="input4"
                                    min="20"
                                    placeholder={props.CPTModalSetting.isi}
                                    defaultValue={props.CPTModalSetting.isi}
                                />
                            </div>
                        </div>
                        <div className="row form-group mb-2">
                            <label htmlFor="input3" className="col-auto col-form-label">
                                ???????? ?????????? :
                            </label>
                            <div className="col ps-0">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="input1"
                                    min="10"
                                    placeholder={props.CPTModalSetting.numbers}
                                    defaultValue={props.CPTModalSetting.numbers}
                                />
                            </div>
                        </div>
                        <div className="row form-group mb-2">
                            <label htmlFor="input4" className="col-auto col-form-label">
                                ???????? ?????? :
                            </label>
                            <div className="col ps-0">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="input2"
                                    min="2"
                                    placeholder={props.CPTModalSetting.targetPercentage}
                                    defaultValue={props.CPTModalSetting.targetPercentage}
                                />
                            </div>
                        </div>

                        <div className="row form-group mb-2">
                            <div className="col-md-3">
                                <label className="col-form-label mt-2"> ?????? :</label>
                            </div>
                            <div className="col-md-9 ps-0">
                                <div className="row justify-content-around">
                                    <div className="form-check form-check-inline col-2 p-0">
                                        <label className="checkbox checkbox-success ms-5">
                                            <img src={fStar} className="w-50 mt-3 mb-3 mr-2 ml-3" />
                                            <input
                                                type="checkbox"
                                                name="RadioOptions1"
                                                defaultChecked={props.CPTModalSetting.targets.includes(
                                                    0
                                                )}
                                            />
                                            <span className="mt-2"></span>
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline col-2 p-0">
                                        <label className="checkbox checkbox-success ms-5">
                                            <img src={hStar} className="w-50 mt-3 mb-3 mr-2 ml-3" />
                                            <input
                                                type="checkbox"
                                                name="RadioOptions1"
                                                defaultChecked={props.CPTModalSetting.targets.includes(
                                                    1
                                                )}
                                            />
                                            <span className="mt-2"></span>
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline col-2 p-0">
                                        <label className="checkbox checkbox-success ms-5">
                                            <img src={eStar} className="w-50 mt-3 mb-3 mr-2 ml-3" />
                                            <input
                                                type="checkbox"
                                                name="RadioOptions1"
                                                defaultChecked={props.CPTModalSetting.targets.includes(
                                                    2
                                                )}
                                            />
                                            <span className="mt-2"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row form-group mb-2">
                            <div className="col">
                                <label className="mt-2"> ???????? :</label>
                            </div>
                            <div className="col form-check-inline">
                                <label className="radio radio-success mt-1">
                                    {" "}
                                    ??????
                                    <input
                                        type="radio"
                                        name="radioOptions2"
                                        id="demo"
                                        defaultChecked={mode === 0 ? true : false}
                                        onClick={handleMode}
                                    />
                                    <span className="m-1"></span>
                                </label>
                            </div>
                            <div className="col form-check-inline">
                                <label className="radio radio-success mt-1">
                                    {" "}
                                    ??????
                                    <input
                                        type="radio"
                                        name="radioOptions2"
                                        id="test"
                                        defaultChecked={mode === 1 ? true : false}
                                        onClick={handleMode}
                                    />
                                    <span className="m-1"></span>
                                </label>
                            </div>
                        </div>
                        {error ? (
                            <div
                                class="alert alert-warning alert-dismissible fade show"
                                role="alert"
                                dir="rtl"
                            >
                                <strong>?????????? ???? ???? ???????????? ???????? ?????? ?????????? ??????!</strong>
                                <button
                                    type="button"
                                    class="close"
                                    data-dismiss="alert"
                                    aria-label="Close"
                                    onClick={() => {
                                        setError(false);
                                    }}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        ) : null}
                    </div>
                </Modal.Body>
                <Modal.Footer className="bg-light">
                    <input
                        className="btn btn-success"
                        disabled={error && false}
                        type="submit"
                        value="??????????"
                    />
                </Modal.Footer>
            </form>
        </Modal>
    );
};
export default CptModal;
