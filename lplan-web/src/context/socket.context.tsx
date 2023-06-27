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
  setMessages: Function;
  //setMessages: React.Dispatch<React.SetStateAction<Message[]>>; // Ajustar el tipo aquí
  roomId?: string;
  rooms: any;
}

//const socket = io(SOCKET_URL);
const socket = io("http://localhost:4000");
console.dir(socket);
console.log("Socket connected:", socket.connected);



const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  rooms: {},
  messages: [],
});
console.log("Hola")
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
    console.log("Socket connected:", socket.connected);

    console.log("(EVENTS.SERVER.ROOMS:  "+value)
    setRooms(value);
    console.log("create room: "+JSON.stringify(rooms));
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