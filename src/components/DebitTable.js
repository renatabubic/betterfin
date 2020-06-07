import React from "react";
import Styles from "../styles/table";
import Transaction from "./Transaction";

function CreditTable(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Debit Transaction Details",
        columns: [
          {
            Header: "Date",
            accessor: "date",
          },
          {
            Header: "Category ",
            accessor: "category",
          },
          {
            Header: "Amount $USD",
            accessor: "amount.amount",
            disableFilters: true,
          },
          {
            Header: "Balance",
            accessor: "runningBalance.amount",
            disableFilters: true,
          },
        ],
      },
    ],
    []
  );

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  // This will get called when the table needs new data
  const fetchData = React.useCallback(
    ({ pageSize, pageIndex }) => {
      const fetchId = ++fetchIdRef.current;
      // Set the loading state
      setLoading(true);

      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;

        let data = props.transactions;
        let filteredData = data.filter(
          (transaction) => transaction.baseType === "DEBIT"
        );
        setData(filteredData);
        // setPageCount(Math.ceil(filteredData.length / pageSize));
        setLoading(false);
      }
    },
    [props.transactions]
  );

  return (
    <Styles>
      <Transaction
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
      />
    </Styles>
  );
}

export default CreditTable;
