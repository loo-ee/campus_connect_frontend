"use client";

import { useNavigate } from "react-router-dom";
import { getUser } from "../adapters/authAdapters";
import { backendURL } from "../util/globalVars";
import { IAcessToken, IStudent, ITeacher, IToken } from "../util/types";
import jwt_decode from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export interface AuthContextProp {
  user: IStudent | ITeacher | null;
  authTokens: IToken | null;
  setUser: React.Dispatch<React.SetStateAction<IStudent | ITeacher | null>>;
  setAuthTokens: React.Dispatch<React.SetStateAction<IToken | null>>;
  logoutUser: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  assignUser: (accessToken: string | null) => void;
  decodeUserJWT: (accessToken: string) => { email: string };
}

export const AuthContext = createContext<AuthContextProp | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IStudent | ITeacher | null>(null);
  const [authTokens, setAuthTokens] = useState<IToken | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const contextData = {
    user: user,
    authTokens: authTokens,
    setUser: setUser,
    setAuthTokens: setAuthTokens,
    logoutUser: logoutUser,
    loading: loading,
    setLoading: setLoading,
    assignUser: assignUser,
    decodeUserJWT: decodeUserJWT,
  };

  function logoutUser() {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("login/");
  }

  async function updateToken() {
    if (!authTokens) {
      setLoading(false);
      return;
    }

    const response = await fetch(`${backendURL}/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens.refresh,
      }),
    });

    const data = await (response.json() as Promise<IToken | null>);

    if (response.status === 200 && data) {
      setAuthTokens(data);
      await assignUser(data.access);

      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  }

  function decodeUserJWT(accessToken: string): {
    email: string;
  } {
    const decodedUserInfo: IAcessToken = jwt_decode(accessToken);
    const email = decodedUserInfo.email;

    return { email: email };
  }

  async function assignUser(accessToken: string | null) {
    if (!accessToken) {
      console.log("no tokens");
      return;
    }

    const { email } = decodeUserJWT(accessToken);
    const foundUser = await (getUser(email) as Promise<IStudent | ITeacher>);
    setUser(foundUser);
  }

  useEffect(() => {
    if (loading) {
      void updateToken();
    }

    const time = 1000 * 60 * 4;

    const interval = setInterval(() => {
      if (authTokens) {
        void updateToken();
      }
    }, time);

    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
}
