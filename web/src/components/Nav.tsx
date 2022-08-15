import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket?: Socket;
}

export default function Nav({ socket }: Props) {
  const [notification, setNotification] = useState("");

  //Listens after a product is added
  useEffect(() => {
    socket?.on("addProductResponse", (data) => {
      setNotification(
        `@${data.owner} just added ${data.name} worth $${Number(
          data.price
        ).toLocaleString()}`
      );
    });
  }, [socket]);

  //Listens after a user places a bid
  useEffect(() => {
    socket?.on("bidProductResponse", (data) => {
      setNotification(
        `@${data.last_bidder} just bid ${data.name} for $${Number(
          data.amount
        ).toLocaleString()}`
      );
    });
  }, [socket]);

  return (
    <nav className="navbar">
      <div className="header">
        <h2 className="text-3xl font-bold underline">Bid Items</h2>
      </div>

      <div>
        <p style={{ color: "red" }}>{notification}</p>
      </div>
    </nav>
  );
}
