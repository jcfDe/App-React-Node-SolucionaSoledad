import { useEffect, useState } from "react";
import logo from "../images/logo.png"

function Login(props) {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [error, setError] = useState(false)


    useEffect(() => {
        const button = document.getElementById("btn-login")
        if (email.length > 0 && pass.length > 0) {
            button.disabled = false
        } else {
            button.disabled = true
        }
    })

    function loginresult(){
        props.setLogged(true)
    }

    const handleLogin = () => {
        const options = {
            method: "POST",
            mode:"cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, pass })
        }

        fetch("/login", options).then(res => res.json()).then(res => {
            if (res.login) {  
                loginresult()
                setError(false)
            }
            else {
                setError(true)
            }
        })
    }


    return (<div className="Login">
        <div className="form">
            <div className="form-group">
                <label className="negrita">Email</label>
                <input type="text" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label className="negrita">Contraseña</label>
                <input type="password" onChange={(e) => setPass(e.target.value)} />
            </div>
            {error&&<p className="error">Email y/o Contraseña incorrectos.</p>}
        </div>
        <div className="centrado">
            <button className="centrado" id="btn-login" onClick={handleLogin}>Entrar</button>
        </div>

        <div className="logo-login"><img src={logo} alt="Logo Cruz Roja" /></div>
    </div>)
}


export default Login;