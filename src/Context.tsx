import { createContext, useState, ReactNode, useEffect } from "react";
import { useMeQuery } from "./graphql/graphql";

type ContextProp = {
  state: { loginUser: string | undefined | null | boolean };
  actions: {
    setLoginUser:
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
  state: { loginUser: undefined },
  actions: { setLoginUser: undefined },
});

export const ContextProvider = ({ children }: ProviderProp) => {
  const { data, error, loading } = useMeQuery();
  if (error) {
    console.log(error);
  }
  const [loginUser, setLoginUser] = useState<
    string | undefined | null | boolean
  >();

  const value = {
    state: {
      loginUser,
    },
    actions: {
      setLoginUser,
    },
  };

  useEffect(() => {
    if (!loading && data) {
      setLoginUser(data.me ? data.me.username : false);
    }
  }, [data, loading]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

// export Context;
