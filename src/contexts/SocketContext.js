"use client";
import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const connect = () => {
    try {
      const socketInstance = io(process.env.NEXT_PUBLIC_SERVER_URL);
      socketInstance.on("connect", () => {
        setSocket(socketInstance);
      });
    } catch (err) {
      console.error("Error occurred while connecting with socket", err);
    }
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <SocketContext.Provider
      value={[socket, setSocket]}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
