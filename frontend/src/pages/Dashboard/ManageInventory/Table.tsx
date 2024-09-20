import React, { useMemo } from "react";
import { useTable } from "react-table";
import IconButton from "../../../components/ui/IconButton";
import { TbEdit } from "react-icons/tb";

type TableProps = {
  handleEdit: (product: any) => void;
  products: any;
  loading: boolean;
  error: any;
  services: any;
  serviceLoading: boolean;
  serviceError: any;
  selectedType: string;
};

export const Table: React.FC<TableProps> = ({
  handleEdit,
  products,
  loading,
  error,
  services,
  // serviceLoading,
  // serviceError,
  selectedType,
}) => {
  console.log(products);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell: { value } }) => (
          <div className="truncate" style={{ maxWidth: "200px" }}>
            {value}
          </div>
        ),
      },
      {
        Header: "Category",
        accessor: (row) => row.category?.name,
        Cell: ({ cell: { value } }) => (
          <div className="truncate" style={{ maxWidth: "200px" }}>
            {value ? value : <p className="text-gray-400">Unassigned</p>}
          </div>
        ),
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ cell: { value } }) => (
          <div className="truncate" style={{ maxWidth: "200px" }}>
            £{value}
          </div>
        ),
      },
      {
        Header: selectedType === "Products" ? "Stock" : "Duration",
        accessor: selectedType === "Products" ? "stock" : "duration",
        Cell: ({ cell: { value } }) =>
          selectedType === "Products" ? (
            <div className="truncate" style={{ maxWidth: "200px" }}>
              {value} {value && value > 1 ? "Units" : "Unit"}
            </div>
          ) : (
            <div className="truncate" style={{ maxWidth: "200px" }}>
              {value} {value && value > 1 ? "hours" : "hour"}
            </div>
          ),
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="flex gap-2 w-20 justify-start">
            <IconButton
              icon={<TbEdit size={20} />}
              variant="outlined"
              className="border-primary text-primary"
              onClick={() => handleEdit(row.original)}
            />
          </div>
        ),
      },
    ],
    [handleEdit, selectedType]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: selectedType === "Products" ? products : services || [],
    });


  return (
    <div className="w-full">
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {products && (
        <div className="flex flex-col gap-2 w-full">
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
                    className="hover:bg-myGray cursor-pointer"
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
