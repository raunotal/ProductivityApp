import { PrismaClient, ToDo } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import GenericLayout from "../components/layout/genericLayout";
import Main from "../components/section/main/main";
import Welcome from "../components/section/welcome/welcome";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async (context) => {
  const todos: ToDo[] = await prisma.toDo.findMany();
  const session = await getSession(context);
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
