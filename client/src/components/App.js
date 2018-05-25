import React, { Component } from 'react';

import { socket, fetchStocks, addStock, removeStock } from "../socket";
import TimeControls from './TimeControls/TimeControls';
import Chart from './Chart/Chart';
import Symbols from './Symbols/Symbols';
import Footer from './Footer/Footer';

export default class App extends Component {
    constructor() {
        super();

        socket.on("STOCKS_DATA", data => {
            this.setState({
                companies: data.stocks.map(stock => ({ symbol: stock.symbol, name: stock.name, _id: stock._id })),
                stocks: data.stocks,
                loading: false                
            });
        });

        socket.on("ADDED_STOCK", data => {
            this.setState(prevState => {
                return {
                    companies: [...prevState.companies, { symbol: data.stock.symbol, name: data.stock.name, _id: data.stock._id }],
                    stocks: [...prevState.stocks, data.stock],
                    adding: !prevState.adding,
                    error: ""
                }
            });            
        });

        socket.on("REMOVED_STOCK", data => {
            this.setState(prevState => {
                return {
                    companies: prevState.companies.filter(company => company._id !== data._id ),
                    stocks: prevState.stocks.filter(stock => stock._id !== data._id)
                };
            });            
        });
        
        socket.on("ERROR", e => {
            this.setState({ error: e.error, adding: false });
        });
    }

    state = {
        stocks: [],
        companies: [],
        time: "onemonth",
        adding: false,
        error: "",
        loading: false
    };

    componentDidMount() {
        fetchStocks();
        this.setState({ loading: true });
    }

    changeTimeHandler = time => {
        this.setState({ time });
    };

    addSymbolHandler = symbol => {
        this.setState(prevState => {
            return {
                adding: !prevState.adding
            };
        });
       addStock(symbol);
    };

    removeSymbolHandler = _id => {
        removeStock(_id);
    }

    render() {
        let stocksChart = (
            <div className="level">
                <div className="level-item">
                    <div className="loader"></div>                      
                </div>
            </div>
        );
        if (!this.state.loading && this.state.stocks.length < 1) {
            stocksChart = <p className="title has-text-centered">No Stock</p>;
        } else if (!this.state.loading && this.state.stocks.length > 0) {
            stocksChart = <Chart stocks={this.state.stocks} time={this.state.time} />;
        }

        return (
            <section className="section">
                <div className="container">
                   <div className="box has-background-light">
                        <p className="title has-text-centered">stock</p>
                        { this.state.companies.length > 0 && <TimeControls changeTime={this.changeTimeHandler} selected={this.state.time} />}
                        { stocksChart }
                        <Symbols 
                            isAdding={this.state.adding}
                            addSymbol={this.addSymbolHandler}
                            removeSymbol={this.removeSymbolHandler} 
                            companies={this.state.companies}
                            error={this.state.error} 
                        />
                   </div>
                   <Footer />
                </div>
            </section>
        );
    }
}
