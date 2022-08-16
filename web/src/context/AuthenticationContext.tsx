import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthenticationContextType {
  username?: string | null;
  signIn?: (username: string, callback: () => void) => void;
}

const AuthenticationContext = createContext<AuthenticationContextType>({});

interface Props {
  children?: ReactElement;
}

export function AuthenticationProvider({ children }: Props) {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("username");
    console.log({ data });
    setUsername(data);
  }, []);

  function signIn(username: string, callback: () => void) {
    localStorage.setItem("username", username);
    setUsername(username);
    callback?.();
  }

  return (
    <AuthenticationContext.Provider value={{ username, signIn }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  const context = useContext(AuthenticationContext);

  if (context === undefined) {
    throw new Error(
      "[useAuthentication]: it must be used within a AuthenticationProvider"
    );
  }

  return context;
}
