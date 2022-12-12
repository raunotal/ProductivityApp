import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

interface IHeaderProps {
  session: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
}

const Header = (props: IHeaderProps) => {
  const { session, status } = props;
  const isLoggedIn = status === "authenticated";
  console.log("session", session);
  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            {session && (
              <>
                <Image
                  src={session.user!.image!}
                  alt={session.user!.name!}
                  width={38}
                  height={38}
                  className="rounded-circle"
                />
                <div className="mx-3">{session.user!.name}</div>
              </>
            )}
          </div>
          <div>
            <button
              type="button"
              className="btn btn-outline-light me-2"
              onClick={() => (isLoggedIn ? signOut() : signIn())}
            >
              {isLoggedIn ? "Sign out" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
