import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import React, { useState } from "react";
import Generate from "../../../../../../app/Generate";

const GonogoModal = (props) => {
  let status = 0;
  let gonogo_obj = props.gonogoModalSetting;
  const [mode, setMode] = useState(0);
  const [error, setError] = useState("");
  const handleClose = () => props.setShowModal(false);
  
  const setArray = (n, t) => {
    let totalTargets = gonogo_obj.arr;
    let none_target = totalTargets.filter(
      (item) => !gonogo_obj.targets.includes(item)
    );
    const generateArray = new Generate(n, t);
    generateArray
      .gonogo(none_target, gonogo_obj.targets)
      .then((gonogoOut) => {
        console.log(gonogoOut);
        gonogo_obj.arr = gonogoOut;
      })
      .catch((err) => {
        setError(err);
        status = 1;
        console.log(err);
      });
  };

  const updateSetting = (event) => {
    event.preventDefault();
    console.log(event.target[0]);
    gonogo_obj = props.gonogoModalSetting;
    console.log(event.target[0].value);
    if (event.target[0].value) {
      gonogo_obj.tempArraySample = event.target[0].value;
      let tempGonogoArr = [];
      tempGonogoArr = event.target[0].value.split("|");
      gonogo_obj.arr = tempGonogoArr;
    }
    if (parseInt(event.target[1].value) > 0)
      gonogo_obj.time = parseInt(event.target[1].value);
    if (parseInt(event.target[2].value) >= 0)
      gonogo_obj.isi = parseInt(event.target[2].value);
    if (parseInt(event.target[3].value) >= 0)
      gonogo_obj.numbers = parseInt(event.target[3].value);
    if (parseInt(event.target[4].value) >= 0)
      gonogo_obj.targetPercentage = parseInt(event.target[4].value);
    if (event.target[5].value) {
      let tempGonogoArrTarget = [];
      tempGonogoArrTarget = event.target[5].value.split("|");
      gonogo_obj.targets = tempGonogoArrTarget;
    }
    setArray(gonogo_obj.numbers, gonogo_obj.targetPercentage);
    gonogo_obj.mode = mode;
    if (status) {
      gonogo_obj = {};
      return;
    }
    props.setGonogoModalSetting(gonogo_obj);
    props.setShowModal(false);
  };

  const handleMode = (event) => {
    if (event.target.id === "demo") setMode(0);
    else setMode(1);
  };
  return (
    <Modal show={props.showModal} onHide={handleClose} className="game-modal">
      <form onSubmit={updateSetting}>
        <Modal.Header className="bg-light">
          <Modal.Title className="w-100">تنظیمات</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <div className="container">
            <div className="row form-group mb-2">
              <label htmlFor="input0" className="col-auto col-form-label">
                آرایه نمونه
              </label>
              <div className="col ps-0">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={4}
                    defaultValue={props.gonogoModalSetting.tempArraySample}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row form-group mb-2">
              <label htmlFor="input1" className="col-auto col-form-label">
                مدت زمان نمایش (ms) :
              </label>
              <div className="col ps-0">
                <input
                  type="number"
                  className="form-control"
                  id="input3"
                  min="20"
                  defaultValue={props.gonogoModalSetting.time}
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
                  defaultValue={props.gonogoModalSetting.isi}
                />
              </div>
            </div>
            <div className="row form-group mb-2">
              <label htmlFor="input3" className="col-auto col-form-label">
                سایز آرایه :
              </label>
              <div className="col ps-0">
                <input
                  type="number"
                  className="form-control"
                  id="input1"
                  min="5"
                  defaultValue={props.gonogoModalSetting.numbers}
                />
              </div>
            </div>
            <div className="row form-group mb-2">
              <label htmlFor="input4" className="col-auto col-form-label">
                درصد هدف :
              </label>
              <div className="col ps-0">
                <input
                  type="number"
                  className="form-control"
                  id="input2"
                  min="2"
                  defaultValue={props.gonogoModalSetting.targetPercentage}
                />
              </div>
            </div>

            <div className="row form-group mb-2">
              <label htmlFor="input5" className="col-auto col-form-label">
                آرایه هدف :
              </label>
              <div className="col ps-0">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea2"
                >
                  <Form.Control
                    as="textarea"
                    rows={4}
                    defaultValue={props.gonogoModalSetting.targets}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row form-group mb-2">
              <div className="col">
                <label className="mt-2"> حالت :</label>
              </div>
              <div className="col form-check-inline">
                <label className="radio radio-success mt-1">
                  دمو
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
                  تست
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
            {error ? error : null}
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <input className="btn btn-success" type="submit" value="ذخیره" />
        </Modal.Footer>
      </form>
    </Modal>
  );
};
export default GonogoModal;
