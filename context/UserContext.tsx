import React, { createContext, FC, useContext, useState } from "react";

import { User } from "../types/interfaces";

export interface UserContext {
  user?: User;
  setUser: (user?: User) => void;
}

export const UserContextImpl = createContext<UserContext>(null!);

export function useUser() {
  return useContext(UserContextImpl);
}

interface Props {
  initialUser?: User;
  children: React.ReactNode;
}

export const UserProvider: FC<Props> = ({ children, initialUser }) => {
  const [user, setUser] = useState(initialUser);

  return (
    <UserContextImpl.Provider value={{ user, setUser }}>
      {children}
    </UserContextImpl.Provider>
  );
};
