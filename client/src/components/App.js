import React, { Component } from 'react';
import GoMarkGithub from "react-icons/lib/go/mark-github";

import { socket, fetchData } from "../socket";
import TimeControls from './TimeControls/TimeControls';
import Chart from './Chart/Chart';
import Symbols from './Symbols/Symbols';

export default class App extends Component {
    constructor() {
        super();
        socket.on("SEND_DATA", data => {
            this.setState({
                companies: data.stocksData.map(stock => ({ symbol: stock.symbol, companyName: stock.companyName})),
                stocks: data.stocksData
            });
        });
        socket.on("ERROR", error => {
            console.log("ERROR", error);
        });
    }
    
    state = {
        stocks: [],
        companies: [],
        time: "1m"
    };
    // componentDidMount() {
    //     // fetchData("1m", ["aapl", "fb"]);
    // }

    changeTimeHandler = time => {
        fetchData(time, this.state.companies.map(company => company.symbol ));
        this.setState({ time });
    };

    addSymbolHandler = symbol => {
        if (this.state.companies.length > 0) {
            fetchData(this.state.time, [...this.state.companies.map(company => company.symbol), symbol]);            
        } else { 
            fetchData(this.state.time, [ symbol]);                        
        }
    };

    removeSymbolHandler = symbol => {
        this.setState(prevState => {
            return {
                stocks: prevState.stocks.filter(stock => stock.symbol !== symbol),
                companies: prevState.companies.filter(company => company.symbol !== symbol)
            };
        });
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                   <div className="box has-background-light">
                        <p className="title has-text-centered">stock</p>
                        { this.state.companies.length > 0 && <TimeControls changeTime={this.changeTimeHandler} selected={this.state.time} />}
                        { this.state.stocks.length > 0 && <Chart stocks={this.state.stocks} /> }
                        <Symbols 
                            addSymbol={this.addSymbolHandler}
                            removeSymbol={this.removeSymbolHandler} 
                            companies={this.state.companies} 
                        />
                   </div>
                   <footer className="footer  has-background-white">
                        <div className="level">
                            <div className="level-item" title="@otaree">
                                <a href="https://github.com/otaree/Fcc-nightlife-coordination-app" className="" rel="noopener noreferrer" target="_blank">
                                    <GoMarkGithub
                                        size={30} 
                                        style={{
                                            color: "#888"
                                        }}
                                    />
                                </a>
                            </div>
                        </div>
                   </footer>
                </div>
            </section>
        );
    }
}
