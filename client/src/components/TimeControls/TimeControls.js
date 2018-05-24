import React from 'react';

const TimeControls = props => {
    return (
        <div className="level">
            <div className="level-item">
                <button className={`button ${props.selected === "1m" && "is-active"}`} onClick={e => props.changeTime("1m")} >1m</button>
                <button className={`button ${props.selected === "3m" && "is-active"}`} onClick={e => props.changeTime("3m")}>3m</button>
                <button className={`button ${props.selected === "6m" && "is-active"}`} onClick={e => props.changeTime("6m")}>6m</button>
                <button className={`button ${props.selected === "1y" && "is-active"}`} onClick={e => props.changeTime("1y")}>1y</button>
                <button className={`button ${props.selected === "5y" && "is-active"}`} onClick={e => props.changeTime("5y")}>5y</button>
            </div>
        </div>
    );
};

export default TimeControls;