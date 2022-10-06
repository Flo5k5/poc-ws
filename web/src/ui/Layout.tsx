import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Socket } from "socket.io-client";
import Nav from "src/ui/Nav";

interface Props {
  socket: Socket;
}

export type HeaderContext = [string, React.Dispatch<React.SetStateAction<string>>]

export default function Layout({ socket }: Props) {
  const [headerTitle, setHeaderTitle] = useState('');

  return (
    <>
      <Nav socket={socket} />
      {headerTitle && <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{headerTitle}</h1>
        </div>
      </header>}
      <main className="flex-1 flex flex-col">
        <Outlet context={[headerTitle, setHeaderTitle] as HeaderContext} />
      </main>
    </>
  );
}
