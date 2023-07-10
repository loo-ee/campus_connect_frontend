import { getUser } from "../../adapters/authAdapters";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
import { IToken } from "../../util/types";

export default function Initializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const Auth = useContext(AuthContext);

  useEffect(() => {
    async function fetchUser() {
      const foundTokens = localStorage.getItem("authTokens");

      if (!foundTokens) {
        console.log("no tokensss");
        return;
      }

      const validUser = JSON.parse(foundTokens) as {
        access: string;
        refresh: string;
      };
      const jwtUser = Auth?.decodeUserJWT(validUser.access);

      const foundUser = await getUser(jwtUser!.email);

      Auth!.setAuthTokens(
        foundTokens ? (JSON.parse(foundTokens) as IToken) : null
      );
      Auth!.setUser(foundUser);
    }

    void fetchUser();
  }, []);

  return <div>{children}</div>;
}
