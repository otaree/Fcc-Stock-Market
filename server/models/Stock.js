const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    onemonth: {
        dates: {
            type: Array
        },
        points: {
            type: Array
        }
    },
    threemonth: {
        dates: {
            type: Array
        },
        points: {
            type: Array
        }
    },
    sixmonth: {
        dates: {
            type: Array
        },
        points: {
            type: Array
        }
    },
    oneyear: {
        dates: {
            type: Array
        },
        points: {
            type: Array
        }
    },
    fiveyear: {
        dates: {
            type: Array
        },
        points: {
            type: Array
        }
    }
});

const Stock = mongoose.model("Stock", StockSchema);

module.exports = {
    Stock
};