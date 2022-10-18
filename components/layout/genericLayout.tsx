import Footer from "./footer";
import Header from "./header";

interface GenericLayoutProps {
  children: React.ReactNode;
}

const GenericLayout = (props: GenericLayoutProps) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default GenericLayout;
