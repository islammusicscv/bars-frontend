import {useState} from "react";
import {useNavigate} from "react-router-dom";
import type {LoginData} from "../interfaces/LoginData.ts";
import apiClient from "../services/axiosInstance.ts";
import {useAuth} from "../context/AuthContext.tsx";

const Login = () => {
    const navigate = useNavigate();
    const {login} = useAuth();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data: LoginData = {
            email: email,
            password: pass
        }

        try {
            const res = await apiClient.post('/auth/login', data);

            console.log(res.data);

            if (res.data && res.data.access_token) {
                login(res.data.access_token);
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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <h1 className="h3 mb-4 fw-normal text-center">Prijava</h1>

                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput"
                                           placeholder="name@example.com"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">E-poštni naslov</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword"
                                           placeholder="Password"
                                           value={pass}
                                           onChange={(e) => setPass(e.target.value)}
                                    />
                                    <label htmlFor="floatingPassword">Geslo</label>
                                </div>
                                <button className="btn btn-primary w-100 py-2 mt-2" type="submit">Prijava</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Login;