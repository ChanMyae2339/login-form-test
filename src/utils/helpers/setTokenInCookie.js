import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

const setTokenInCookie = (key, value) => {
  const cookies = new Cookies();
	const decoded = jwtDecode(value);

	
	cookies.set(key, value, {
		path: "/dashboard/users",
		expires: new Date(decoded?.exp * 1000),
	});
};

export default setTokenInCookie;  