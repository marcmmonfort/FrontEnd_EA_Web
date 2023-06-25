import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Credits from "../../components/credits/credits";
import { v4 as uuidv4 } from "uuid";
import { UserService } from "../../services/user.service";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import video from "../../assets/images/homebackground.mp4";

import "./home.page.css";
import { UserAuthEntity } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";

const Home = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [userinfo, setUserinfo] = useState<any>(null);

	const [userFR, setUserFR] = useState<UserAuthEntity>({
		appUser: "",
		nameUser: "",
		surnameUser: "",
		mailUser: "",
		passwordUser: "",
		photoUser: "photo.jpg",
		birthdateUser: new Date(),
		genderUser: "male",
		ocupationUser: "",
		descriptionUser: "",
		roleUser: "common",
		privacyUser: false,
		deletedUser: false,
	});
	const [password, setPassword] = useState("");

	const generatePassword = () => {
		const newPassword = uuidv4();
		setPassword(newPassword);
	};

	const handleGoogleLoginSuccess = async (credentialResponse: any) => {
		const decoded: any = jwt_decode(credentialResponse.credential);
		console.log(decoded);
		const userData = {
			nameUser: decoded.given_name,
			surnameUser: decoded.family_name,
			emailUser: decoded.email,
			photoUser: decoded.picture,
		};
		console.log(JSON.stringify(userData));
		setUserinfo(userData);

		UserService.getPersonByEmail(userData.emailUser).then(async (response) => {
			console.log(response);
			console.log("MailUser: " + response.data.mailUser);
			if (!response.data.mailUser) {
				const newUser = uuidv4();
				generatePassword();

				const user: UserAuthEntity = {
					appUser: `GoogleUser:${newUser}`,
					nameUser: userData.nameUser,
					surnameUser: userData.surnameUser,
					mailUser: userData.emailUser,
					passwordUser: password,
					photoUser: userData.photoUser,
					birthdateUser: new Date(),
					genderUser: "male",
					ocupationUser: "",
					descriptionUser: "Hola, soy un usuario de Google",
					roleUser: "common",
					privacyUser: false,
					deletedUser: false,
				};
				console.log(user);
				setUserFR(user);

				await AuthService.register(user)
					.then(async (response: any) => {
						console.log(user);
						console.log(response);
						console.log(response.status);
						if (response.status === 200) {
							Swal.fire({
								position: "center",
								icon: "success",
								customClass: {
									icon: "swal-icon-color",
									title: "swal-title-font",
									popup: "swal-popup-width",
								},
								title: "Register Succesful!",
								showConfirmButton: false,
								timerProgressBar: true,
								timer: 1000,
								iconColor: "#000",
								background: "#66fcf1",
								backdrop: "rgba(0,0,0,0.8)",
							});

							await AuthService.loginGoogle({
								mailUser: response.data.mailUser,
								passwordUser: response.data.passwordUser,
							})
								.then((response: any) => {
									console.log({
										mailUser: response.data.emailUser,
										passwordUser: response.data.passwordUser,
									});
									console.log(response);
									console.log(response.status);
									if (response.status === 200) {
										Swal.fire({
											position: "center",
											icon: "success",
											customClass: {
												icon: "swal-icon-color",
												title: "swal-title-font",
												popup: "swal-popup-width",
											},
											title: "LogIn Succesful!",
											showConfirmButton: false,
											timerProgressBar: true,
											timer: 1000,
											iconColor: "#000",
											background: "#66fcf1",
											backdrop: "rgba(0,0,0,0.8)",
										}).then(() => {
											console.log(response.data);
											AuthService.setCurrentUser(
												JSON.stringify(response.data.user.uuid),
												JSON.stringify(response.data.token)
											);
											console.log(
												"_id" + JSON.stringify(response.data.user.uuid)
											);
											console.log(
												"token" + JSON.stringify(response.data.token)
											);
											navigate("/profile");
										});
									}
								})
								.catch((error: any) => {
									console.error("error: " + error);
									console.log("error.response: " + error.response);
									switch (error.response.status) {
										case 404:
									}
								});
						} else if (response.status === 403) {
							Swal.fire({
								position: "center",
								icon: "info",
								customClass: {
									icon: "swal-icon-color",
									title: "swal-title-font",
									popup: "swal-popup-width",
								},
								title: "This User already exists!",
								showConfirmButton: false,
								timerProgressBar: true,
								timer: 1000,
								iconColor: "#000",
								background: "#66fcf1",
								backdrop: "rgba(0,0,0,0.8)",
							});
						}
					})
					.catch((error: any) => {
						console.error("error: " + error);
						console.log("error.response: " + error.response);
						switch (error.response.status) {
							case 403:
								Swal.fire({
									position: "center",
									icon: "error",
									customClass: {
										icon: "swal-icon-color",
										title: "swal-title-font",
										popup: "swal-popup-width",
									},
									title: "Email Already Exists!",
									showConfirmButton: false,
									timerProgressBar: true,
									timer: 1000,
									iconColor: "#000",
									background: "#66fcf1",
									backdrop: "rgba(0,0,0,0.8)",
								});
								break;
						}
					});
			} else {
				AuthService.loginGoogle({
					mailUser: response.data.mailUser,
					passwordUser: response.data.passwordUser,
				})
					.then((response: any) => {
						console.log({
							mailUser: response.data.emailUser,
							passwordUser: response.data.passwordUser,
						});
						console.log(response);
						console.log(response.status);
						if (response.status === 200) {
							Swal.fire({
								position: "center",
								icon: "success",
								customClass: {
									icon: "swal-icon-color",
									title: "swal-title-font",
									popup: "swal-popup-width",
								},
								title: "LogIn Succesful!",
								showConfirmButton: false,
								timerProgressBar: true,
								timer: 1000,
								iconColor: "#000",
								background: "#66fcf1",
								backdrop: "rgba(0,0,0,0.8)",
							}).then(() => {
								console.log(response.data);
								AuthService.setCurrentUser(
									JSON.stringify(response.data.user.uuid),
									JSON.stringify(response.data.token)
								);
								console.log("_id" + JSON.stringify(response.data.user.uuid));
								console.log("token" + JSON.stringify(response.data.token));
								navigate("/profile");
							});
						}
					})
					.catch((error: any) => {
						console.error("error: " + error);
						console.log("error.response: " + error.response);
						switch (error.response.status) {
							case 404:
						}
					});
			}
		});
	};

	return (
		<div>
			<div className="container">
				<h1 className="title">Lplan</h1>
				<div className="button-container">
					<Link to="/login" className="button">
						{t("Login")}
					</Link>
					<Link to="/register" className="button">
						{t("Register")}
					</Link>
				</div>
				<div className="google_container" id="signInButton">
					<GoogleLogin
						onSuccess={handleGoogleLoginSuccess}
						onError={() => {
							console.log("Login Failed");
						}}
					/>
				</div>
				<video autoPlay loop muted className="fullscreen-bg__video">
					<source src={video} type="video/mp4" />
				</video>
			</div>
			<Credits />
		</div>
	);
};

export default Home;
