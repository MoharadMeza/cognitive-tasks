import React from "react";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './InfoModal.css'

const InfoModal = (props) => {
    const closeModalHandle = () => props.setShowModal(false)
    const description = {
        'CPT': "خوشحالم که در چالش عملکرد پیوسته شرکت کردی!با مشارکت در چالش عملکرد پیوسته ، ۲۰۰ امتیاز کسب می کنی و مدالش به مجموعه مدال‌هات اضافه میشه.",
        'NBack': "خوشحالم که در چالش چندتا قبل شرکت کردی!با مشارکت در چالش چندتا قبل ، ۶۰۰ امتیاز کسب می کنی و مدالش به مجموعه مدال‌هات اضافه میشه.",
        'GonoGo': "خوشحالم که در چالش برونرو شرکت کردی!با مشارکت در چالش برونرو ، ۲۰۰ امتیاز کسب می کنی و مدالش به مجموعه مدال‌هات اضافه میشه.",
        'Stroop': "خوشحالم که در چالش استروپ شرکت کردی!با مشارکت در چالش استروپ ، ۲۰۰ امتیاز کسب می کنی و مدالش به مجموعه مدال‌هات اضافه میشه."
    }
    return (
            <Modal className="info-modal" show={props.showModal} onHide={closeModalHandle}>
                <Modal.Header className="bg-light">
                    <Modal.Title className="w-100">
                        {props.gameName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {description[props.gameName]}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={closeModalHandle}>بستن</Button>
                </Modal.Footer>
            </Modal>
    )
}
export default InfoModal;