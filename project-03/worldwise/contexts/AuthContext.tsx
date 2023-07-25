import { createContext, useContext, useReducer } from "react";

interface IUSER {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

interface IAuthContext {
  user: null | IUSER;
  isAuthenicate: boolean;
  login: (e: string, p: string) => void;
  logout: () => void;
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext<IAuthContext>({
  user: null,
  isAuthenicate: false,
  login: () => undefined,
  logout: () => undefined,
});

const initialState = {
  user: null,
  isAuthenicate: false,
};

const reducer = (state, action) => {
  console.log(state, action);
  switch (action.type.toLowerCase()) {
    case "login": {
      return { ...state, user: action.payload, isAuthenicate: true };
    }
    case "logout": {
      return { ...state, user: null, isAuthenicate: false };
    }
    default:
      throw new Error("action not found!");
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isAuthenicate, user } = state;
  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ isAuthenicate, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("auth context is being used out side of its provider");
  return context;
};

export { useAuth, AuthProvider };
