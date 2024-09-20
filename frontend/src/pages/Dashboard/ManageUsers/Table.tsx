import React, { useContext, useMemo, useState } from "react";
import { useTable, useSortBy } from "react-table";
import IconButton from "../../../components/ui/IconButton";
import { TbEdit } from "react-icons/tb";
import { StoreUserContext } from "../../../context/StoreUsersContext";

type TableProps = {
  // handleEdit: (user: StoreUsers) => void;
};

export const Table: React.FC<TableProps> = () => {
  const { storeUsers, loading, error } = useContext(StoreUserContext);

  // State to handle search query
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the store users based on the search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return storeUsers;

    return storeUsers.filter((user: any) =>
      user.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, storeUsers]);

  // Define table columns
  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "user.firstName",
        Cell: ({ cell: { value } }) => (
          <div className="truncate" style={{ maxWidth: "200px" }}>
            {value}
          </div>
        ),
      },
      {
        Header: "Last Name",
        accessor: "user.lastName",
        Cell: ({ cell: { value } }) => (
          <div className="truncate" style={{ maxWidth: "200px" }}>
            {value}
          </div>
        ),
      },
      {
        Header: "Email",
        accessor: "user.email",
        Cell: ({ cell: { value } }) => (
          <div className="truncate" style={{ maxWidth: "200px" }}>
            {value}
          </div>
        ),
      },
      {
        Header: "Phone",
        accessor: "user.phone",
        Cell: ({ cell: { value } }) => (
          <div className="truncate" style={{ maxWidth: "200px" }}>
            {value}
          </div>
        ),
      },
      {
        Header: "Action",
        Cell: () => (
          <div className="flex gap-2 w-20 justify-start">
            <IconButton
              icon={<TbEdit size={20} />}
              variant="outlined"
              className="border-primary text-primary"
            />
          </div>
        ),
      },
    ],
    []
  );

  // UseTable hook with useSortBy for sorting functionality
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: filteredUsers || [] }, useSortBy);

  return (
    <div className="w-full">
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {storeUsers && (
        <div className="flex flex-col gap-2 w-full">
          {/* Search input */}
          <form className="h-14 w-full rounded-lg px-2 flex items-center">
            <input
              className="h-full w-full px-4 rounded-lg border"
              placeholder="Search by Name, Email, or Phone..."
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
                      {...column.getHeaderProps(column.getSortByToggleProps())} // Enable sorting on column header click
                    >
                      {column.render("Header")}
                      {/* Add sorting indicators */}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽" // Descending order
                            : " 🔼" // Ascending order
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
                            cell.column.id === "user.firstName" ? "150px" : "auto",
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
