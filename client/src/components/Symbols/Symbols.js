import React, { Component } from 'react';

export default class Symbols extends Component {
    state = {
        symbol: ""
    }; 

    changeHandler = e => {
        this.setState({ symbol: e.target.value });
    }

    submitHandler = e => {
        e.preventDefault();
        if (this.state.symbol.trim().length < 1) return;
        const symbols = this.props.companies.map(company => company.symbol.toLowerCase());
        console.log(symbols);
        if (symbols.indexOf(this.state.symbol.toLowerCase()) !== -1) return;                    
        this.props.addSymbol(this.state.symbol);
    }

    render() {
        return (
        <section className="section">
            <div className="columns is-multiline">
                {
                    this.props.companies.map(company => {
                        return (
                            <div key={company.symbol} className="column is-4">
                                <div className="box">
                                    <div className="is-clearfix">
                                        <p className="has-text-weight-bold is-size-4 is-pulled-left">{company.symbol}</p>
                                        <button className="delete is-pulled-right" onClick={e => this.props.removeSymbol(company.symbol) } ></button>                                
                                    </div>
                                    <p>{company.companyName} ({company.symbol}) Prices, Dividends, Splits and Trading Volume</p>
                                </div>
                            </div>
                        );
                    })
                }                   
                    
                <div className="column is-4">
                    <div className="box">
                        <form onSubmit={this.submitHandler}>
                            <p className="subtitle">Syncs in realtime across clients</p>
                            <div className="field has-addons">
                                <div className="control">
                                    <input 
                                        type="text" 
                                        className="input" 
                                        placeholder="Stock Symbol" 
                                        value={this.state.symbol}
                                        onChange={this.changeHandler}
                                    />
                                </div>
                                <div className="control">
                                    <button className="button is-primary">Add</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        );
    }
}