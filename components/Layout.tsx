import { useState } from "react";

import { useUser } from "../context/UserContext";
import { fetcher } from "../helpers/requests-helper";
import { useEffect } from "react";

import Navbar from "./Navbar";

import { User } from "../types/interfaces";
const Layout: React.FC<{ children?: JSX.Element }> = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const { user, setUser } = useUser();
  // const router = useRouter();

  const getMe = async () => {
    const [error, user] = await fetcher<User>(`/user/me`);

    console.log(error, user);
    if (!error && user) setUser(user);
  };

  useEffect(() => {
    if (!user) getMe();
  });
  return (
    <>
      <Navbar user={user} />
      <div>{children}</div>
    </>
  );
};

export default Layout;
