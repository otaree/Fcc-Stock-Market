const axios = require('axios');

const { Stock } = require("../models/Stock");

const getCompanyStockData = async (time, symbol) => {
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
    
    try {
        const response = await axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/${time}?chartInterval=${interval}`);
        
        let parsedData = {
            dates: [],
            points: []
        };

        for (let i = 0; i < response.data.length; i++) {
            parsedData.dates.push(response.data[i].label);
            parsedData.points.push(response.data[i].close);
        }

        return parsedData;
    } catch (e) {
        if (e.response.status && e.response.status === 404) {
            return Promise.reject(e.response.status);
        } else {
            return Promise.reject(500);
        }
    }
};

const getCompanyInfo = async symbol => {
    try {
        const response = await axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/company`)
        return response.data;
    } catch (e) {
        if (e.response.status === 404) {
            return Promise.reject(e.response.status);
        } else {
            return Promise.reject(500);            
        }
    }
};

const getStocks = async () => {
    try {
        const stocks = await Stock.find();
        return stocks;
    } catch (e) {
        return Promise.reject("Server Error");
    }
};


const addStock = async symbol => {
    try {
        let stock = await Stock.findOne({ symbol });

        if (!!stock) {
            throw "Already Added";
        }

        const stocksData = await Promise.all([
            getCompanyInfo(symbol),
            getCompanyStockData("1m", symbol), 
            getCompanyStockData("3m", symbol),
            getCompanyStockData("6m", symbol),
            getCompanyStockData("1y", symbol),
            getCompanyStockData("5y", symbol),
        ]);

        const newStock = new Stock({
            symbol: stocksData[0].symbol,
            name: stocksData[0].companyName,
            onemonth: {
                dates: stocksData[1].dates,
                points: stocksData[1].points
            },
            threemonth: {
                dates: stocksData[2].dates,
                points: stocksData[2].points
            },
            sixmonth: {
                dates: stocksData[3].dates,
                points: stocksData[3].points
            },
            oneyear: {
                dates: stocksData[4].dates,
                points: stocksData[4].points
            },
            fiveyear: {
                dates: stocksData[5].dates,
                points: stocksData[5].points
            }
        });

        stock = await newStock.save();

        return stock;
    } catch (e) {
        if (!isNaN(e) && e === 404) {
            return Promise.reject("Not Found");
        } else if (!isNaN(e) && e === 500) {
            return Promise.reject("Not Found");            
        } else {
            return Promise.reject("Already Added");
        }
        
    }
};

const removeStock = async id => {
    try {
        const stock = await Stock.findByIdAndRemove(id);
        
        if (!stock) throw "Not Found";

        return stock;
    } catch (e) {
        if (e === "Not Found") {
            return Promise.reject("Not Found");
        } else {
            return Promise.reject("Server Error");
        }
    }
};



module.exports = { getStocks, addStock, removeStock, };