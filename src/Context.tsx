import { createContext, useState, ReactNode, useEffect } from "react";
import { useMeQuery } from "./graphql/graphql";

type ContextProp = {
  state: { isLoggedIn: string | undefined };
  actions: {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<string | undefined>> | undefined;
  };
};

type ProviderProp = {
  children: ReactNode;
};

export const Context = createContext<ContextProp>({
    state: { isLoggedIn : undefined}, 
    actions: {setIsLoggedIn : undefined}
});

export const ContextProvider = ({ children }: ProviderProp) => {
  const { data, error, loading } = useMeQuery();
  if (error) {
    console.log(error);
  }
  const [isLoggedIn, setIsLoggedIn] = useState<string | undefined>("");

  const value = {
    state: {
      isLoggedIn,
    },
    actions: {
      setIsLoggedIn,
    },
  };

  useEffect(() => {
    if (!loading && data) {
      setIsLoggedIn(data.me?.username)
    }
  }, [data, loading]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

// export Context;