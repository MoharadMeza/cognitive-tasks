import React, { Suspense, lazy ,useEffect } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { GamePage } from "./pages/GamePage";
import { DashboardPage } from "./pages/DashboardPage";


const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);
const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);

export default function BasePage(props) {
  console.log("BasePage rendered" , props.scoreAvailable);
  useEffect(() => {
    console.log(props.gonogoModalSetting.arr);
    console.log('BasePage USE EFFECT');
  }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }

        <ContentRoute path="/dashboard" exact component={DashboardPage} />
        <ContentRoute path="/cpt">
          <GamePage setStartGame={props.setStartGame} startGame={props.startGame}
           setNBackModalSetting={props.setNBackModalSetting} NBackModalSetting={props.NBackModalSetting}
           setCPTModalSetting={props.setCPTModalSetting} CPTModalSetting={props.CPTModalSetting} gameName={"CPT"}
           setScoreTable={props.setScoreTable} scoreTable={props.scoreTable} setScoreAvailable={props.setScoreAvailable} scoreAvailable={props.scoreAvailable}
           />
        </ContentRoute>
        <ContentRoute path="/n-back">
          <GamePage setStartGame={props.setStartGame} startGame={props.startGame}
           setNBackModalSetting={props.setNBackModalSetting} NBackModalSetting={props.NBackModalSetting}
           setCPTModalSetting={props.setCPTModalSetting} CPTModalSetting={props.CPTModalSetting} gameName={"NBack"}
           setScoreTable={props.setScoreTable} scoreTable={props.scoreTable} setScoreAvailable={props.setScoreAvailable} scoreAvailable={props.scoreAvailable}
           />
        </ContentRoute>
        <ContentRoute path="/stroop">
          <GamePage setStartGame={props.setStartGame} startGame={props.startGame}
           setNBackModalSetting={props.setNBackModalSetting} NBackModalSetting={props.NBackModalSetting}
           setStroopModalSetting={props.setStroopModalSetting} stroopModalSetting={props.stroopModalSetting} gameName={"Stroop"}
           setScoreTable={props.setScoreTable} scoreTable={props.scoreTable} setScoreAvailable={props.setScoreAvailable} scoreAvailable={props.scoreAvailable}
           stroop_defaultArr = {props.stroop_defaultArr}/>
        </ContentRoute>
        <ContentRoute path="/go-nogo">
          <GamePage setStartGame={props.setStartGame} startGame={props.startGame}
           setNBackModalSetting={props.setNBackModalSetting} NBackModalSetting={props.NBackModalSetting}
           setCPTModalSetting={props.setCPTModalSetting} CPTModalSetting={props.CPTModalSetting} gameName={"gonogo"}
           setGonogoModalSetting={props.setGonogoModalSetting} gonogoModalSetting={props.gonogoModalSetting}
           setScoreTable={props.setScoreTable} scoreTable={props.scoreTable} setScoreAvailable={props.setScoreAvailable} scoreAvailable={props.scoreAvailable}
           />
        </ContentRoute>
        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/my-page" component={MyPage} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/e-commerce" component={ECommercePage} />
        <Route path="/user-profile" component={UserProfilepage} />
        {/* <Redirect to="error/error-v1" /> */}
      </Switch>
    </Suspense>
  );
}
