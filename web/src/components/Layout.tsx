import { Outlet } from "react-router-dom";
import { Socket } from "socket.io-client";
import Nav from "src/components/Nav";

interface Props {
  socket: Socket;
}

export default function Layout({ socket }: Props) {
  return (
    <div>
      {/* Nav is available at the top of all the pages as a navigation bar */}
      <Nav socket={socket} />
      <hr />
      <Outlet />
    </div>
  );
}
