import React, { useEffect, useState, useRef } from "react";
import './NBack.css'

const NBack = (props) => {
    const begin = useRef(0);
    const status = useRef(0);
    let response = [] , arrOfNumbers = [];
    let sum = 0;
    let cnt = 0;
    let n, time, isi, intervalT, blockStartTimer, pressKey, answerTime, normalISI ;
    let scoreObj = [
        {name : "زمان نمایش" , value : 3000}, //0
        {name : "ISI" , value : 1000}, //1
        {name : "n" , value : []}, //2
        {name : "تعداد محرک ها" , value : 0}, //3
        {name : "کل صحیح ها" , value : 0}, //4
        {name : "صحیح های کاربر" , value : 0}, //5
        {name : "خطای حذف" , value : 0}, //6
        {name : "خطای ارتکاب" , value : 0}, //7
        {name : "زمان پاسخ کل" , value : 0}, //8
        {name : "میانگین زمان پاسخ" , value : 0}, //9
    ]

    useEffect(() => {
        scoreObj[0].value = time = props.NBack_obj.time;
        scoreObj[1].value = isi = props.NBack_obj.isi;
        scoreObj[2].value = n = props.NBack_obj.n;
        if (props.NBack_obj.arr.length)
        arrOfNumbers = props.NBack_obj.arr;

        window.addEventListener('keydown', eventHandler);
        return () => {
            props.setStartGame(false)
            window.removeEventListener('keydown', eventHandler)
        }
    }, []);

    console.log(props.NBack_obj);


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

    const handleInterval = ()=>{
        intervalT = setInterval(() => {
            status.current = 1;
            showNum()
        }, time + isi);
    }

    const setArrayeInfo = () => {
        scoreObj[3].value = arrOfNumbers.length;
        for (let i = 0; i < scoreObj[3].value - 1; i++) {
            if (arrOfNumbers[i].targetSample) {
                scoreObj[4].value++;
            }
        }
        scoreObj[6].value = scoreObj[4].value;
    }

    const start = () => {
        setArrayeInfo();
        showNum();
        console.log("start");
        handleInterval();
    }
    const showNum = () => {
        if (cnt === arrOfNumbers.length) {
            clearInterval(intervalT);
            console.log("fin");
            props.setScoreTable(scoreObj)
            props.setScoreAvailable(true);
            return;
        }
        setFeedBack(null)
        setNumber(arrOfNumbers[cnt].text)
        console.log("show");
        blockStartTimer = Date.now();
        normalISI = setTimeout(() => {setNumber(null)}, time)
        cnt++;
    }
    const checkAnswer = () => {
        let indexNum;
        if (pressKey && cnt > n) {
            answerTime = pressKey - blockStartTimer;
            indexNum = cnt - 1;
            if (arrOfNumbers[indexNum].targetSample) {
                scoreObj[5].value++;
                scoreObj[6].value--;
                response.push(answerTime);
                sum += answerTime;
                scoreObj[8].value = sum;
                scoreObj[9].value = averaging();
                setFeedBack("درست")
            }
            else {
                scoreObj[7].value++;
                setFeedBack("غلط")
            }
            if (answerTime <= time) {
                clearTimeout(normalISI);
                clearInterval(intervalT);
                setNumber(null)
                normalISI = setTimeout(() => {
                    status.current = 1;
                    showNum()
                    handleInterval()
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
                <h1 className="start-text display-1 text-center">
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