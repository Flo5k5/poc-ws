import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "src/context/AuthenticationContext";
import useHeaderTitle from "src/hooks/useHeaderTitle";
import Button from "src/ui/Button";

export default function Home() {
  useHeaderTitle("Bid items");
  const [inputUsername, setInputUsername] = useState("");
  const { username, signIn } = useAuthentication();
  const navigate = useNavigate();

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputUsername(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault?.();

    let formData = new FormData(e.currentTarget);
    let username = formData?.get("username") as string;

    signIn?.(username, () => {
      navigate("/products");
    });
  }

  useEffect(() => {
    setInputUsername(username || "");
  }, [username]);

  return (
    <form className="flex-1 flex flex-col mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 gap-10" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <label htmlFor="username">Enter your username</label>
        <input
          type="text"
          name="username"
          className="home__input"
          value={inputUsername}
          onChange={handleInputChange}
          required
          minLength={6}
        />
      </div>
      <Button>SIGN IN</Button>
    </form>

  );
}
