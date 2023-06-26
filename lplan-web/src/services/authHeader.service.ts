export default function authHeader() {
	const tokenData = localStorage.getItem("token");
	if (tokenData) {
		const token = JSON.parse(tokenData);

		return { Authorization: "Bearer " + token }; // for Spring Boot back-end
		// return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
	} else {
		return { Authorization: "" }; // for Spring Boot back-end
		// return { 'x-access-token': null }; // for Node Express back-end
	}
}
