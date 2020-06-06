import React from "react";
import Styles from "../styles/table";
import Transaction from "./Transaction";

function Table(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Transactions",
        columns: [
          {
            Header: "Date",
            accessor: "date",
          },
          {
            Header: "Base Type",
            accessor: "baseType",
          },
          {
            Header: "Type",
            accessor: "type",
          },
          {
            Header: "Category Type",
            accessor: "categoryType",
          },

          {
            Header: "Category ",
            accessor: "category",
          },
          {
            Header: "Amount $USD",
            accessor: "amount.amount",
          },
          {
            Header: "Balance",
            accessor: "runningBalance.amount",
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
        setData(props.transactions.slice(startRow, endRow));
        setPageCount(Math.ceil(props.transactions.length / pageSize));
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

export default Table;
