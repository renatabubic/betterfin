import React from "react";
import "../App";
import axios from "axios";
import Table from "./Table";

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://betterfin-public.s3.amazonaws.com/data.json";

const unique = (value, index, self) => {
  return self.indexOf(value) === index;
};

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      account: [],
      balances: [],
      transactions: [],
    };
    this.getUniqueValues = this.getUniqueValues.bind(this);
  }
  async componentDidMount() {
    try {
      const res = await axios.get(proxyurl + url);
      const data = res.data;
      this.setState({
        account: data.accounts.account,
        balances: data.balances,
        transactions: data.trxs.transaction,
      });

      this.getUniqueValues();
    } catch (error) {
      console.log(`There was an error loading data. Error code: ${error}`);
    }
  }

  getUniqueValues() {
    const baseTypes = this.state.transactions
      .map((transaction) => transaction.baseType)
      .filter(unique);
    const categoryType = this.state.transactions
      .map((transaction) => transaction.categoryType)
      .filter(unique);
    const category = this.state.transactions
      .map((transaction) => transaction.category)
      .filter(unique);
    const categorySource = this.state.transactions
      .map((transaction) => transaction.categorySource)
      .filter(unique);
    const createdDate = this.state.transactions
      .map((transaction) => transaction.createdDate)
      .filter(unique);
    const lastUpdated = this.state.transactions
      .map((transaction) => transaction.lastUpdated)
      .filter(unique);
    const type = this.state.transactions
      .map((transaction) => transaction.type)
      .filter(unique);
    const subType = this.state.transactions
      .map((transaction) => transaction.subType)
      .filter(unique);
    const sourceType = this.state.transactions
      .map((transaction) => transaction.sourceType)
      .filter(unique);
    const date = this.state.transactions
      .map((transaction) => transaction.date)
      .filter(unique);
    const postDate = this.state.transactions
      .map((transaction) => transaction.postDate)
      .filter(unique);

    // console.log(baseTypes); //
    // console.log(categoryType);
    // console.log(category);
    // console.log(categorySource); //1 unique value: SYSTEM
    // console.log(createdDate); //1 unique value: "2019-06-05T23:09:24Z" --> dummy data all created at the same time. Not useful
    // console.log(lastUpdated); //1 unique value: "2019-06-05T23:09:24Z" --> dummy data all created at the same time & never updated. Not useful
    // console.log(type);
    // console.log(subType);
    // console.log(sourceType); //1 unique value: AGGREGATED
    // console.log(date);
    // console.log(postDate);
  }
  render() {
    const transactions = this.state.transactions;
    return (
      <div className="dashboard">
        <h2>Transactions</h2>
        {/* <div className="single-transaction">
          {transactions.map((transaction) => {
            return (
              <Transaction key={transaction.id} transaction={transaction} />
            );
          })} */}
        {/* </div> */}
        <Table transactions={transactions} />
      </div>
    );
  }
}

export default Dashboard;
