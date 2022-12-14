import logo from "../img/logo-no-bg.png"
import DataService from "../services/dataService"
import DataContext from "../context/dataContext";
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../components/login.css"

const Login = () => {

    const[user, setUser] = useState({})
    let navigate = useNavigate()
    let currentUser = useContext(DataContext).loginUser
    let toggleActiveUser = useContext(DataContext).toggleActiveUser
    let setBudgets = useContext(DataContext).setUserBudgets
    const [loading, setLoading] = useState(false)

    const onChange = (e) => {
        let name = e.target.name
        let val = e.target.value

        setUser(prev => ({...prev, [name]:val}))
    }

    const login = async(e) => {
        e.preventDefault()
        setLoading(true)
        let service = new DataService()
        let data
        if (!user.user_name || !user.user_password){
            data = await service.login({
                "user_name": "f",
                "user_password": "f"
            })
        }else{
            data = await service.login({
                "user_name": user.user_name,
                "user_password": user.user_password
            })
        }

        if (data[0] === false){
            setLoading(false)
            let userName = document.querySelector('.user-name')
            userName.classList.add("error")
            let userPassword = document.querySelector('.user-password')
            userPassword.classList.add("error")
        }
        if (data[0] === true){
            currentUser(data[1])
            toggleActiveUser()
            let path = "/home"
            navigate(path)
        }
    }

    const register = () => {
        let path = "/register"
        navigate(path)
    }

    const recoverUsername = () => {
        let path = "/recovery/username"
        navigate(path)
    }

    const recoverPassword = () => {
        let path = "/recovery/password"
        navigate(path)
    }

    return (

        <div className="login">
            {loading &&

                <div className="loading-container container">
                    <p className="loading-message">Waking the server up from its nap... Please wait...</p>
                </div>

            }
            <h1 className="header">Financial Planner</h1>
            <img src={logo} alt="" className="logo" />
            <form className="container">
                <div className="form">
                    <input type="text" className="user-name input" name="user_name" autoComplete="username" onChange={onChange} placeholder="Username" />
                    <input type="password" className="user-password input" name="user_password" autoComplete="current-password" onChange={onChange} placeholder="Password" />
                </div>
                <div className="btn-container">
                    <button className="btn" onClick={login}>Login</button>
                    <button className="btn" onClick={register}>Register</button>
                </div>
                <div className="recovery">
                    <button className="btn-recovery" onClick={recoverUsername}>Forgot Username</button>
                    <button className="btn-recovery" onClick={recoverPassword}>Forgot Password</button>
                </div>
            </form>

            <div className="disclaimer-container container">
                <div className="disclaimer-banner">***NOTES***</div>
                <p className="disclaimer">1. This site is currently under development. Not all functionality is fully implemented.</p>
                <p className="disclaimer">2. No personal information is stored in the database.</p>
            </div>
        </div>

    )

}

export default Login