import { PrismaClient, ToDo } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import GenericLayout from "../components/layout/genericLayout";
import Main from "../components/section/main/main";
import Welcome from "../components/section/welcome/welcome";
import TodosService from "../service/todoService";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  let todos = [];

  if (session?.token) {
    todos = await TodosService.getTodos(session);
  }

  return {
    props: {
      todos,
    },
  };
};

const Home: NextPage<{ todos: ToDo[] }> = (props) => {
  const { todos } = props;
  const { data: session } = useSession();
  return (
    <GenericLayout>
      {session && <Main {...{ todos, session }} />}
      {!session && <Welcome />}
    </GenericLayout>
  );
};

export default Home;
