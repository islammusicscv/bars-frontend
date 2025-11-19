import {useState} from "react";
import type {RegiserData} from "../interfaces/RegiserData.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (pass1 != pass2) {
            console.log("Gesli se ne ujameta");
            return;
        }

        const data: RegiserData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: pass1
        }

        try {
            const res = await axios.post('http://localhost:3000/users', data);

            if (res.status === 200 || res.status === 201) {
                alert("Uspešno");
                navigate('/login');
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <div className="form-floating">
                    <input type="text" className="form-control" id="firstNameInput"
                           placeholder="First name"
                           value={firstName}
                           onChange={(e)=>setFirstName(e.target.value)}
                    />
                    <label htmlFor="firstNameInput">First name</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="lastNameInput"
                           placeholder="Last name"
                           value={lastName}
                           onChange={(e)=>setLastName(e.target.value)}
                    />
                    <label htmlFor="lastNameInput">Last name</label>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput"
                           placeholder="name@example.com"
                           value={email}
                           onChange={(e)=>setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword"
                           placeholder="Password"
                           value={pass1}
                           onChange={(e)=>setPass1(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword2"
                           placeholder="Repeat Password"
                           value={pass2}
                           onChange={(e)=>setPass2(e.target.value)}
                    />
                    <label htmlFor="floatingPassword2">Repeat Password</label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Register</button>
            </form>

        </>
    )
}
export default Register;