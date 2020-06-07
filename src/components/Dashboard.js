import React from "react";
import "../App";
import axios from "axios";
import CreditTable from "./CreditTable";
import DebitTable from "./DebitTable";
import { proxyurl, url } from "../secrets";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      account: [],
      lenderScore: 3.25,
      currBalance: 0,
      balances: [],
      transactions: [],
    };
  }
  async componentDidMount() {
    try {
      const res = await axios.get(proxyurl + url);
      const data = res.data;
      let firstName =
        data.accounts.account[0].displayedName
          .split(" ")[0]
          .split("")
          .slice(0, 1)
          .join("") +
        data.accounts.account[0].displayedName
          .split(" ")[0]
          .split("")
          .slice(1)
          .join("")
          .toLowerCase();
      let lastName = data.accounts.account[0].displayedName.split(" ")[1];
      this.setState({
        firstName,
        lastName,
        account: data.accounts.account[0],
        currBalance: data.accounts.account[0].balance.amount,
        balances: data.balances,
        transactions: data.trxs.transaction,
      });
    } catch (error) {
      console.log(`There was an error loading data. Error code: ${error}`);
    }
  }

  render() {
    const transactions = this.state.transactions;
    const account = this.state.account;
    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <div className="account-holder-info-container">
            <h2>Hi, {this.state.firstName}</h2>
            <div className="account-info-container">
              <p>
                Information regarding your account with:
                <select className="account-select-input">
                  <option> {account.accountName} </option>
                </select>
              </p>
              <ul>
                <li>Type: {account.accountType}</li>
                <li>Account number ending in: {account.accountNumber}</li>
                <li>Current Balance: ${this.state.currBalance}</li>
              </ul>
            </div>
          </div>
          <div></div>
          <div className="lender-scorecard">
            <div className="lender-scorecard-inner">
              <div>
                <p className="text-1">YOUR</p>
                <p className="text-1">LENDER SCORE</p>
                <p id="score">{this.state.lenderScore}</p>
              </div>
              <div className="text-2-container">
                <p className="text-2">out</p>
                <p className="text-2"> of 5</p>
              </div>
            </div>
            <button
              onClick={() => console.log("Sends user to analytical tool")}
            >
              Learn how to improve your score
            </button>
          </div>
        </div>
        <div></div>
        <div className="table-container">
          <CreditTable transactions={transactions} />
          <DebitTable transactions={transactions} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
