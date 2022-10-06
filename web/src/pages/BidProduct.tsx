import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import useHeaderTitle from "src/hooks/useHeaderTitle";
import Button from "src/ui/Button";

interface Props {
  socket?: Socket;
}

export default function BidProduct({ socket }: Props) {
  useHeaderTitle("Place a Bid");

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
    <form className="flex-1 flex flex-col mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 gap-10" onSubmit={handleSubmit}>
      <h3 className="text-2xl font-bold text-black">{name}</h3>
      <div className="flex flex-col gap-5">
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
      </div>
      <Button>SEND</Button>
    </form>
  );
}
