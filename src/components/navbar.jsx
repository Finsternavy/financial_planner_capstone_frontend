import { useNavigate } from "react-router-dom";
import "./navbar.css";
import Toggle from "../components/toggle"
import DataContext from "../context/dataContext";
import { useContext } from "react";

const Navbar = () => {

    let navigate = useNavigate()
    let activeUser = useContext(DataContext).activeUser
    let currentUser = useContext(DataContext).user
    let logUserOut = useContext(DataContext).logoutUser
    let toggleActiveUser = useContext(DataContext).toggleActiveUser

    let toggle_menu = (e, currentDropDown) => {
        currentDropDown = e.target.closest('[data-dropdown]')
        currentDropDown.classList.toggle('active')
        toggleButtonClickable()
    }

    let menu_Click = (e) => {
        const isPopOutLink = e.target.matches('[data-dropdown-button]')
        let currentDropDown
        if (isPopOutLink){

            toggle_menu(e, currentDropDown)

        }else if (e.target.matches('.reg-btn')){

            toggle_menu(e, currentDropDown)
            let path = '/register'
            navigate(path)

        }else if(e.target.matches(".log-in")){

            toggle_menu(e, currentDropDown)
            let path = '/'
            navigate(path)

        } else if (e.target.matches('.log-out')){

            logUserOut()
            toggleActiveUser()
            toggle_menu(e, currentDropDown)
            let path = '/'
            navigate(path)

        }else if (e.target.matches('.home-link')){

            toggle_menu(e, currentDropDown)
            if (activeUser){
                let path = "/home"
                navigate(path)
            }else{
                let path = "/"
                navigate(path)
            }

        }else if(e.target.matches('.budget-home-link')){
            toggle_menu(e, currentDropDown)
            let path = "/budget/home"
            navigate(path)
            
        }else if(e.target.matches('.financial-goals-link')){

            toggle_menu(e, currentDropDown)
            let path = "/financial-goals"
            navigate(path)


        }else if(e.target.matches('.debt-snowball-link')){

            toggle_menu(e, currentDropDown)
            let path = "/debt-snowball"
            navigate(path)

        }else if(e.target.matches('.budget-optimizer-link')){
            toggle_menu(e, currentDropDown)
            let path = "/budget-optimizer"
            navigate(path)
            // add logic

        }else if(e.target.matches('.mortgage-calc-link')){
            toggle_menu(e, currentDropDown)
            let path = "/mortgage-calculator"
            navigate(path)
            // add logic

        }else if(e.target.matches('.auto-calc-link')){
            toggle_menu(e, currentDropDown)
            let path = "/auto-calculator"
            navigate(path)
            // add logic

        }else if(e.target.matches('.change-password')){
            toggle_menu(e, currentDropDown)
            let path = "/recovery/reset-password"
            navigate(path)
        }else if(e.target.matches('.resources-link')){
            toggle_menu(e, currentDropDown)
            let path = "/resources"
            navigate(path)
        }
    }

    const toggleButtonClickable = () => {
        let buttons = document.querySelectorAll('button')

        buttons.forEach(btn => {
            if (btn.disabled){
                btn.disabled = false
                btn.style.cursor = "pointer"
            }else{
                btn.disabled = true
                btn.style.cursor = "default"
            }
        })
    }



    return (
        <div className="navbar">
            <div className="navbar-hamburger-container" data-dropdown>
                
                <div className="hamburger-container" onClick={menu_Click} data-dropdown-button>
                    <div className="hamburger" data-dropdown-button></div>
                </div>
                <div className="pop-out-link">
                    <Toggle className="toggle-button"/>
                    {/* This section will contain javascript to check if user is logged in and display different buttons depending on if user logged in or not */}
                    {!activeUser  &&
                        <>
                            <div onClick={menu_Click} className="dont-disable log-in">Login</div>
                            <div onClick={menu_Click} className="dont-disable reg-btn">Register</div>
                            <div onClick={menu_Click} className="dont-disable resources-link">Resources</div>
                        </>
                    }
                    {activeUser &&
                        <>
                            <div onClick={menu_Click} className="dont-disable log-out">Logout</div>
                            <div onClick={menu_Click} className="dont-disable resources-link">Resources</div>
                            <hr className="horizontal-line" />
                            <div onClick={menu_Click} className="dont-disable home-link">Home</div>
                            <div onClick={menu_Click} className="dont-disable budget-home-link">Budget Home</div>
                            <div onClick={menu_Click} className="dont-disable financial-goals-link">Financial Goals</div>
                            <div onClick={menu_Click} className="dont-disable budget-optimizer-link">Budget Optimizer</div>
                            <div onClick={menu_Click} className="dont-disable debt-snowball-link">Debt Snowball</div>
                            <div onClick={menu_Click} className="dont-disable mortgage-calc-link">Mortgage Calculator</div>
                            <div onClick={menu_Click} className="dont-disable auto-calc-link">Auto Finance Calculator</div>
                            <hr className="horizontal-line" />
                            <h3>Account Info</h3>
                            <h4 className="user-info">Welcome {currentUser.user_name}!</h4>
                            <div onClick={menu_Click} className="dont-disable change-password" >Change Password</div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar