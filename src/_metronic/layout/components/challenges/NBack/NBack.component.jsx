import React, { useEffect, useState, useRef } from "react";
import Scores from '../Scores/Scores.component'
import './NBack.css'

const NBack = (props) => {
    const begin = useRef(0);
    const status = useRef(0);
    let response = [];
    let sum = 0;
    let cnt = 0;
    let arr = [1, 7, 7, 9, 8, 6, 3, 8, 3, 4, 6, 4, 1, 1, 9, 1, 9, 1, 1, 1, 5, 1, 9, 6, 5, 2, 5, 9, 1, 1, 1, 4, 6, 8, 6, 6, 8, 4, 5, 3, 5, 5, 5, 5, 2, 1, 8, 2, 8, 8, 8, 6, 3, 3, 4, 2, 1, 7, 7, 7, 7, 2, 8, 1, 8, 1, 7, 5, 6, 4, 8, 4, 8, 3, 5]
    let interval, target, t, isi, numberOfStimuli, blockStartTimer, pressKey, answerTime, normalISI, counter;
    let scoreObj = {
        name: "NBack",
        time: 3000,
        isi: 1000,
        n: 2,
        totalNumber: 0,
        allCorrects: 0,
        userCorrects: 0,
        commission: 0,
        ommission: 0,
        totalResponseTime: 0,
        responseAvg: 0
    }


    useEffect(() => {
        scoreObj.t = t = props.NBack_obj.time;
        scoreObj.isi = isi = props.NBack_obj.isi;
        scoreObj.n = target = props.NBack_obj.target;
        if (props.NBack_obj.arr.length)
            arr = props.NBack_obj.arr;
        if (props.NBack_obj.NumberOfStimuli === 0)
            numberOfStimuli = arr.length;
        else
            numberOfStimuli = props.NBack_obj.NumberOfStimuli;

        window.addEventListener('keydown', eventHandler);
        return () => {
            window.removeEventListener('keydown', eventHandler)
        }
    }, []);



    const [number, setNumber] = useState(null);
    const [feedBack, setFeedBack] = useState(null);


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
            el.fireEvent('on'+e.eventType, e);
        }
    }

    const eventHandler = (event) => {
        if (event.keyCode === 32 && !begin.current) {
            begin.current = 1;
            start();
            return
        }
        if (status.current)
            if (event.keyCode === 32) {
                pressKey = Date.now();
                status.current = 0;
                checkAnswer();
            }
    }

    const setArrayeInfo = () => {
        scoreObj.totalNumber = numberOfStimuli;
        for (let i = 0; i < scoreObj.totalNumber - 1; i++) {
            if (arr[i] === arr[i + target]) {
                scoreObj.allCorrects++;
            }
        }
        scoreObj.ommission = scoreObj.allCorrects;
        //setScore(scoreObj);
    }

    const start = () => {
        setArrayeInfo();
        console.log("start");
        showNum();
        if (interval)
            clearInterval(interval);
        interval = setInterval(() => {
            setFeedBack(null)
            status.current = 1;
            showNum()
        }, t + isi);
    }
    const showNum = () => {
        setFeedBack(null)
        setNumber(arr[cnt])
        console.log("show");
        blockStartTimer = Date.now();
        if (cnt === numberOfStimuli) {
            clearInterval(interval);
            console.log("fin");
            props.setScoreTable(scoreObj)
            props.setScoreAvailable(true);
            return;
        }
        normalISI = setTimeout(() => {
            setNumber(null);
            console.log("hide");
        }, t)
        cnt++;
    }
    const checkAnswer = () => {
        let indexNum;
        console.log(pressKey, cnt);
        if (pressKey && cnt > target) {
            answerTime = pressKey - blockStartTimer;
            indexNum = cnt - 1;
            if (arr[indexNum] === arr[indexNum - target]) {
                console.log("true");
                scoreObj.userCorrects++;
                scoreObj.ommission--;
                sum += answerTime;
                scoreObj.totalResponseTime = sum;
                console.log(sum);
                console.log(answerTime);
                response.push(answerTime);
                scoreObj.responseAvg = averaging();
                setFeedBack("درست")
            }
            else {
                console.log("false");
                scoreObj.commission++;
                setFeedBack("غلط")
            }
            if (answerTime <= t) {
                clearTimeout(normalISI);
                clearInterval(interval);
                setNumber(null)
                setTimeout(() => {
                    status.current = 1;
                    showNum()
                    interval = setInterval(() => {
                        status.current = 1;
                        showNum()
                    }, t + isi);
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
                    <button className="start-btn btn btn-info" onClick={()=>{triggerEvent(window , 'keydown' ,32)}}>
                        Space
                    </button>
                </div>

            </div>

        )
    return (
        <div className="container">
            <div className="row justify-content-center d-flex">
                <h1 className="numbers">
                    <strong>{number}</strong>
                </h1>
            </div>
            {!props.NBack_obj.mode ?
                <div className="row justify-content-center d-flex">
                    <h1 className="feedback display-1">
                        <strong>{feedBack}</strong>
                    </h1>
                </div>
                : null
            }
            <div className="d-flex mobile-sapce d-md-none justify-content-center">
                <button className="start-btn btn btn-info" onClick={()=>{triggerEvent(window , 'keydown' , 32)}}>
                    Space
                </button>
            </div>
        </div>
    )
}
export default NBack;