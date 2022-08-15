import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Socket } from "socket.io-client";

interface Props {
  socket?: Socket;
}

export default function BidProduct({ socket }: Props) {
  const { name, price } = useParams();
  const [userInput, setUserInput] = useState<number>(
    parseInt(price || "", 10) || 0
  );
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  function handleAmountChange(e: ChangeEvent<HTMLInputElement>) {
    setUserInput(parseInt(e.target.value || "", 10) || 0);
  }

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userInput > (Number(price) || 0)) {
      socket?.emit("bidProduct", {
        amount: userInput,
        last_bidder: localStorage.getItem("userName"),
        name,
      });
      navigate("/products");
    } else {
      setError(true);
    }
  }

  return (
    <div>
      <div className="bidproduct__container">
        <h2>Place a Bid</h2>
        <form className="bidProduct__form" onSubmit={handleSubmit}>
          <h3 className="bidProduct__name">{name}</h3>

          <label htmlFor="amount">Bidding Amount</label>
          {/* The error message */}
          {error && (
            <p style={{ color: "red" }}>
              The bidding amount must be greater than {price}
            </p>
          )}

          <input
            type="number"
            name="amount"
            value={userInput}
            onChange={handleAmountChange}
            required
          />

          <button className="bidProduct__cta">SEND</button>
        </form>
      </div>
    </div>
  );
}
