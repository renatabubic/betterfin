import React from "react";
import Styles from "../styles/table";
import Transaction from "./Transaction";

function Table(props) {
  // const data = props.transactions
  const columns = React.useMemo(
    () => [
      {
        Header: "Transactions",
        columns: [
          {
            Header: "Base Type",
            accessor: "baseType",
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
            Header: "Type",
            accessor: "type",
          },
          {
            Header: "Date",
            accessor: "date",
          },
        ],
      },
    ],
    []
  );

  // We'll start our table without any data
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;

    // Set the loading state
    setLoading(true);

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        setData(props.transactions.slice(startRow, endRow));

        // Your server could send back total page count.
        // For now we'll just fake it, too
        setPageCount(Math.ceil(props.transactions.length / pageSize));

        setLoading(false);
      }
    }, 1000);
  }, []);

  return (
    <Styles>
      <Transaction
        columns={columns}
        data={props.transactions}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
      />
    </Styles>
  );
}

export default Table;
