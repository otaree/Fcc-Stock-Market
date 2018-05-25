import React from 'react';

const TimeControls = props => {
    return (
        <div className="level">
            <div className="level-item">
                <button className={`button ${props.selected === "onemonth" ? "is-active" : "" }`} onClick={e => props.changeTime("onemonth")} >1m</button>
                <button className={`button ${props.selected === "threemonth" ? "is-active" : "" }`} onClick={e => props.changeTime("threemonth")}>3m</button>
                <button className={`button ${props.selected === "sixmonth" ? "is-active" : "" }`} onClick={e => props.changeTime("sixmonth")}>6m</button>
                <button className={`button ${props.selected === "oneyear" ? "is-active" : "" }`} onClick={e => props.changeTime("oneyear")}>1y</button>
                <button className={`button ${props.selected === "fiveyear" ? "is-active" : "" }`} onClick={e => props.changeTime("fiveyear")}>5y</button>
            </div>
        </div>
    );
};

export default TimeControls;