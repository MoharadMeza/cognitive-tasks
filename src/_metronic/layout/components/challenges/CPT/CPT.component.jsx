import React, { useEffect, useState, useRef } from "react";
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

    let scoreObj = [
        {name : "زمان نمایش" , value : 3000}, //0
        {name : "ISI" , value : 1000}, //1
        {name : "هدف" , value : []}, //2
        {name : "تعداد شکل ها" , value : 0}, //3
        {name : "کل صحیح ها" , value : 0}, //4
        {name : "صحیح های کاربر" , value : 0}, //5
        {name : "خطای حذف" , value : 0}, //6
        {name : "خطای ارتکاب" , value : 0}, //7
        {name : "زمان پاسخ کل" , value : 0}, //8
        {name : "میانگین زمان پاسخ" , value : 0}, //9
        {name : "بازداری صحیح" , value : 0}
    ]
    useEffect(() => {
        //console.log(props.CPT_obj);
        scoreObj[0].value = time = props.CPT_obj.time
        scoreObj[1].value = isi = props.CPT_obj.isi
        scoreObj[2].value = target = props.CPT_obj.targets
        if (props.CPT_obj.arr.length)
            arrOfImg = props.CPT_obj.arr;
        window.addEventListener('keydown', eventHandler);
        console.log("CPT USE EFFECT");
        return () => {
            console.log("CPT Unmount");
            window.removeEventListener('keydown', eventHandler)
        }
    }, []);
    console.log("CPT renderd");
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
            return;
        }
        intervalT = setInterval(() => {
            status.current = 1;
            showTime()
        }, time + isi);
    }

    const setScoreObjectInfo = () => {
        scoreObj[3].value = arrOfImg.length;
        for (let i = 0; i < scoreObj[3].value; i++) {
            if (arrOfImg[i].targetSample) {
                scoreObj[4].value++;
            }
        }
        scoreObj[6].value = scoreObj[4].value;
    }
    const start = () => {
        setScoreObjectInfo();
        showTime();
        console.log("start");
        handleInterval(finish);
    }
    const showTime = () => {
        if (cnt === arrOfImg.length) {
            clearInterval(intervalT);
            //debugger;
            console.log("fin");
            finish = 1;
            scoreObj[10].value = scoreObj[3].value - scoreObj[4].value -scoreObj[7].value
            props.setScoreTable(scoreObj)
            props.setScoreAvailable(true);
            return;
        }
        setFeedBack(null)
        if (arrOfImg[cnt].imageIndex === 0)
            setImg(fStar)
        else if (arrOfImg[cnt].imageIndex === 1)
            setImg(hStar)
        else if (arrOfImg[cnt].imageIndex === 2)
            setImg(eStar)
        blockStartTimer = Date.now();
        
        
        normalISI = setTimeout(() => { setImg(null) }, time);
        cnt++;
    }

    const checkAnswer = () => {
        let indexNum;
        if (pressKey) {
            answerTime = pressKey - blockStartTimer;
            indexNum = cnt - 1;
            if (arrOfImg[indexNum].targetSample) {
                //console.log("true");
                scoreObj[5].value++;
                scoreObj[6].value--;
                response.push(answerTime);
                sum += answerTime;
                scoreObj[8].value = sum;
                scoreObj[9].value = averaging();
                setFeedBack("درست")
            }
            else{
                //console.log("false");
                scoreObj[7].value++;
                setFeedBack("غلط")
            }
            if (answerTime <= time) {
                clearTimeout(normalISI);
                clearInterval(intervalT);
                setImg(null)
                normalISI = setTimeout(() => {
                    status.current = 1;
                    showTime();
                    handleInterval(finish);
                }, isi)
            }
        }
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