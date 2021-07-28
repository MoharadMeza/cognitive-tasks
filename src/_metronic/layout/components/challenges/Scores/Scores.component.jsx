import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import './score.css'
const Scores = (props) => {
    useEffect(() => {
        console.log("Score USE EFFECT");
        props.setStartGame(false);
        return()=>{
            console.log("Score Unmount");
        }
    } ,[])
    console.log("Score renderd");
    const handleClick = () => {
        props.setScoreAvailable(false)
    }
    return (
        <div className="container score" dir="ltr">
            <div className="row justify-content-center">
                <div className="col col-12">
                    <table className="table table-hover">
                        <tbody>
                            {
                                props.scoreTable.map((item)=>{
                                    return(
                                        <tr>
                                            <td>{item.value}</td>
                                            <td>{item.name}</td>
                                        </tr>
                                    )
                                })
                            }
                            {/* <tr>
                                <td>{props.scoreTable.time}</td>
                                <td>زمان نمایش</td>
                            </tr>
                            <tr>
                                <td>{props.scoreTable.isi}</td>
                                <td>ISI</td>
                            </tr>
                            <tr>
                                {props.scoreTable.n ? <td>{props.scoreTable.n}</td> : null}
                                {props.scoreTable.target[0] === 0 && <td>ستاره توپر</td>}
                                {props.scoreTable.target[0] === 1 && <td>ستاره نیمه پر</td>}
                                {props.scoreTable.target[0] === 2 && <td>ستاره تو خالی</td>}
                                {props.scoreTable.n ? <td>n</td> : <td>هدف</td>}
                            </tr>
                            <tr>
                                <td>{props.scoreTable.totalNumber}</td>
                                <td>کل اعداد</td>
                            </tr>
                            <tr>
                                {(props.scoreTable.name === "CPT") ? <td>{props.scoreTable.totalNumber - props.scoreTable.allCorrects - props.scoreTable.commission}</td>
                                    : null}
                                {(props.scoreTable.name === "CPT") ? <td>بازداری صحیح</td> : null}
                            </tr>
                            <tr>
                                <td>{props.scoreTable.allCorrects}</td>
                                <td>مجموع صحیح ها</td>
                            </tr>
                            <tr>
                                <td>{props.scoreTable.userCorrects}</td>
                                <td>تعداد پاسخ صحیح</td>
                            </tr>
                            <tr>
                                <td>{props.scoreTable.commission}</td>
                                <td> خطای ارتکاب (Commission)</td>
                            </tr>
                            <tr>
                                <td>{props.scoreTable.ommission}</td>
                                <td>خطای حذف (Ommission)</td>
                            </tr>
                            <tr>
                                <td>{props.scoreTable.totalResponseTime}</td>
                                <td>زمان پاسخ صحیح</td>
                            </tr>
                            <tr>
                                <td>{props.scoreTable.responseAvg}</td>
                                <td>میانگین زمان پاسخ</td>
                            </tr> */}
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