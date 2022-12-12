import { PrismaClient, ToDo } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import GenericLayout from "../components/layout/genericLayout";
import Main from "../components/section/main";

// const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async () => {
  // const todos: ToDo[] = await prisma.toDo.findMany();
  return {
    props: {
      todos: [],
    },
  };
};

const Home: NextPage<{ todos: ToDo[] }> = ({ todos }) => {
  return (
    <GenericLayout>
      <Main {...{ todos }} />
    </GenericLayout>
  );
};

export default Home;
