import { toInteger } from 'lodash-es';
import React, { useState, useEffect, useRef } from 'react';
import './Stroop.css'

const Stroop = (props) => {

  const begin = useRef(0);
  const [sample, setSample] = useState({ p: "", color: "" });
  const [timeShow, setTimeShow] = useState([]);
  const [feedback, setFeedback] = useState();
  const [responseTime, setResponseTime] = useState([]);
  const [typeSample, setTypeSample] = useState([]);
  const [trueFalse, setTrueFalse] = useState([]);
  const asciiCode = props.stroop_obj.asciiCode;
  const modeGame = props.stroop_obj.mode === 0 ? "D" : "T";
  let spaces = [];
  let i = 0;
  let tempClear;
  let time = props.stroop_obj.isi + props.stroop_obj.time + props.stroop_obj.fixed;
  let timeFixed;
  let myisi;
  let stroopScoreObj = [
    { name: "زمان نمایش محرک ها", value: props.stroop_obj.time }, //0
    { name: "ISI تایم", value: props.stroop_obj.isi }, //1
    { name: "Fixed تایم", value: props.stroop_obj.fixed },
    { name: "تعداد محرک ها", value: props.stroop_obj.numbers }, //3
    { name: "حالت", value: modeGame }, //4
    { name: "تعداد پاسخ صحیح همخوان", value: 0 },//5
    { name: "مجموع زمان پاسخ به محرک همخوان", value: 0 },//6
    { name: "میانگین زمان پاسخ به محرک همخوان", value: 0 },//7
    { name: "تعداد پاسخ صحیح ناهمخوان", value: 0 },//8
    { name: "مجموع زمان پاسخ به محرک ناهمخوان", value: 0 },//9
    { name: "میانگین زمان پاسخ به محرک ناهمخوان", value: 0 },//10
    { name: "تعداد پاسخ غلط", value: 0 },//11
    { name: "مجموع زمان پاسخ", value: 0 },//12
    { name: "نمره تداخل", value: 0 },//13
    { name: "تعداد خطا در محرک همخوان", value: 0 },//14
    { name: "تعداد بدون پاسخ در محرک همخوان", value: 0 },//15
    { name: "تعداد خطا در محرک ناهمخوان", value: 0 },//16
    { name: "تعداد بدون پاسخ در محرک ناهمخوان", value: 0 },//17
  ]

  useEffect(() => {
    console.log(props.stroop_obj);
    window.addEventListener("keydown", handleKey);
    return () => {

      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  const showSample = () => {
    setSample({ p: props.stroop_obj.arr[i].colorText, color: props.stroop_obj.arr[i].colorCode });
    let timeShowText = Date.now();
    let temp = timeShow;
    temp.push(timeShowText);
    setTimeShow(temp);
    let tempType = typeSample;
    tempType.push(props.stroop_obj.arr[i].type);
    setTypeSample(tempType);
  }

  const showIsi = () => {
    setSample({ p: " ", color: "black" });
    i++;

  }

  const interval = () => {
    if (i < props.stroop_obj.arr.length) {

      setFeedback("");
      setSample({ p: "+", color: "white" });
      timeFixed = Date.now();
      let tempResponse = responseTime;
      let tempResponseTime = props.stroop_obj.time + props.stroop_obj.isi;
      tempResponse.push(tempResponseTime);
      setResponseTime(tempResponse);
      let tempTrueFalse = trueFalse;
      tempTrueFalse.push("none");
      setTrueFalse(tempTrueFalse);
      spaces.push(0);
      setTimeout(showSample, props.stroop_obj.fixed);
      myisi = setTimeout(showIsi, props.stroop_obj.time + props.stroop_obj.fixed)
    }
    else {
      intervalClear();
      computeScore();
      props.setScoreTable(stroopScoreObj)
      props.setScoreAvailable(true);

    }
  }
  const show = () => {
    interval();
    tempClear = setInterval(interval, time);

  }

  const computeScore = () => {
    let numberObject = props.stroop_obj.numbers;
    let congTime = 0;
    let numberCong = 0;
    let incongTime = 0;
    let numberIncong = 0;
    let avgCongTime = 0;
    let avgIncongTime = 0;
    let sumResponse = 0;
    let falseCong = 0;
    let falseIncong = 0;
    let noAnswerCong = 0;
    let noAnswerIncong = 0;
    let interferenceScore = 0;
    let totalFalse = 0;
    let trueCong = 0;
    let trueIncong = 0;
    for (let j = 0; j < numberObject; j++) {
      if (props.stroop_obj.arr[j].type === "C") {
        if (trueFalse[j] === "T") {
          congTime += responseTime[j];
        }
        else if (trueFalse[j] === "F") {
          falseCong++;
        }
        else if (trueFalse[j] === "none") {
          noAnswerCong++;
        }
        numberCong++;

      }
      else {
        if (trueFalse[j] === "T") {
          incongTime += responseTime[j];
        }
        else if (trueFalse[j] === "F") {
          falseIncong++;
        }
        else if (trueFalse[j] === "none") {
          noAnswerIncong++;
        }
        numberIncong++;

      }
    }
    if (congTime) {

      avgCongTime = congTime / numberCong;

    }

    if (incongTime) {

      avgIncongTime = incongTime / numberIncong;

    }


    sumResponse = congTime + incongTime;
    interferenceScore = avgIncongTime - avgCongTime;
    totalFalse = falseCong + falseIncong + noAnswerCong + noAnswerIncong;
    falseIncong += noAnswerIncong;
    falseCong += noAnswerCong;
    trueCong = numberCong - falseCong;
    trueIncong = numberIncong - falseIncong;
    incongTime = incongTime.toFixed(2);
    avgIncongTime = avgIncongTime.toFixed(2);
    sumResponse = sumResponse.toFixed(2);
    congTime = congTime.toFixed(2);
    avgCongTime = avgCongTime.toFixed(2);
    interferenceScore = interferenceScore.toFixed(2);
    stroopScoreObj[5].value = trueCong;
    stroopScoreObj[8].value = trueIncong;
    stroopScoreObj[6].value = congTime;
    stroopScoreObj[7].value = avgCongTime;
    stroopScoreObj[9].value = incongTime;
    stroopScoreObj[10].value = avgIncongTime;
    stroopScoreObj[11].value = totalFalse;
    stroopScoreObj[12].value = sumResponse;
    stroopScoreObj[13].value = interferenceScore;
    stroopScoreObj[14].value = falseCong;
    stroopScoreObj[15].value = noAnswerCong;
    stroopScoreObj[16].value = falseIncong;
    stroopScoreObj[17].value = noAnswerIncong;

  }
  const intervalClear = () => {
    clearInterval(tempClear);

  }
  const handleKey = (event) => {
    if ((!event || event.keyCode === 32) && !begin.current) {
      begin.current = 1;
      show();
      return
    }

    let temp = Date.now();
    let cnt;
    let sw = false;
    if (spaces[spaces.length - 1] === 0)
      if (temp - timeFixed > props.stroop_obj.fixed) {
        for (cnt = 0; cnt < asciiCode.length; cnt++) {

          if (props.stroop_obj.arr[timeShow.length - 1].colorName === asciiCode[cnt].keyName) {

            sw = true;
            break;
          }

        }
        if (sw) {
          temp = Date.now();
          if (event.keyCode === asciiCode[cnt].codeEs || event.keyCode === asciiCode[cnt].codeEc) {
            let tempResponseTime = temp - timeShow[timeShow.length - 1]
            let tempResponse = responseTime;
            let tempTrueFalse = trueFalse;
            tempTrueFalse[tempTrueFalse.length - 1] = "T";
            setTrueFalse(tempTrueFalse);
            tempResponse.push(tempResponseTime);
            setResponseTime(tempResponse);
            spaces[spaces.length - 1] = 1;
            if (modeGame === "D")
              setFeedback("درست")
            if (temp - timeFixed < toInteger(props.stroop_obj.fixed) + toInteger(props.stroop_obj.time)) {
              clearTimeout(myisi);
              showIsi();
              intervalClear();
              setTimeout(() => {
                show();


              }, toInteger(props.stroop_obj.isi))

            }


          }

          else {
            let findKey = false;
            for (let i_ascii = 0; i_ascii < asciiCode.length; i_ascii++)
              if (event.keyCode === asciiCode[i_ascii].codeEs || event.keyCode === asciiCode[i_ascii].codeEc) {
                findKey = true;
                break;
              }
            if (findKey) {
              if (modeGame === "D")
                setFeedback("غلط");
              spaces[spaces.length - 1] = 1;
              let tempResponseTime = temp - timeShow[timeShow.length - 1]
              let tempResponse = responseTime;
              tempResponse.push(tempResponseTime);
              setResponseTime(tempResponse);
              let tempTrueFalse = trueFalse;
              tempTrueFalse[tempTrueFalse.length - 1] = "F";
              setTrueFalse(tempTrueFalse);
              if (temp - timeFixed < props.stroop_obj.fixed + props.stroop_obj.time) {
                clearTimeout(myisi);
                showIsi();
                intervalClear();
                setTimeout(() => {
                  show();

                }, props.stroop_obj.isi)
              }
            }




          }
        }

      }




  }

  if (!begin.current)
    return (
      <div className="start-game" dir="ltr">
        <h1 className="start-text display-1">
          را بزنید space برای شروع
                </h1>
      </div>
    )
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center h-100" style={{ background: 'black' }}>
      <div className="row">
        <h1 style={{ textAlign: "center", fontSize: 100, color: `${sample.color}` }} className="samples">{sample.p}</h1>
      </div>
      {modeGame === "D" ?
        <div className="row justify-content-center d-flex">
          <h1 className="feedback">
            <strong style={{ color: 'white' }}>{feedback}</strong>
          </h1>
        </div> : ""
      }
    </div>
  )


}
export default Stroop;