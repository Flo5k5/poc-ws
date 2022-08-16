import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "src/context/AuthenticationContext";

export default function Home() {
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
    <div>
      <form className="home__form" onSubmit={handleSubmit}>
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
        <button className="home__cta">SIGN IN</button>
      </form>
    </div>
  );
}
