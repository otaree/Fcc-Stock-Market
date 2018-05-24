const axios = require('axios');


const getCompanyStockData = async (time, companySymbols) => {
    let interval;
    switch (time) {
        case "1m":
            interval = "2";
            break;
        case "3m":
            interval = "6";
            break;
        case "6m":
            interval = "12";
            break;
        case "1y":
            interval = "24";
            break;
        case "5y":
            interval = "120";
            break;
    }
    const symbols = companySymbols.reduce((acc, value, index) => {
        if (index < companySymbols.length - 1) {
            return acc + value + ",";
        } else {
            return acc + value;
        }
    }, "");

    try {
        const response = await axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=chart,quote&range=${time}&chartInterval=${interval}`);
        if (Object.keys(response.data).length !== companySymbols.length) throw "Not Found";
        
        let parsedData = [];
        for (let symbol in response.data) {
            let stockData = {
                dates: [],
                points: [],
                companyName: response.data[symbol].quote.companyName,
                symbol
            };
            for (let i = 0; i < response.data[symbol].chart.length; i++) {
               stockData.dates.push(response.data[symbol].chart[i].label);
               stockData.points.push(response.data[symbol].chart[i].close);
            }
            parsedData.push(stockData);
        }
        return parsedData;
    } catch (e) {
        if (e === "Not Found") {
            return Promise.reject(e);
        } else {
            return Promise.reject("Server Error");
        }
    } 

};



module.exports = { getCompanyStockData };