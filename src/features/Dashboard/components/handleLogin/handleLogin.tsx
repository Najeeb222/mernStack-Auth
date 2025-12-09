// utils/handleLogin.ts
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import jwtDecode from "jwt-decode";

const BASE_URL = "https://os-project-server.vercel.app";

 const HandleLogin = async () => {
     console.log(axios.get(BASE_URL),'this is base url')
     try {
         const response = await axios.post(`${BASE_URL}/auth/users`, {
            //  email,
            //  password,
            });
            // console.log(response,'this is respone in handle')

    console.log("API Response:", response,); // ✅ log to inspect

    const token = response.data.token;

    // if (!token) {
    //   return { success: false, message: "Token not found" };
    // }

    localStorage.setItem("authToken", token);

    // const decoded = jwtDecode(token);
    // console.log("Decoded token:", decoded); // ✅ should show user info

    return {
      success: true,
    //   user: decoded, // ✅ this is what you're trying to log
    };
  } catch (error) {
    console.error("Login error", error);
    return {
      success: false,
      message: "Login failed. Please check credentials.",
    };
  }
};

export default HandleLogin