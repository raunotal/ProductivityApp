import { useSession } from "next-auth/react";
import Footer from "./footer";
import Header from "./header";

interface GenericLayoutProps {
  children: React.ReactNode;
}

const GenericLayout = (props: GenericLayoutProps) => {
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";
  return (
    <div className="d-flex flex-column h-100">
      <Header {...{ session, status }} />
      <div className="flex-grow-1">{props.children}</div>
      <Footer />
    </div>
  );
};

export default GenericLayout;
