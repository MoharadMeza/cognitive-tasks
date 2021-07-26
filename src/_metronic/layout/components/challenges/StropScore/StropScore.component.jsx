import scoreGif from '../../images/pngwing.com.png'

const StropScore = (props) => {

    let numberObject = props.typeSample.length;
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
    const computeScore = () => {
        for (let j = 0; j < numberObject; j++) {
            if (props.typeSample[j] == "cong") {
                if (props.trueFalse[j] == "T") {
                    congTime += props.responseTime[j];
                }
                else if (props.trueFalse[j] === "F") {
                    falseCong++;
                }
                else if (props.trueFalse[j] === "none") {
                    noAnswerCong++;
                }
                numberCong++;

            }
            else {
                if (props.trueFalse[j] === "T") {
                    incongTime += props.responseTime[j];
                }
                else if (props.trueFalse[j] === "F") {
                    falseIncong++;
                }
                else if (props.trueFalse[j] === "none") {
                    noAnswerIncong++;
                }
                numberIncong++;

            }
        }
        if (congTime)
            avgCongTime = congTime / numberCong;
        if (incongTime)
            avgIncongTime = incongTime / numberIncong;

        sumResponse = congTime + incongTime;
        interferenceScore = avgIncongTime - avgCongTime;
        totalFalse = falseCong + falseIncong + noAnswerCong + noAnswerIncong;
        falseIncong += noAnswerIncong;
        falseCong += noAnswerCong;
    }

    computeScore();

    return (
        <>
            <div className="container">
                <div className="row ">
                    <div className="col-12 d-flex justify-content-center">
                        <img src={scoreGif} alt="gif" className=" col-12 img-fluid w-25 h-75 d-inline-block mt-5" />
                        <div className=" w-75  tabel_left  mt-5 ml-md-5" >
                            <table className="table  table-bordered text-center">

                                <tbody>
                                    <tr>
                                        <td>
                                            تعداد مجموعه محرک ها
                                        </td>
                                        <td>
                                            {numberObject}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            زمان نمایش متغیر
                                        </td>
                                        <td>
                                            {props.timeT}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            فاصله بین محرک ها
                                        </td>
                                        <td>
                                            {props.timeIsi}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            مجموع پاسخ به محرک های همخوان
                                        </td>
                                        <td>
                                            {congTime}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            میانگین زمان پاسخ به محرک های همخوان
                                        </td>
                                        <td>
                                            {avgCongTime}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            مجموع پاسخ به محرک های ناهمخوان
                                        </td>
                                        <td>
                                            {incongTime}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            میانگین زمان پاسخ به محرک های ناهمخوان
                                        </td>
                                        <td>
                                            {avgIncongTime}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            تعداد پاسخ غلط
                                        </td>
                                        <td>
                                            {totalFalse}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            مجموع زمان پاسخ
                                        </td>
                                        <td>
                                            {sumResponse}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            نمره تداخل
                                        </td>
                                        <td>
                                            <span style={{ direction: "ltr", display: 'inline-block' }}>
                                            {interferenceScore}
                                            </span>
                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            تعداد خطا در محرک همخوان
                                        </td>
                                        <td>
                                            {falseCong}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            تعداد خطا در محرک ناهمخوان
                                        </td>
                                        <td>
                                            {falseIncong}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            تعداد بدون پاسخ همخوان
                                        </td>
                                        <td>
                                            {noAnswerCong}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            تعداد بدون پاسخ ناهمخوان
                                        </td>
                                        <td>
                                            {noAnswerIncong}
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default StropScore;