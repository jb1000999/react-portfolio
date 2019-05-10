import React, { Component } from "react";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  constructor() {
    super();

  this.state = {
    pageTitle: "Welcome to my portfolio",
    data: [
      { title: "Quip", category: "eCommerce" },
      { title: "Eventbrite", category: "Scheduling" },
      { title: "Ministry Safe", category: "Enterprise" },
      { title: "SwingAway", category: "eCommerce" }
      ]
    };
    this.handeFilter = this.handeFilter.bind(this);
  }

  handeFilter(filter) {
    this.setState({
      data: this.state.data.filter(item => {
        return item.category === filter;
      })
    })
  }

  portfolioItems() {
    return this.state.data.map(item => {
      return <PortfolioItem title={item.title} url={"google.com"} />;
  });
  }


  render() {
  return (
    <div>
      <h2>{this.state.pageTitle}</h2>

      <button onClick={() => this.handeFilter('eCommerce')}>eCommerce</button>
      <button onClick={() => this.handeFilter('Scheduling')}>Scheduling</button>
      <button onClick={() => this.handeFilter('Enterprise')}>Enterprise</button>


      {this.portfolioItems()}

 
    </div>
  );
  }
}