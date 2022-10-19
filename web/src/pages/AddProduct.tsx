import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import useHeaderTitle from "src/hooks/useHeaderTitle";
import Button from "src/ui/Button";

interface Props {
  socket?: Socket;
}

export default function AddProduct({ socket }: Props) {
  useHeaderTitle("Add a product");

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handlePriceChange(e: ChangeEvent<HTMLInputElement>) {
    setPrice(parseInt(e.target.value || "0", 10));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    socket?.emit("addProduct", {
      name,
      price,
      owner: localStorage.getItem("userName"),
    });
    navigate("/products");
  }

  return (
    <form className="flex-1 flex flex-col mx-auto my-auto max-w-7xl py-6 sm:px-6 lg:px-8 gap-10" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <label htmlFor="name">Name of the product</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
      <div className="flex flex-col gap-5">
        <label htmlFor="price">Starting price</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={handlePriceChange}
          required
        />
      </div>
      <Button>SEND</Button>
    </form>
  );
}
