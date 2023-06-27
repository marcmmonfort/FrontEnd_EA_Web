/*import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import EVENTS from "../context/events";
import React from "react";

interface Message {
  message: string;
  time: string;
  username: string;
}

type Room = {
  name: string;
};

type Rooms = {
  [key: string]: Room;
};

interface Context {
  socket: Socket;
  username?: string;
  setUsername: (value:any) => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  roomId?: string;
  rooms: Rooms;
}


//const socket = io("http://147.83.7.158:3000");
const socket=io("http://localhost:9876")
console.dir(socket);

const SocketContext = createContext<Context>({
  socket,
  setUsername: (value:any) => {},
  setMessages: () => {},
  rooms: {},
  messages: [],
});

function SocketsProvider(props: any) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    window.onfocus = function () {
      document.title = "Chat app";
    };
  }, []);

  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
  });

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    setRoomId(value);
    setMessages([]);
  });

  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
      if (!document.hasFocus()) {
        document.title = "New message...";
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { message, username, time },
      ]);
    });
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        roomId,
        messages,
        setMessages,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;*/

import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "./default";
import EVENTS from "./events";
import React from "react";

interface Message {
  message: string;
  time: string;
  username: string;
}

type Room = {
  name: string;
};

type Rooms = {
  [key: string]: Room;
};

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages?: Message[];
  //setMessages: Function;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>; // Ajustar el tipo aquí
  roomId?: string;
  rooms: Rooms;
}

const socket = io("http://147.83.7.158:9876");
console.dir(socket);


const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  rooms: {},
  messages: [],
  roomId:"",
});

function SocketsProvider(props: any) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState<Message[]>([]); // Ajustar el tipo aquí

  useEffect(() => {
    window.onfocus = function () {
      document.title = "Chat app";
    };
  }, []);

  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
    console.log("create room")
  });

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    console.log("Join room")
    setRoomId(value);
    console.log("Join room2")
    setMessages([]);
  });

  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
      if (!document.hasFocus()) {
        document.title = "New message...";
      }

      setMessages((messages) => [...messages, { message, username, time }]);
    });
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        roomId,
        messages,
        setMessages,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;