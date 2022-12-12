import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import GenericLayout from "../components/layout/genericLayout";
import Main from "../components/section/main/main";
import Welcome from "../components/section/welcome/welcome";

const Home: NextPage = () => {
  const [todos, setTodos] = useState([]);
  const { data: session } = useSession();
  return (
    <GenericLayout>
      {session && <Main {...{ todos }} />}
      {!session && <Welcome />}
    </GenericLayout>
  );
};

export default Home;
