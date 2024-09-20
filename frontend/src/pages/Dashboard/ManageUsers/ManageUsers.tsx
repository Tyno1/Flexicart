import React, { useContext } from "react";
import { StoreUserContext } from "../../../context/StoreUsersContext";
import { Table } from "./Table";
import Button from "../../../components/ui/Button";

const ManageUsers: React.FC = () => {
  const { loading, storeUsers } = useContext(StoreUserContext);

  if (loading) {
    <div className="p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center justify-center">
      Loading...
    </div>;
  }

  return (
    <div className="lg:p-14 w-full min-h-[100vh] bg-myGray flex flex-col gap-4 items-center">
      {storeUsers && storeUsers.length > 0 ? (
        <div className="flex flex-col bg-white rounded-2xl items-end w-[95vw] lg:w-full overflow-auto mt-10">
          <Table />
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center mx-auto">
          <p className="text-medium font-normal">No User to display </p>

          <Button
            text="Create a Service"
            variant="filled"
            className="bg-primary text-white"
            onClick={() => {}}
          />
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
