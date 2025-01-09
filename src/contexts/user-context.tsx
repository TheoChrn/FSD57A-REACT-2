import { usersQuery } from "@/pages/home/page";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useMemo } from "react";

type UsersContextValue = {
  users: MockUser[];
};

const UsersContext = createContext<UsersContextValue | undefined>(undefined);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data } = useSuspenseQuery(usersQuery());
  const value = useMemo(() => ({ users: data }), [data]);

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
