import React from "react";
import "../App";
import axios from "axios";
import CreditTable from "./Tables/CreditTable";
import DebitTable from "./Tables/DebitTable";
import { proxyurl, url } from "../secrets";
import DebitChart from "./Charts/DebitChart";
import CreditChart from "./Charts/CreditChart";
import MonthlyGraph from "./Graphs/MonthlyGraph";
import DailyGraph from "./Graphs/DailyGraph";
import {
  filterHelper,
  mapAndReduceHelper,
  nameToLowerCase,
} from "../helperFunctions";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      account: [],
      lenderScore: 3.25,
      currBalance: 0,
      chartToggle: "day",
      monthlyBalance: {
        months: [],
        values: [],
      },
      dailyBalance: {
        dates: [],
        values: [],
      },
      transactions: [],
      debitAmount: {
        all: 0,
        insurance: 0,
        onlineServices: 0,
        other: 0,
        transfers: 0,
        utilities: 0,
      },
      creditAmount: {
        refunds: 0,
        salary: 0,
      },
    };
    this.getDebitAmounts = this.getDebitAmounts.bind(this);
    this.getCreditAmounts = this.getCreditAmounts.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  async componentDidMount() {
    try {
      const res = await axios.get(proxyurl + url);
      const data = res.data;
      this.getDebitAmounts(data);
      this.getCreditAmounts(data);
      let firstName = nameToLowerCase(
        data.accounts.account[0].displayedName.split(" ")[0]
      );
      this.setState({
        firstName,
        account: data.accounts.account[0],
        currBalance: data.accounts.account[0].balance.amount,
        dailyBalance: {
          dates: data.balances[0].daily_labels,
          values: data.balances[0].daily_values,
        },
        monthlyBalance: {
          months: data.balances[0].month_labels,
          values: data.balances[0].month_average_values,
        },
        transactions: data.trxs.transaction,
      });
    } catch (error) {
      console.log(`There was an error loading data. Error code: ${error}`);
    }
  }

  getDebitAmounts(data) {
    const debitData = data.trxs.transaction.filter(
      (transaction) => transaction.baseType === "DEBIT"
    );

    const all = mapAndReduceHelper(debitData);
    const other = filterHelper(debitData, "other");
    const utilities = filterHelper(debitData, "Utilities");
    const onlineServices = filterHelper(debitData, "Online Services");
    const transfers = filterHelper(debitData, "Transfers");
    const insurance = filterHelper(debitData, "Insurance");

    this.setState({
      debitAmount: {
        all,
        other,
        utilities,
        onlineServices,
        transfers,
        insurance,
      },
    });
  }

  getCreditAmounts(data) {
    const creditData = data.trxs.transaction.filter(
      (transaction) => transaction.baseType === "CREDIT"
    );
    const all = mapAndReduceHelper(creditData);
    const refunds = filterHelper(creditData, "Refunds/Adjustments");
    const salary = filterHelper(creditData, "Paychecks/Salary");
    this.setState({
      creditAmount: { all, refunds, salary },
    });
  }

  handleChange(event) {
    this.setState({ chartToggle: event.target.value });
  }

  render() {
    const transactions = this.state.transactions;
    const account = this.state.account;
    return (
      <div className="dashboard">
        <div className="side-panel">side panel</div>
        <div>
          <div className="dashboard-container">
            <div className="account-holder-info-container">
              <h2>Hi, {this.state.firstName}</h2>
              <div className="account-info-container">
                <p>
                  Information regarding your account with:
                  <select
                    className="account-select-input"
                    style={{ padding: 10, fontSize: 16, fontWeight: "bold" }}
                  >
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
                className="button"
                onClick={() => console.log("Sends user to analytical tool")}
              >
                Learn how to improve your score
              </button>
            </div>
          </div>
          <div className="graph-container">
            <select
              onChange={this.handleChange}
              className="graph-select-input"
              style={{
                padding: 10,
                margin: 15,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              <option value={"day"}> By Day </option>
              <option value={"month"}> By Month </option>
            </select>
            {this.state.chartToggle === "day" ? (
              <DailyGraph balances={this.state.dailyBalance} />
            ) : (
              <MonthlyGraph balances={this.state.monthlyBalance} />
            )}
          </div>
          <div className="chart-container">
            <CreditChart creditAmount={this.state.creditAmount} />
            <div className="side-panel">side panel</div>
            <DebitChart debitAmount={this.state.debitAmount} />
          </div>
          <div className="table-container">
            <CreditTable transactions={transactions} />
            <div></div>
            <DebitTable transactions={transactions} />
          </div>
        </div>
        <div className="side-panel">
          <button
            className="button"
            onClick={() =>
              console.log(
                "Sends user to a page where they can set financial goals for themselves"
              )
            }
          >
            Set Goals
          </button>
          <button
            className="button"
            onClick={() =>
              console.log(
                "Sends user to a page to book time with a financial advisor."
              )
            }
          >
            Speak to an Advisor
          </button>
          <button
            className="button"
            style={{ fontSize: 11.5 }}
            onClick={() => console.log("Sends user to an application.")}
          >
            Compare or Apply for a Loan
          </button>
        </div>
      </div>
    );
  }
}

export default Dashboard;
