import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import "../Game/testcomponent.style.css";
const Gonogo = (props) => {
  const refResponse = useRef([]);
  const refSumResponseTime = useRef(0);
  const refAverageCorrectResponseTime = useRef(0);
  const refTargets = useRef([]);
  const refResults = useRef([]);
  const refReactions = useRef([]);
  const [currentTarget, setCurrentTarget] = useState("");
  const [spaces, setSpaces] = useState([]);
  const [feedback, setFeedback] = useState("");
  const refCount = useRef(-1);
  const refStartTrial = useRef(null);
  let totalInCorrect = 0;
  const [clickButton, setClickButton] = useState([]);
  const [totalCorrect, setTotalCorrect] = useState([]);
  const [correctdeterrent, setCorrectDeterrent] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [ommition, setOmmition] = useState([]);
  const [commition, setCommition] = useState([]);
  const refStetimeFaideShow = useRef();
  const refStetimeShow = useRef();
  let dataScore = [
    { name: "تعداد محرک‌ها", value: props.gonogoModalSetting.numbers },
    { name: "زمان نمایش محرک‌ها", value: props.gonogoModalSetting.time },
    { name: "زمان بین محرک‌ها", value: props.gonogoModalSetting.isi },
    { name: " تعداد کل محرک هدف", value: 0 },
    { name: "تعداد کل محرک غیر هدف", value: 0 },
    { name: "بازداری صحیح", value: 0 },
    { name: "پاسخ صحیح", value: 0 },
    { name: "زمان پاسخ صحیح", value: 0 },
    { name: "میانگین زمان پاسخ صحیح", value: 0 },
    { name: "خطای حذف(ommition)", value: 0 },
    { name: "خطای ارتکاب(commition)", value: 0 },
  ];
  useEffect(() => {
    updateValueTest();
    window.addEventListener("keypress", startBySpace);
    window.addEventListener("keypress", handleKeyPress);
    return()=>{
      props.setStartGame(false)
    }
  }, []);
  const startBySpace = (event) => {
    if (!event || event.code === "Space") {
      const dateButton = Date.now();
      const tempclickButton = clickButton;
      tempclickButton.push(dateButton);
      setClickButton(tempclickButton);
      if (clickButton.length === 1) {
        start(refCount.current);
      }
    }
  };

  const updateValueTest = () => {
    for (const iterator of props.gonogoModalSetting.arr) {
      refResponse.current.push(
        props.gonogoModalSetting.time + props.gonogoModalSetting.isi
      );
      refResults.current.push(false);
      refReactions.current.push(false);
      console.log(props.gonogoModalSetting.arr);
      iterator.targetSample
        ? refTargets.current.push(0)
        : refTargets.current.push(1);
    }
  };

  const start = (cnt) => {
    setFeedback("");
    refCount.current = cnt;
    refStartTrial.current = Date.now();
    console.log(props.gonogoModalSetting.arr[cnt]);
    setCurrentTarget(props.gonogoModalSetting.arr[cnt]);
    refStetimeFaideShow.current = setTimeout(() => {
      setCurrentTarget("");
    }, props.gonogoModalSetting.time);
    if (cnt < props.gonogoModalSetting.arr.length - 1) {
      refStetimeShow.current = setTimeout(() => {
        start(cnt + 1);
      }, props.gonogoModalSetting.time + props.gonogoModalSetting.isi);
    } else {
      showResult();
      window.removeEventListener("keypress", handleKeyPress);
    }
  };
  const handleEvent = () => {
    let timeSpace = Date.now();
    if (
      refResponse.current[refCount.current] ===
      props.gonogoModalSetting.time + props.gonogoModalSetting.isi
    ) {
      let tempSpaces = spaces;
      tempSpaces.push(timeSpace);
      setSpaces(tempSpaces);
      refResponse.current[refCount.current] = timeSpace - refStartTrial.current;
      if (
        refResponse.current[refCount.current] < props.gonogoModalSetting.time
      ) {
        clearTimeout(refStetimeFaideShow.current);
        clearTimeout(refStetimeShow.current);
        setCurrentTarget("");
        if (refCount.current <= props.gonogoModalSetting.arr.length) {
          setTimeout(() => {
            start(refCount.current + 1);
          }, props.gonogoModalSetting.isi);
        }
        if (props.gonogoModalSetting.mode === 0) {
          handleFeedback();
        }
      } else {
        if (props.gonogoModalSetting.mode === 0) {
          handleFeedback();
        }
      }
    }
    refReactions.current[refCount.current] = true;
  };
  const handleKeyPress = (event) => {
    if (event.code === "Space") {
      handleEvent();
    }
  };
  const handleClickButton = () => {
    handleEvent();
  };
  const handleFeedback = () => {
    if (props.gonogoModalSetting.arr[refCount.current].targetSample) {
      setFeedback(true);
    } else {
      setFeedback(false);
    }
  };

  const showResult = () => {
    for (let index = 0; index < props.gonogoModalSetting.arr.length; index++) {
      if (
        refTargets.current[index] === 0 &&
        refReactions.current[index] === true &&
        props.gonogoModalSetting.arr[index] !== null
      ) {
        refResults.current[index] = "A";
        let tempCorrect = correct;
        tempCorrect.push(index);
        setCorrect(tempCorrect);
      }
      if (
        refTargets.current[index] === 1 &&
        refReactions.current[index] === false &&
        props.gonogoModalSetting.arr[index] !== null
      ) {
        refResults.current[index] = "B";
      }
      if (
        refTargets.current[index] === 1 &&
        refReactions.current[index] === true &&
        props.gonogoModalSetting.arr[index] !== null
      ) {
        refResults.current[index] = "C";
      }
      if (
        refTargets.current[index] === 0 &&
        refReactions.current[index] === false &&
        props.gonogoModalSetting.arr[index] !== null
      ) {
        refResults.current[index] = "D";
      }
    }
    for (let index = 0; index < refResults.current.length; index++) {
      if (
        refResults.current[index] === "B" &&
        props.gonogoModalSetting.arr[index] !== null
      ) {
        let tempCorrectDeterrent = correctdeterrent;
        tempCorrectDeterrent.push(index);
        setCorrectDeterrent(tempCorrectDeterrent);
      }
      if (
        refResults.current[index] === "D" &&
        props.gonogoModalSetting.arr[index] !== null
      ) {
        let tempOmmition = ommition;
        tempOmmition.push(index);
        setOmmition(tempOmmition);
      }
      if (
        refResults.current[index] === "C" &&
        props.gonogoModalSetting.arr[index] !== null
      ) {
        let tempCommition = commition;
        tempCommition.push(index);
        setCommition(tempCommition);
      }
      if (
        refResults.current[index] === "A" ||
        (refResults.current[index] === "D" &&
          props.gonogoModalSetting.arr[index] !== null)
      ) {
        let tempTotalCorrect = totalCorrect;
        tempTotalCorrect.push(index);
        setTotalCorrect(tempTotalCorrect);
      }
    }
    let SumCorrectResponseTime = correct.map((item) => {
      return refResponse.current[item];
    });
    refSumResponseTime.current = SumCorrectResponseTime.reduce(
      (a, b) => a + b,
      0
    );
    if (correct.length !== 0) {
      refAverageCorrectResponseTime.current =
        refSumResponseTime.current / correct.length;
    }
    console.log(refTargets.current);
    console.log(refReactions.current);
    console.log(refResults.current);

    totalInCorrect = props.gonogoModalSetting.arr.length - totalCorrect.length;
    dataScore[3].value = totalCorrect.length;
    dataScore[4].value = totalInCorrect;
    dataScore[5].value = correctdeterrent.length;
    dataScore[6].value = correct.length;
    dataScore[7].value = refSumResponseTime.current;
    dataScore[8].value = refAverageCorrectResponseTime.current;
    dataScore[9].value = ommition.length;
    dataScore[10].value = commition.length;
    props.setScoreTable(dataScore);
    props.setScoreAvailable(true);
  };

  return (
    <>
      {refCount.current === -1 ? (
        <>
          <div className="container">
            <div className="row  featureRow d-flex flex-column align-items-center">
              <div className="col-8 mt-5 d-flex justify-content-center">
                <div className="featurejumbotron">
                  <div className="container">
                    <div className="fontfa">
                      <p
                        className="text col-12 d-flex justify-content-center contentInDesktop"
                        style={{
                          marginTop: "2rem",
                        }}
                      >
                        با زدن اسپیس بازی را شروع کنید
                      </p>
                      <Button
                        id="buttons"
                        variant="primary"
                        className=" col-12 px-1 py-4 mt-5 d-md-none  buttonInStart"
                        onClick={() => startBySpace()}
                      >
                        کلیک کنید
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : refCount.current > -1 &&
        refCount.current <= props.gonogoModalSetting.arr.length - 1 ? (
        <>
          <Button
            id="buttons"
            variant="primary"
            className="col-4 btn fontfa d-md-none"
            onClick={handleClickButton}
          >
            کلیک کنید
          </Button>
          <section className="sectionShowNumber">
            <div className="container">
              <div className="row d-flex flex-column align-items-center">
                <div className="col-8 d-flex justify-content-center">
                  <div className="featurejumbotron">
                    <div className="container">
                      <div className="fontfa">
                        <p className="text d-flex showNumber justify-content-center">
                          {currentTarget.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="showFeedback">
            <div className="container d-flex flex-column align-items-center justify-content-center">
              <div className="row">
                <div className="fontfa  alignFeedback">
                  {feedback === true ? (
                    <>
                      <p className="showNumber">درست</p>
                    </>
                  ) : feedback === false ? (
                    <>
                      <p className="showNumber">غلط</p>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </>
  );
};

export default Gonogo;
