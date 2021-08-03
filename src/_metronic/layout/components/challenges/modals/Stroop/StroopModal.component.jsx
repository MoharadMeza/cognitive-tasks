import React, { useState } from "react";
import Generate from '../../../../../../app/Generate'
import stroop from '../../../../../../app/Generate'
import { Modal } from 'react-bootstrap'
import { toInteger } from "lodash-es";
const StroopModal = (props) => {
    const [mode, setMode] = useState(props.stroopModalSetting.mode);
    const handleMode = (event) => {
        if (event.target.id === "demo")
            setMode(0);
        else
            setMode(1);

    }

    const handleClose = () => props.setShowModal(false);

    const setArrayStroop = (n, t) => {
        n = toInteger(n);
        t = toInteger(t);
        const generateArray = new Generate(n, t);
        generateArray
            .stroop(props.stroopModalSetting.colorArr)
            .then((stroopOut) => {
                props.setStroopModalSetting({ ...props.stroopModalSetting, arr: stroopOut });
                props.stroopModalSetting.arr = stroopOut;
            })
            .catch((err) => {
                console.log(err);
            });


    }
    const updateSetting = (event) => {
        event.preventDefault();
        let stroop_obj = props.stroopModalSetting;
        if (parseInt(event.target[0].value) > 0)
            stroop_obj.time = parseInt(event.target[0].value);
        if (parseInt(event.target[1].value) >= 0)
            stroop_obj.isi = parseInt(event.target[1].value);
        if (parseInt(event.target[2].value) >= 0)
            stroop_obj.fixed = parseInt(event.target[2].value);
        if (parseInt(event.target[3].value) >= 0)
            stroop_obj.numbers = parseInt(event.target[3].value);
        if (parseInt(event.target[4].value) >= 0)
            stroop_obj.incongPercent = parseInt(event.target[4].value);
        if (event.target[5].value !== "") {
            let str = event.target[5].value.toLowerCase();
            stroop_obj.asciiCode[0].codeEs = str.charCodeAt(0)
            stroop_obj.asciiCode[0].codeEc = stroop_obj.asciiCode[0].codeEs - 32;
        }
        if (event.target[6].value !== "") {
            let str = event.target[6].value.toLowerCase();
            stroop_obj.asciiCode[1].codeEs = str.charCodeAt(0)
            stroop_obj.asciiCode[1].codeEc = stroop_obj.asciiCode[1].codeEs - 32;
        }

        if (event.target[7].value !== "") {
            let str = event.target[7].value.toLowerCase();
            stroop_obj.asciiCode[2].codeEs = str.charCodeAt(0)
            stroop_obj.asciiCode[2].codeEc = stroop_obj.asciiCode[2].codeEs - 32;
        }
        if (event.target[8].value !== "") {
            let str = event.target[8].value.toLowerCase();
            stroop_obj.asciiCode[3].codeEs = str.charCodeAt(0)
            stroop_obj.asciiCode[3].codeEc = stroop_obj.asciiCode[3].codeEs - 32;
        }


        stroop_obj.mode = mode;
        props.setStroopModalSetting(stroop_obj);

        setArrayStroop(props.stroopModalSetting.numbers, props.stroopModalSetting.incongPercent)
        props.setShowModal(false);

    }
    return (<>
        <div className="bg-light game-modal h-100 d-flex justify-content-center align-items-center">
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
                                    <input type="number" className="form-control" id="input1" min="20" placeholder={props.stroopModalSetting.time} defaultValue={props.stroopModalSetting.time} />
                                </div>
                            </div>
                            <div className="row form-group mb-2">
                                <label htmlFor="input2" className="col-auto col-form-label" dir="ltr">  : (ms) ISI </label>
                                <div className="col ps-0">
                                    <input type="number" className="form-control" id="input2" min="20" placeholder={props.stroopModalSetting.isi} defaultValue={props.stroopModalSetting.isi} />
                                </div>
                            </div>
                            <div className="row form-group mb-2">
                                <label htmlFor="input3" className="col-auto col-form-label" dir="ltr">  : (ms) Fixed </label>
                                <div className="col ps-0">
                                    <input type="number" className="form-control" id="input3" min="20" placeholder={props.stroopModalSetting.fixed} defaultValue={props.stroopModalSetting.fixed} />
                                </div>
                            </div>
                            <div className="row form-group mb-2">
                                <label htmlFor="input4" className="col-auto col-form-label"> تعداد محرک:</label>
                                <div className="col ps-0">
                                    <input type="number" className="form-control" id="input4" min="5" placeholder={props.stroopModalSetting.numbers} defaultValue={props.stroopModalSetting.numbers} />
                                </div>
                            </div>
                            <div className="row form-group mb-2">
                                <label htmlFor="input5" className="col-auto col-form-label"> درصد ناهمخوان :</label>
                                <div className="col ps-0">
                                    <input type="number" className="form-control" id="input5" min="2" placeholder={props.stroopModalSetting.incongPercent} defaultValue={props.stroopModalSetting.incongPercent} />
                                </div>
                            </div>
                            <div className="row form-group mb-2">
                                <label htmlFor="input6" className="col-auto col-form-label"> کلید رنگ قرمز:</label>
                                <div className="col ps-0">
                                    <input type="text" pattern="[a-zA-Z]+" className="form-control" id="input6" maxLength="1" placeholder={`پیشفرض : ${String.fromCharCode(props.stroopModalSetting.asciiCode[0].codeEs)} یا ${String.fromCharCode(props.stroopModalSetting.asciiCode[0].codeEc)}`} defaultValue={String.fromCharCode(props.stroopModalSetting.asciiCode[0].codeEs)} />
                                </div>
                            </div>
                            <div className="row form-group mb-2">
                                <label htmlFor="input7" className="col-auto col-form-label"> کلید رنگ آبی:</label>
                                <div className="col ps-0">
                                    <input type="text" pattern="[a-zA-Z]+" className="form-control" id="input7" maxLength="1" placeholder={`پیشفرض : ${String.fromCharCode(props.stroopModalSetting.asciiCode[1].codeEs)} یا ${String.fromCharCode(props.stroopModalSetting.asciiCode[1].codeEc)}`} defaultValue={String.fromCharCode(props.stroopModalSetting.asciiCode[1].codeEs)} />
                                </div>
                            </div>
                            <div className="row form-group mb-2">
                                <label htmlFor="input8" className="col-auto col-form-label"> کلید رنگ زرد:</label>
                                <div className="col ps-0">
                                    <input type="text" pattern="[a-zA-Z]+" className="form-control" id="input8" maxLength="1" placeholder={`پیشفرض : ${String.fromCharCode(props.stroopModalSetting.asciiCode[2].codeEs)} یا ${String.fromCharCode(props.stroopModalSetting.asciiCode[2].codeEc)}`} defaultValue={String.fromCharCode(props.stroopModalSetting.asciiCode[2].codeEs)}/>
                                </div>
                            </div>
                            <div className="row form-group mb-2">
                                <label htmlFor="input9" className="col-auto col-form-label"> کلید رنگ سبز:</label>
                                <div className="col ps-0">
                                    <input type="text" pattern="[a-zA-Z]+" className="form-control" id="input9" maxLength="1" placeholder={`پیشفرض : ${String.fromCharCode(props.stroopModalSetting.asciiCode[3].codeEs)} یا ${String.fromCharCode(props.stroopModalSetting.asciiCode[3].codeEc)}`} defaultValue={String.fromCharCode(props.stroopModalSetting.asciiCode[3].codeEs)}/>
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
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="bg-light">
                        <input className="btn btn-success" type="submit" value="ذخیره" />
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    </>
    )
}
export default StroopModal;