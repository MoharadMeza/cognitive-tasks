import React, { useEffect } from 'react'
import { Link ,useLocation } from "react-router-dom";
import './score.css'
const Scores = (props) => {
    let shapes = [
        {value : 0 , name :  "ستاره توپر"},
        {value : 1 , name : "ستاره نصفه"},
        {value : 2 , name : "ستاره توخالی"},
    ]
    const { pathname } = useLocation();
    const currentRoute = pathname;
    useEffect(() => {
        console.log("Score USE EFFECT");
        props.setStartGame(false);
        return () => {
            console.log("Score Unmount");
        }
    }, [])
    const handleClick = () => {
        props.setScoreAvailable(false)
    }
    const convertTargets = (target) => {
        let targetsName = []
        let targets = shapes.filter((item) => target.includes(item.value))
        targets.map((item) => targetsName.push(item.name))
        console.log(targetsName);
        return targetsName 
    }


    return (
        <div className="container score" dir="ltr">
            <div className="row justify-content-center">
                <div className="col col-12">
                    <table className="table table-hover">
                        <tbody>
                            {
                                props.scoreTable.map((item, index) => {
                                    // if (index === 2) {
                                    //     return (
                                    //         <tr>
                                    //             <td>{convertTargets(item.value).join(" , ")}</td>
                                    //             <td>{item.name}</td>
                                    //         </tr>
                                    //     )
                                    // }
                                    return (
                                        <tr>
                                            <td>{item.value}</td>
                                            <td>{item.name}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table >
                </div>
            </div>

            <div className="row justify-content-center">
                <Link to="/">
                    <button className="btn btn-secondary mt-5" onClick={handleClick}>
                        بازگشت به صفحه اصلی
                    </button>
                </Link>

            </div>
        </div>
    )
}
export default Scores;