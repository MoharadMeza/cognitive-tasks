/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, { useState, useEffect } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { Layout } from "../_metronic/layout";
import BasePage from "./BasePage";
import { Logout, AuthPage } from "./modules/Auth";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";
import Generate from "./Generate";
export function Routes() {
  useEffect(() => {
    console.log("Route USE EFFECT");
    initArr();
  }, []);

  const [scoreTable, setScoreTable] = useState([]);
  const [scoreAvailable, setScoreAvailable] = useState(false);
  console.log("Route renderd", scoreAvailable);
  const [startGame, setStartGame] = useState(false);
  const [NBackModalSetting , setNBackModalSetting] = useState({
        time: 3000,
        isi: 1000,
        numbers : 100,
        n : 1,
        targetPercentage : 25,
        arr: [],
        mode: 0
    });
  const [CPTModalSetting, setCPTModalSetting] = useState({
    time: 3000,
    isi: 1000,
    numbers: 100,
    targetPercentage: 25,
    targets: [0],
    arr: [],
    mode: 0,
  });
  const [stroopModalSetting, setStroopModalSetting] = useState({
    numbers: 100,
    incongPercent: 25,
    fixed: 5000,
    time: 3000,
    isi: 1000,
    mode: 0,
    arr: [],
    asciiCode: [
      { keyName: "red", codeEc: 76, codeEs: 108 },
      { keyName: "blue", codeEc: 75, codeEs: 107 },
      { keyName: "yellow", codeEc: 68, codeEs: 100 },
      { keyName: "green", codeEc: 83, codeEs: 115 }
    ],
    colorArr: [
      { text: "قرمز", color: "red", codeColor: "#B10D0D" },
      { text: "زرد", color: "yellow", codeColor: "#F0E210" },
      { text: "سبز", color: "green", codeColor: "#4CA810" },
      { text: "آبی", color: "blue", codeColor: "#1042F0" },
    ],
  });
  const [gonogoModalSetting, setGonogoModalSetting] = useState({
    time: 2000,
    isi: 1000,
    numbers: 100,
    targetPercentage: 25,
    targets: "ب",
    arr: [],
    mode: 0,
    tempArraySample: "ب|پ|ت|ث",
  });
  const initArr = () => {
    const generateArray = new Generate(100, 25);
    generateArray
      .cpt([1, 2], [0])
      .then((cptOut) => {
        setCPTModalSetting({ ...CPTModalSetting, arr: cptOut });
      })
      .catch((err) => {
        console.log(err);
      });
    generateArray
      .nback([1, 2, 3, 4, 5, 6, 7, 8, 9], 1, 10)
      .then((nbackOut) => {
        setNBackModalSetting({ ...NBackModalSetting, arr: nbackOut });
      })
      .catch((err) => {
        console.log(err);
      });
    generateArray
      .stroop(stroopModalSetting.colorArr)
      .then((stroopOut) => {
        setStroopModalSetting({ ...stroopModalSetting, arr: stroopOut });
      })
      .catch((err) => {
        console.log(err);
      });
    generateArray
      .gonogo(["ب", "ت", "ث"], ["پ"])
      .then((gonogoOut) => {
        setGonogoModalSetting({ ...gonogoModalSetting, arr: gonogoOut });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
    }),
    shallowEqual
  );
  return (
    <Switch>
      {!isAuthorized ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route>
          <AuthPage />
        </Route>
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from="/auth" to="/" />
      )}

      <Route path="/error" component={ErrorsPage} />
      <Route path="/logout" component={Logout} />

      {!isAuthorized ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect to="/auth/login" />
      ) : (
        <Layout>
          <BasePage
            setStartGame={setStartGame}
            startGame={startGame}
            setNBackModalSetting={setNBackModalSetting}
            NBackModalSetting={NBackModalSetting}
            setCPTModalSetting={setCPTModalSetting}
            CPTModalSetting={CPTModalSetting}
            setGonogoModalSetting={setGonogoModalSetting}
            gonogoModalSetting={gonogoModalSetting}
            setStroopModalSetting={setStroopModalSetting}
            stroopModalSetting={stroopModalSetting}
            setScoreTable={setScoreTable}
            scoreTable={scoreTable}
            setScoreAvailable={setScoreAvailable}
            scoreAvailable={scoreAvailable}
          />
        </Layout>
      )}
    </Switch>
  );
}
