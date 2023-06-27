import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Chat.module.css"
import { useSockets } from "../../context/socket.context";
import RoomsContainer from "../../containers/Rooms";
import MessagesContainer from "../../containers/Messages";
import React, { useState } from 'react'

import { useEffect, useRef } from "react";
import { User } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";
import { io } from "socket.io-client";

export default function Chat() {
  //const { socket, username, setUsername } = useSockets();

  let { socket } = useSockets();
  const usernameRef = useRef<any>(null);
  const [username, setUsername] = useState<User | null>(null);
  //const [userId, setUserId] = useState<string>("hola");

  function handleSetUsername() {
    const value = usernameRef.current.value;
    console.log("Value:  "+value)
    if (!value) {
      return;
    }
    setUsername(value);

    //setUsername();

    localStorage.setItem("username", value);
  }
  console.log("username:  "+username)

  useEffect(() => {

    if (usernameRef)
      usernameRef.current.value = localStorage.getItem("username") || "";
  }, []);
  

  return (
    <div>
      
      {!username && (
        <div className={styles.usernameWrapper}>
          <div className={styles.usernameInner}>
            <input placeholder="Username" ref={usernameRef} />
            <button className="cta" onClick={handleSetUsername}>
              START
            </button>
          </div>
        </div>
      )}
      
      {username && (
        <div className={styles.container}>
          <RoomsContainer />
          <MessagesContainer />
        </div>
      )}
    </div>
  );
}