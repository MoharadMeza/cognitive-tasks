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
    useEffect(()=>{
        console.log("Route USE EFFECT");
        initArr();
    },[])
    
    const [scoreTable, setScoreTable] = useState([])
    const [scoreAvailable, setScoreAvailable] = useState(false);
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
    const [CPTModalSetting , setCPTModalSetting] = useState({
        time: 3000,
        isi: 1000,
        numbers : 100,
        targetPercentage : 25,
        targets: [0],
        arr: [],
        mode: 0
    });
    const initArr = ()=>{
        const CPTGenerateArray = new Generate(100 , 25);
        CPTGenerateArray
        .cpt([1, 2], [0])
        .then((cptOut) => {
            setCPTModalSetting({...CPTModalSetting , arr : cptOut})
        })
        .catch((err) => {
            console.log(err);
        });
        
        const NbackGenerateArray = new Generate(100 , 25);
        NbackGenerateArray
        .nback([1,2,3,4,5,6,7,8,9] , 1 , 10)
        .then((nbackOut)=>{
            setNBackModalSetting({...NBackModalSetting , arr : nbackOut})
        })
        .catch((err)=>{
            console.log(err)
        })
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
