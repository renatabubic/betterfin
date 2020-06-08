const reducer = (accum, currVal) => accum + currVal;
const filterHelper = (data, categoryName) => {
  let filterData;
  if (categoryName === "other") {
    filterData = data.filter(
      (transaction) =>
        transaction.category !== "Insurance" &&
        transaction.category !== "Utilities" &&
        transaction.category !== "Online Services" &&
        transaction.category !== "Transfers"
    );
  } else {
    filterData = data.filter(
      (transaction) => transaction.category === categoryName
    );
  }
  return mapAndReduceHelper(filterData);
};

const mapAndReduceHelper = (data) => {
  return data.map((transaction) => transaction.amount.amount).reduce(reducer);
};

const nameToLowerCase = (name) => {
  return (
    name.split("").slice(0, 1).join("") +
    name.split("").slice(1).join("").toLowerCase()
  );
};

module.exports = { filterHelper, mapAndReduceHelper, nameToLowerCase };
