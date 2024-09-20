import React, { useContext, useMemo, useState } from "react";
import { useTable, useSortBy } from "react-table";
import IconButton from "../../../components/ui/IconButton";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { ServiceContext } from "../../../context/ServicesContext";
import { ServiceType } from "./ManageServices";

type TableProps = {
  handleEdit: (service: ServiceType) => void;
  handleDelete: (serviceId: string) => void;
};

export const Table: React.FC<TableProps> = ({ handleEdit, handleDelete }) => {
  const { services, loading, error } = useContext(ServiceContext);

  // State to handle search query
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the services based on the search term
  const filteredServices = useMemo(() => {
    if (!searchTerm) return services;

    return services.filter((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, services]);

  // Define table columns
  const columns = useMemo(
    () => [
      {
        Header: "Service ID",
        accessor: "_id",
        Cell: ({ cell: { value } }) => (
          <div className="truncate" style={{ maxWidth: "150px" }}>
            {value}
          </div>
        ),
      },
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
        Header: "Price",
        accessor: "price",
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
        Header: "Category",
        accessor: "category.name",
        Cell: ({ cell: { value } }) => (
          <div className="truncate" style={{ maxWidth: "100px" }}>
            {value}
          </div>
        ),
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="flex gap-2 w-32 lg:w-20 justify-start">
            <IconButton
              icon={<TbEdit size={20} />}
              variant="outlined"
              className="border-primary text-primary"
              onClick={() => handleEdit(row.original)}
            />
            <IconButton
              icon={<MdDeleteOutline size={20} />}
              variant="outlined"
              className="border-danger text-danger"
              onClick={() => handleDelete(row.original._id!)}
            />
          </div>
        ),
      },
    ],
    [handleEdit, handleDelete]
  );

  // UseTable hook with useSortBy for sorting functionality
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: filteredServices }, useSortBy);

  return (
    <div className="w-full">
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {services && (
        <div className="flex flex-col gap-2 w-full">
          {/* Search input */}
          <form className="h-14 w-full rounded-lg px-2 flex items-center">
            <input
              className="h-full w-full px-4 rounded-lg border"
              placeholder="Search Service Name..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          {/* Table */}
          <table
            className="min-w-full bg-white rounded-lg shadow overflow-hidden"
            {...getTableProps()}
          >
            <thead className="bg-secondary text-primary">
              {headerGroups.map((headerGroup: any) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any) => (
                    <th
                      className="p-5 font-medium text-left cursor-pointer"
                      {...column.getHeaderProps(column.getSortByToggleProps())} // Add sorting props
                    >
                      {column.render("Header")}
                      {/* Add sorting indicators */}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽" // Descending
                            : " 🔼" // Ascending
                          : ""}
                      </span>
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
