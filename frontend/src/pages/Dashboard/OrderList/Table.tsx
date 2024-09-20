import { useContext, useMemo } from "react";
import { useTable } from "react-table";
import IconButton from "../../../components/ui/IconButton";
import { TbEdit } from "react-icons/tb";
import { OrderContext, OrderType } from "../../../context/OrderContext";

type TableProps = {
  handleClick: (order: OrderType) => void;
};

export const Table: React.FC<TableProps> = ({ handleClick }) => {
  const { orders, loading, error } = useContext(OrderContext);

  const columns = useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "_id",
        Cell: ({ cell: { value } }) => (
          <div className="truncate" style={{ maxWidth: "200px" }}>
            {value}
          </div>
        ),
      },
      {
        Header: "User",
        accessor: "userId",
        Cell: ({ cell: { value } }) => (
          <div className="truncate" style={{ maxWidth: "200px" }}>
            {value}
          </div>
        ),
      },
      {
        Header: "Price",
        accessor: "total",
        Cell: ({ cell: { value } }) => (
          <div className="text-left font-medium">
            {new Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "GBP",
            }).format(value)}
          </div>
        ),
      },
      {
        Header: "Quantity",
        accessor: "items.length",
        Cell: ({ cell: { value } }) => (
          <div className="truncate" style={{ maxWidth: "100px" }}>
            {value}
          </div>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <IconButton
            icon={<TbEdit size={20} />}
            variant="outlined"
            className="border-primary text-primary"
            onClick={() => handleClick(row.original)}
          />
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: orders });

  return (
    <div className="w-full">
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {orders && (
        <div className="flex flex-col gap-2 w-full">
          {/* <form
            className="h-14 w-full rounded-lg px-2 flex items-center"
            action=""
          >
            <input
              className="h-full w-full px-4 rounded-lg border"
              placeholder="Search Service Name..."
              type="text"
            />
          </form> */}
          <table
            className="min-w-full bg-white rounded-lg shadow overflow-hidden"
            {...getTableProps()}
          >
            <thead className="bg-secondary text-primary">
              {headerGroups.map((headerGroup: any) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any) => (
                    <th
                      className="p-5 font-medium text-left"
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {rows.map((row: any) => {
                prepareRow(row);
                return (
                  <tr
                    className="hover:bg-myGray cursor-pointer text-center"
                    {...row.getRowProps()}
                  >
                    
                    {row.cells.map((cell: any) => (
                      <td
                        className="p-5 border-b border-myGray truncate"
                        {...cell.getCellProps()}
                        style={{
                          maxWidth:
                            cell.column.id === "name" ? "150px" : "auto",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
