import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
export function checkLogin() {
  try {
    const token = Cookies.get("token") ?? "";
    if (!token) throw new Error("no token");
    const decoded = jwtDecode(token);
    return decoded;
  } catch (err) {
    return null;
  }
}
