import React, { useEffect, useState, useRef } from "react";
import Scores from '../Scores/Scores.component'
import './cpt.css'

import eStar from '../../../../../images/CPT/empty-star.png'
import hStar from '../../../../../images/CPT/half-tiny-star.png'
import fStar from '../../../../../images/CPT/star.png'
const CPT = (props) => {

    const begin = useRef(0);
    const status = useRef(1);

    let pressKey, answerTime, intervalT, blockStartTimer, sum = 0, normalISI, time, isi, target = [] , finish = 0;
    let arrOfImg, response = [];
    let cnt = 0;

    let scoreObj = {
        name: "CPT",
        time: 3000,
        isi: 1000,
        target: [],
        totalNumber: 0,
        allCorrects: 0,
        userCorrects: 0,
        commission: 0,
        ommission: 0,
        totalResponseTime: 0,
        responseAvg: 0,
    };
    const eventHandler = (event) => {
        if ((!event || event.keyCode === 32) && !begin.current) {
            begin.current = 1;
            start();
            return
        }
        if (status.current)
            if (!event || event.keyCode === 32) {
                pressKey = Date.now();
                status.current = 0;
                checkAnswer();
            }
    }
    useEffect(() => {
        //console.log(props.CPT_obj);
        scoreObj.time = time = props.CPT_obj.time
        scoreObj.isi = isi = props.CPT_obj.isi
        scoreObj.target = target = props.CPT_obj.targets
        if (props.CPT_obj.arr.length)
            arrOfImg = props.CPT_obj.arr;
        window.addEventListener('keydown', eventHandler);
        console.log(scoreObj.target);
        return () => {
            window.removeEventListener('keydown', eventHandler)
        }
    }, []);

    function triggerEvent(el, type, keyCode) {
        if ('createEvent' in document) {
            // modern browsers, IE9+
            var e = document.createEvent('HTMLEvents');
            e.keyCode = 32;
            e.initEvent(type, false, true);
            el.dispatchEvent(e);
        } else {
            // IE 8
            var e = document.createEventObject();
            e.keyCode = keyCode;
            e.eventType = type;
            el.fireEvent('on' + e.eventType, e);
        }
    }
    const [Img, setImg] = useState(null);
    const [feedBack, setFeedBack] = useState(null);

    const handleInterval = (finish)=>{
        if (finish) {
            //debugger;
            clearInterval(intervalT)
            clearTimeout(normalISI)
        }
        intervalT = setInterval(() => {
            status.current = 1;
            showTime()
        }, time + isi);
    }

    const setScoreObjectInfo = () => {
        scoreObj.totalNumber = arrOfImg.length;
        for (let i = 0; i < scoreObj.totalNumber; i++) {
            if (arrOfImg[i].targetSample) {
                scoreObj.allCorrects++;
            }
        }
        scoreObj.ommission = scoreObj.allCorrects;
    }
    const start = () => {
        setScoreObjectInfo();
        showTime();
        console.log("start");
        handleInterval(finish);
    }
    const showTime = () => {
        setFeedBack(null)
        if(finish){
            props.setScoreTable(scoreObj)
            props.setScoreAvailable(true);
            return;
        }
        //debugger;
        if (arrOfImg[cnt].imageIndex === 0)
            setImg(fStar)
        else if (arrOfImg[cnt].imageIndex === 1)
            setImg(hStar)
        else if (arrOfImg[cnt].imageIndex === 2)
            setImg(eStar)
        blockStartTimer = Date.now();
        console.log(cnt , arrOfImg.length);
        
        if (cnt === arrOfImg.length - 1) {
            debugger;
            clearInterval(intervalT);
            console.log(intervalT);
            console.log("fin");
            finish = 1;
        }
        normalISI = setTimeout(() => { setImg(null) }, time);
        cnt++;
    }

    const checkAnswer = () => {
        let indexNum;
        if (pressKey) {
            answerTime = pressKey - blockStartTimer;
            indexNum = cnt - 1;
            if (arrOfImg[indexNum].targetSample) {
                console.log("true");
                scoreObj.userCorrects++;
                scoreObj.ommission--;
                response.push(answerTime);
                sum += answerTime;
                scoreObj.totalResponseTime = sum;
                scoreObj.responseAvg = averaging();
                setFeedBack("درست")
            }
            else{
                console.log("false");
                scoreObj.commission++;
                setFeedBack("غلط")
            }
            if (answerTime <= time) {
                clearTimeout(normalISI);
                clearInterval(intervalT);
                setImg(null)
                setTimeout(() => {
                    status.current = 1;
                    showTime();
                    handleInterval(finish);
                }, isi)
            }
        }
        console.log(response)
    }
    const averaging = () => {
        let avg = sum / response.length;
        return avg;
    }
    if (!begin.current)
        return (
            <div className="start-game" dir="ltr">
                <h1 className="start-text display-1">
                    را بزنید space برای شروع
                </h1>
                <div className="d-flex mobile-space d-md-none justify-content-center mt-5">
                    <button className="btn btn-info" onClick={() => { triggerEvent(window, 'keydown', 32) }}>
                        Space
                    </button>
                </div>
            </div>
        )
    return (
        <div className="container">
            <div className="row justify-content-center d-flex">
                <img src={Img} className="stars" />
            </div>
            {!props.CPT_obj.mode ?
                <div className="row justify-content-center d-flex">
                    <h1 className="feedback">
                        <strong>{feedBack}</strong>
                    </h1>
                </div> : null
            }
            <div className="d-flex mobile-space d-md-none justify-content-center mt-5">
                <button className="btn btn-info" onClick={() => { triggerEvent(window, 'keydown', 32) }}>
                    Space
                </button>
            </div>
        </div>
    )
}
export default CPT;