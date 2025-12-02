import {useState} from "react";
import type {RegisterData} from "../interfaces/RegisterData.ts";
import {useNavigate} from "react-router-dom";
import apiClient from "../services/axiosInstance.ts";

const Register = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (pass1 !== pass2) {
            console.log("Gesli se ne ujameta");
            alert("Gesli se ne ujameta");
            return;
        }

        const data: RegisterData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: pass1
        }

        try {
            const res = await apiClient.post('/users', data);

            if (res.status === 200 || res.status === 201) {
                alert("Uspešno");
                navigate('/login');
            }
        }
        catch (err) {
            console.error(err);
            alert("Napaka pri registraciji");
        }
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card shadow-sm border-0 rounded-3">
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <h1 className="h3 mb-4 fw-normal text-center">Registracija</h1>
                                    <div className="row g-2 mb-3">
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="firstNameInput"
                                                       placeholder="Ime"
                                                       value={firstName}
                                                       onChange={(e)=>setFirstName(e.target.value)}
                                                />
                                                <label htmlFor="firstNameInput">Ime</label>
                                            </div>
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="lastNameInput"
                                                       placeholder="Priimek"
                                                       value={lastName}
                                                       onChange={(e)=>setLastName(e.target.value)}
                                                />
                                                <label htmlFor="lastNameInput">Priimek</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" id="floatingInput"
                                               placeholder="name@example.com"
                                               value={email}
                                               onChange={(e)=>setEmail(e.target.value)}
                                        />
                                        <label htmlFor="floatingInput">E-poštni naslov</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="floatingPassword"
                                               placeholder="Geslo"
                                               value={pass1}
                                               onChange={(e)=>setPass1(e.target.value)}
                                        />
                                        <label htmlFor="floatingPassword">Geslo</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="floatingPassword2"
                                               placeholder="Ponovi geslo"
                                               value={pass2}
                                               onChange={(e)=>setPass2(e.target.value)}
                                        />
                                        <label htmlFor="floatingPassword2">Ponovi geslo</label>
                                    </div>
                                    <button className="btn btn-primary w-100 py-2 mt-2" type="submit">Registracija</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register;