import { createContext, useState, ReactNode, useEffect } from "react";
import { useMeQuery } from "./graphql/graphql";

type ContextProp = {
  state: { isLoggedIn: string | undefined | null | boolean };
  actions: {
    setIsLoggedIn:
      | React.Dispatch<
          React.SetStateAction<string | undefined | null | boolean>
        >
      | undefined;
  };
};

type ProviderProp = {
  children: ReactNode;
};

export const Context = createContext<ContextProp>({
  state: { isLoggedIn: undefined },
  actions: { setIsLoggedIn: undefined },
});

export const ContextProvider = ({ children }: ProviderProp) => {
  const { data, error, loading } = useMeQuery();
  if (error) {
    console.log(error);
  }
  const [isLoggedIn, setIsLoggedIn] = useState<
    string | undefined | null | boolean
  >();

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
      setIsLoggedIn(data.me ? data.me.username : false);
    }
  }, [data, loading]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

// export Context;
