import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, provider } from "src/firebase";

export enum SocialLogin {
  google = "google",
  facebook = "facebook",
}

interface AuthenticationContextType {
  isReady?: boolean;
  user?: User | null;
  status: Status;
  signInWithGoogle?: () => Promise<User | null>;
  signIn?: (email: string, password: string) => Promise<UserCredential>;
  signUp?: (email: string, password: string) => Promise<UserCredential>;
  logOut?: () => Promise<void>;
}

const AuthenticationContext = createContext<AuthenticationContextType>({
  status: "idle",
});

interface Props {
  children?: ReactElement;
}

type Status = "idle" | "loading" | "connected" | "anonymous";

export function AuthenticationProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState<Status>("loading");

  function signInWithGoogle() {
    return signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        if (!credential) {
          throw new Error("[signInWithGoogle]: returned credential is falsy.");
        }

        const token = credential.accessToken;
        const user = result.user;
        return user;
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(error, credential);
        return null;
      });
  }

  function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);

      if (!!currentuser) {
        setStatus("connected");
      } else {
        setStatus("anonymous");
      }
      setIsReady(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isReady,
        status,
        signInWithGoogle,
        signIn,
        signUp,
        logOut,
      }}
    >
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
