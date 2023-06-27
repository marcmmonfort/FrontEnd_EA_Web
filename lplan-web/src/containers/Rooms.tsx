/*import { useRef } from "react";
import { useSockets } from "../context/socket.context";
import styles from "../styles/Room.module.css";
import React from "react";

function RoomsContainer() {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef<any>(null);

  function handleCreateRoom() {
    const roomName = newRoomRef.current.value || "";

    if (!roomName.trim()) return;

    socket.emit("create-room", roomName);
    console.log('Rooms:', rooms);
    console.log('RoomID:', roomId);
    newRoomRef.current.value = "";
  }

  function handleJoinRoom(key: string) {
    if (key === roomId) return;

    socket.emit("join-room", key);
  }

  return (
    <nav className={styles.wrapper}>
      <div className={styles.createRoomWrapper}>
        <input ref={newRoomRef} placeholder="Room name" />
        <button className="cta" onClick={handleCreateRoom}>
          CREATE ROOM
        </button>
      </div>

      <ul className={styles.roomList}>
        {Object.keys(rooms).map((key) => {
          console.log("Room Name:", rooms[key].name);
          return (
            <div key={key}>
              <button
                disabled={key === roomId}
                title={`Join ${rooms[key].name}`}
                onClick={() => handleJoinRoom(key)}
              >
                {rooms[key].name}
              </button>
            </div>
          );
        })}
      </ul>
    </nav>
  );
}

export default RoomsContainer;*/

import { useRef } from "react";
import EVENTS from "../context/events";
import { useSockets } from "../context/socket.context";
import styles from "../styles/Room.module.css";
import React from "react";

function RoomsContainer() {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef<any>(null);

  function handleCreateRoom() {
    //get the room name
    const roomName = newRoomRef.current.value || "";

    if (!String(roomName).trim()) return;

    // emit room created event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });
    console.log("RoomName:  "+roomName)
    console.log("ROOMS: "+JSON.stringify(rooms))


    // set room name input to empty string
    newRoomRef.current.value = "";
  }

  function handleJoinRoom(key:any) {
    if (key === roomId) return;

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  return (
    <nav className={styles.wrapper}>
      <div className={styles.createRoomWrapper}>
        <input ref={newRoomRef} placeholder="Room name" />
        <button className="cta" onClick={handleCreateRoom}>
          CREATE ROOM
        </button>
      </div>
      <ul className={styles.roomList}> Holaaa
        {Object.keys(rooms).map((key) => {
          return (
            <div key={key}>
              <button
                disabled={key === roomId}
                title={`Join ${rooms[key].name}`}
                onClick={() => handleJoinRoom(key)}
              >
                {rooms[key].name}
              </button>
            </div>
          );
        })}
      </ul>
    </nav>
  );
}

export default RoomsContainer;
