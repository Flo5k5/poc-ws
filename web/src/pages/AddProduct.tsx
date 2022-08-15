import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";

interface Props {
  socket?: Socket;
}

export default function AddProduct({ socket }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handlePriceChange(e: ChangeEvent<HTMLInputElement>) {
    setPrice(parseInt(e.target.value || '0', 10));
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
    <div>
      <div className="addproduct__container">
        <h2>Add a new product</h2>
        <form className="addProduct__form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name of the product</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
          />

          <label htmlFor="price">Starting price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={handlePriceChange}
            required
          />

          <button className="addProduct__cta">SEND</button>
        </form>
      </div>
    </div>
  );
}
