import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import type {LoginData} from "../interfaces/LoginData.ts";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data: LoginData = {
            email: email,
            password: pass
        }

        try {
            const res = await axios.post('http://localhost:3000/auth/login', data);

            if (res.status === 200 || res.status === 201) {
                alert("Uspešno");
                navigate('/');
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
                  <input type="email" className="form-control" id="floatingInput"
                         placeholder="name@example.com"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                  <input type="password" className="form-control" id="floatingPassword"
                         placeholder="Password"
                         value={pass}
                         onChange={(e) => setPass(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
              </div>
              <button className="btn btn-primary w-100 py-2" type="submit">Register</button>
          </form>
      </>
  )
}
export default Login;