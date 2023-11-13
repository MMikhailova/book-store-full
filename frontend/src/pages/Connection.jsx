
import { useContext } from "react";
import Login from "../components/Login"
import LogOut from "../components/LogOut";
import IsLoggedContext from "../context/isLogged.js";
import SignUp from "../components/SignUp"
import NavBar from "../components/NavBar";
const Connection = () => {
    const data = useContext(IsLoggedContext);
    
    return <><NavBar/>
        {!data.isRegistered ? <SignUp /> : !data.isLogged ? <Login /> :
        <LogOut />}</>

}

export default Connection;
