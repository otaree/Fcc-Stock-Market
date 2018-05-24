import React from 'react';
import { Line } from "react-chartjs-2";
import randomColor from 'randomcolor';

const Chart = props => {
    const labels = props.stocks[0].dates;
    const datasets = props.stocks.map(stock => {
        return {
            data: stock.points,
            label: stock.symbol,
            borderColor: randomColor({
                luminosity: 'dark',
                format: 'rgba'
            })
        }
    });
    const data = { labels,  datasets };
    // const data = {
    //     labels: ['May 22, 17',
    //     'Jun 26, 17',
    //     'Jul 31, 17',
    //     'Sep 1, 17',
    //     'Oct 6, 17',
    //     'Nov 9, 17',
    //     'Dec 14, 17',
    //     'Jan 22, 18',
    //     'Feb 26, 18',
    //     'Apr 2, 18',
    //     'May 4'],
    //     datasets: [{
    //         data: [
    //             151.6328,
    //             143.5879,
    //             146.4533,
    //             162.1732,
    //             153.5233,
    //             173.8679,
    //             170.8618,
    //             175.6041,
    //             178.2826,
    //             166.0398,
    //             183.1239 
    //         ],
    //         label: "AAPL",
    //         backgroundColor: randomColor({
    //             luminosity: 'light',
    //             format: 'rgba',
    //             alpha: 0.5
    //         }),
    //         borderColor: randomColor({
    //             luminosity: 'dark',
    //             format: 'rgba'
    //         })
    //     }, {
    //         data: [
    //             148.24,
    //             153.59,
    //             169.25,
    //             172.02,
    //             172.23,
    //             179.3,
    //             178.39,
    //             185.37,
    //             184.93,
    //             155.39,
    //             176.61
    //         ],
    //         label: "FB",
    //         backgroundColor: randomColor({
    //             luminosity: 'light',
    //             format: 'rgba',
    //             alpha: 0.5
    //         }),
    //         borderColor: randomColor({
    //             luminosity: 'dark',
    //             format: 'rgba'
    //         })
    //     }],
    // };
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