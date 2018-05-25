import React from 'react';
import { Line } from "react-chartjs-2";
import randomColor from 'randomcolor';

const Chart = props => {
    const colors = randomColor({
        count: props.stocks.length,
        hue: "green"
    });
    const labels = props.stocks[0][props.time].dates;
    const datasets = props.stocks.map((stock, index) => {
        return {
            data: stock[props.time].points,
            label: stock.symbol,
            borderColor: colors[index]
        }
    });
    const data = { labels,  datasets };
    return (
        <Line 
            data={data}
            height={80}
            options={{
                tooltips: {
                    mode: 'point'
                }
            }}
        />
    );
};

export default Chart;