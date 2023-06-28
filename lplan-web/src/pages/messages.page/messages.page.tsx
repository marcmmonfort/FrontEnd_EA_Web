import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import Picker from "emoji-picker-react";
import Navbar from "../../components/navbar/navbar";
import backgroundImage from "../../assets/images/background_7.jpg";
import "./messages.page.css";

//const socket: Socket = io("http://localhost:3000");

const socket: Socket = io("http://147.83.7.158:4000");

const Messages = () => {
	const [isConnected, setIsConnected] = useState(false);
	const [username, setUsername] = useState("");
	const [nuevoMensaje, setNuevoMensaje] = useState("");
	const [mensajes, setMensajes] = useState<any[]>([]);
	const [usuariosConectados, setUsuariosConectados] = useState<string[]>([]);
	const [chatActivo, setChatActivo] = useState<string | null>(null);
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	document.body.style.backgroundImage = `url(${backgroundImage})`;

	useEffect(() => {
		socket.on("connect", () => setIsConnected(true));

		document.body.style.backgroundImage = `url(${backgroundImage})`;

		socket.on("chat_message", (data: any) => {
			setMensajes((mensajes) => [...mensajes, data]);
		});

		socket.on("user_connected", (username: string) => {
			setUsuariosConectados((usuarios) => [...usuarios, username]);
		});

		socket.on("user_disconnected", (username: string) => {
			setUsuariosConectados((usuarios) =>
				usuarios.filter((user) => user !== username)
			);
		});

		socket.on("connected_users", (users: string[]) => {
			setUsuariosConectados(users);
		});

		const getUser = async () => {
			const id = AuthService.getCurrentUser();
			if (id) {
				UserService.getPerson(id)
					.then((response) => {
						setUsername(response.data.appUser);
					})
					.catch((error) => {
						window.location.href = "*";
					});
			}
		};
		getUser();

		return () => {
			socket.off("connect");
			socket.off("chat_message");
			socket.off("user_connected");
			socket.off("user_disconnected");
			socket.off("connected_users");
		};
	}, []);

	const conectarUsuario = () => {
		socket.emit("user_connected", username);
	};

	const enviarMensaje = () => {
		const mensaje = {
			usuario: username,
			mensaje: nuevoMensaje,
			destinatario: chatActivo,
			hora: new Date().toLocaleTimeString(),
		};

		socket.emit("chat_message", mensaje);
		setNuevoMensaje("");
		setShowEmojiPicker(false);
	};

	const iniciarChat = (destinatario: string) => {
		setChatActivo(destinatario);
	};

	const desconectarUsuario = () => {
		socket.disconnect();
		setIsConnected(false);
		setUsername("");
		setMensajes([]);
		setUsuariosConectados([]);
		setChatActivo(null);
	};

	const handleEmojiSelect = (emoji: any) => {
		setNuevoMensaje((mensaje) => mensaje + emoji.emoji);
	};

	return (
		<div>
			<Navbar />
			<div className="containerMessages2">
				<div className="titleContainer">
					<h1 className="titleSection">Messages</h1>
				</div>
				<div className="input-group">
					<h2
						className={
							isConnected ? "text-msg-connected" : "text-msg-disconnected"
						}
					>
						{isConnected ? "Connected" : "Disconnected"}
					</h2>
					<label className="text_msg_1" htmlFor="username">
						Logged as ...
					</label>
					<label className="text_msg_2" htmlFor="username">
						@{username}
					</label>
					<div>
						<button className="buttonConnect" onClick={conectarUsuario}>
							Connect
						</button>
						<button className="buttonDisonnect" onClick={desconectarUsuario}>
							Disconnect
						</button>
					</div>
					<h3 className="text_msg_4">Connected Users</h3>
				</div>
				<div className="sidebar">
					<ul className="text_msg_5">
						{usuariosConectados.map((usuario, index) => (
							<li key={index} onClick={() => iniciarChat(usuario)}>
								{usuario}
							</li>
						))}
					</ul>
				</div>
				{chatActivo && (
					<div className="chat">
						<h3 className="text_msg_6">Chat with @{chatActivo}</h3>
						<ul>
							{mensajes
								.filter(
									(mensaje) =>
										(mensaje.usuario === username &&
											mensaje.destinatario === chatActivo) ||
										(mensaje.usuario === chatActivo &&
											mensaje.destinatario === username)
								)
								.map((mensaje, index) => (
									<li className="text_msg_7" key={index}>
										<strong>
											@{mensaje.usuario} ({mensaje.hora}):
										</strong>{" "}
										{mensaje.mensaje}
									</li>
								))}
						</ul>
						<div className="input-group">
							<input
								type="text"
								value={nuevoMensaje}
								onChange={(e) => setNuevoMensaje(e.target.value)}
							/>
							<button
								className="buttonsChat"
								onClick={() => setShowEmojiPicker(!showEmojiPicker)}
							>
								{showEmojiPicker ? "Show Emojis" : "Show Emojis"}
							</button>
							<button className="buttonsChat2" onClick={enviarMensaje}>
								Enviar
							</button>
						</div>
						{showEmojiPicker && <Picker onEmojiClick={handleEmojiSelect} />}
					</div>
				)}
			</div>
		</div>
	);
};

export default Messages;
