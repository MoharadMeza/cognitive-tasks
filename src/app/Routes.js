/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, { useState , useEffect } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { Layout } from "../_metronic/layout";
import BasePage from "./BasePage";
import { Logout, AuthPage } from "./modules/Auth";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";
import Generate from './Generate'

export function Routes() {
    let index , target;
    let NBack_defaultArr = [];
    useEffect(()=>{
        initArr();
    },[])

    const [scoreTable, setScoreTable] = useState({})
    const [scoreAvailable, setScoreAvailable] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [NBackModalSetting , setNBackModalSetting] = useState({
        time: 3000,
        isi: 1000,
        target: 1,
        NumberOfStimuli: 0,
        arr: [],
        mode: 0
    });
    const [CPTModalSetting , setCPTModalSetting] = useState({
        time: 3000,
        isi: 1000,
        numbers : 100,
        targetPercentage : 25,
        targets: [0],
        arr: [],
        mode: 0
    });
    console.log("Route");
    const initArr = ()=>{
        const generateArray = new Generate(100 , 25);
        generateArray
        .cpt([1, 2], [0])
        .then((cptOut) => {
            console.log("success");
        })
        .catch((err) => {
            console.log(err);
        });
        setCPTModalSetting({...CPTModalSetting , arr : generateArray.outSamples})
    }
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
                    <BasePage setStartGame={setStartGame} startGame={startGame}
                     setNBackModalSetting={setNBackModalSetting} NBackModalSetting={NBackModalSetting}
                     setCPTModalSetting={setCPTModalSetting} CPTModalSetting={CPTModalSetting} 
                     setScoreTable={setScoreTable} scoreTable={scoreTable} setScoreAvailable={setScoreAvailable} scoreAvailable={scoreAvailable}/>
                </Layout>
            )}
        </Switch>
    );
}
