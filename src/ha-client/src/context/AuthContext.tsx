import React, { useState, useEffect, useMemo } from "react";
import { callBff } from "../utils/ApiFunctions";
import * as bff from "../api/Bff";
import { UserInfo } from "../context/UserInfo";

interface IAuthContext {
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: UserInfo;
  login?: () => void;
  logout?: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  isLoading: false,
  isAuthenticated: false,
});

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfo | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const getUser = async () => {
    const response = await callBff((baseUrl) =>
      bff.MeEndpointApiFactory(undefined, baseUrl).authMeGet(),
    );
    const data = response.data;

    const authenticated = data.sub !== undefined;

    setIsAuthenticated(authenticated ?? false);
    setIsLoading(false);
    if (authenticated) setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const login = () => {
    window.location.href = "/auth/login";
  };

  const logout = () => {
    window.location.href = "/auth/logout";
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      isLoading,
      login,
      logout,
    }),
    [],
  );

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
