import React, { useState } from "react";
import Generate from '../../../../../../app/Generate'
import Modal from 'react-bootstrap/Modal'

const NBackModal = (props) => {
    let NBack_obj = props.NBackModalModalSetting
    const [mode, setMode] = useState(0);
    const [error, setError] = useState("");

    const setArray = (n, t) => {
        let totalNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        return new Promise((resolve, reject) => {
            const generateArray = new Generate(n, t);
            generateArray
                .nback(totalNumber, NBack_obj.n, 10)
                .then((nbackOut) => {
                    console.log("rafte to then");
                    resolve(nbackOut);
                })
                .catch((err) => {
                    console.log("rafte to catch");
                    reject(err.message)
                });
        })
    }
    const handleMode = (event) => {
        if (event.target.id === "demo")
            setMode(0);
        else
            setMode(1);
    }

    const handleClose = () => props.setShowModal(false);

    const updateSetting = async (event) => {
        event.preventDefault();
        NBack_obj = props.NBackModalSetting;
        NBack_obj.time = 10;
        console.log(event.target[0]);
        if (parseInt(event.target[0].value) > 0)
            NBack_obj.time = parseInt(event.target[0].value);
        if (parseInt(event.target[1].value) >= 0)
            NBack_obj.isi = parseInt(event.target[1].value);
        if (parseInt(event.target[2].value) > 0)
            NBack_obj.numbers = parseInt(event.target[2].value);
        if (parseInt(event.target[3].value) > 0)
            NBack_obj.targetPercentage = parseInt(event.target[3].value);
        if (parseInt(event.target[4].value) > 0)
            NBack_obj.n = parseInt(event.target[4].value);
        try {
            let array = await setArray(NBack_obj.numbers, NBack_obj.targetPercentage)
            console.log(array);
            NBack_obj.arr = array;
            NBack_obj.mode = mode;
            props.setNBackModalSetting(NBack_obj);
            props.setShowModal(false);
            setError("")
        } catch (err) {
            console.log(err)
            setError(err)
        }
    }

    return (
        <Modal show={props.showModal} onHide={handleClose} className="game-modal">
            <form onSubmit={updateSetting} id="setting-form" >
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
                                <input type="number" className="form-control" id="input1" min="20" placeholder={props.NBackModalSetting.time} defaultValue={props.NBackModalSetting.time} />
                            </div>
                        </div>
                        <div className="row form-group mb-2">
                            <label htmlFor="input2" className="col-auto col-form-label" dir="ltr">  : (ms) ISI </label>
                            <div className="col ps-0">
                                <input type="number" className="form-control" id="input2" min="20" placeholder={props.NBackModalSetting.isi} defaultValue={props.NBackModalSetting.isi} />
                            </div>
                        </div>
                        <div className="row form-group mb-2">
                            <label htmlFor="input3" className="col-auto col-form-label"> سایز آرایه :</label>
                            <div className="col ps-0">
                                <input type="number" className="form-control" id="input3" min="5" placeholder={props.NBackModalSetting.numbers} defaultValue={props.NBackModalSetting.numbers} />
                            </div>
                        </div>
                        <div className="row form-group mb-2">
                            <label htmlFor="input4" className="col-auto col-form-label"> درصد هدف :</label>
                            <div className="col ps-0">
                                <input type="number" className="form-control" id="input4" min="" placeholder={props.NBackModalSetting.targetPercentage} defaultValue={props.NBackModalSetting.targetPercentage} />
                            </div>
                        </div>
                        <div className="row form-group mb-2">
                            <label htmlFor="input5" className="col-auto col-form-label"> n :</label>
                            <div className="col ps-0">
                                <input type="number" className="form-control" id="input5" min="1" placeholder={props.NBackModalSetting.n} defaultValue={props.NBackModalSetting.n} />
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
                        {error ?
                            <div class="alert alert-warning alert-dismissible fade show" role="alert" dir="rtl">
                                <strong>{error}</strong>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={() => { setError(false) }}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            : null
                        }

                    </div>
                </Modal.Body>
                <Modal.Footer className="bg-light">
                    <input className="btn btn-success" disabled={error && false} type="submit" value="ذخیره" />
                </Modal.Footer>
            </form>
        </Modal>
    )
}
export default NBackModal;