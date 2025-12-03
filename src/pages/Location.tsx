import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import apiClient from "../services/axiosInstance.ts";
import CardComment from "../components/CardComment.tsx";

const Location = () => {
    const [location, setLocation] = useState<Location | null>(null);
    const [content, setContent] = useState<string>('');
    const [comments, setComments] = useState<Comment[]>([]);
    const {id} = useParams();
    const navigate = useNavigate();

    const getComments = async () => {
        try {
            const res = await apiClient.get<Comment[]>(`/comments/location/${id}`);
            if (res.status === 200) {
                setComments(res.data);
                console.log(res.data);
            }
        } catch (err) {
            console.error("Error fetching comments:", err);
        }
    }

    const fetchData =  async () => {
        try {
            const res = await apiClient.get<Location>(`/locations/${id}`);
            setLocation(res.data);
        }
        catch (err) {
            console.error("Error fetching location:", err);
        }
    }

    useEffect(() => {
        if (id) {
            fetchData();
            getComments();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) return;

        const data = {
            content: content,
            location_id: Number(id)
        }

        try {
            await apiClient.post('/comments', data);

            getComments();
            setContent('');
        }
        catch (err) {
            console.error("Error posting comment:", err);
        }
    }


    if (!location) {
        return <div className="container mt-5">Nalaganje ...</div>;
    }

    const hasImages = location.images && location.images.length > 0;

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-lg-8">
                    <div className="card shadow-sm mb-5 overflow-hidden border-0">
                        {/* Galerija slik ali placeholder */}
                        <div className="bg-dark text-white d-flex align-items-center justify-content-center" style={{ minHeight: '400px', maxHeight: '500px', overflow: 'hidden' }}>
                            {hasImages ? (
                                <div id="carouselExampleIndicators" className="carousel slide w-100 h-100" data-bs-ride="carousel">
                                    {/* Indikatorji (pikice spodaj), če je več slik */}
                                    {location.images!.length > 1 && (
                                        <div className="carousel-indicators">
                                            {location.images!.map((_, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    data-bs-target="#carouselExampleIndicators"
                                                    data-bs-slide-to={index}
                                                    className={index === 0 ? "active" : ""}
                                                    aria-current={index === 0 ? "true" : "false"}
                                                    aria-label={`Slide ${index + 1}`}
                                                ></button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Slike */}
                                    <div className="carousel-inner h-100">
                                        {location.images!.map((img, index) => (
                                            <div key={img.id} className={`carousel-item h-100 ${index === 0 ? "active" : ""}`}>
                                                <img
                                                    src={`http://localhost:3000/uploads/${img.url}`}
                                                    className="d-block w-100 h-100"
                                                    alt={`Slika lokacije ${index + 1}`}
                                                    style={{ objectFit: 'contain', backgroundColor: '#333' }}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Gumbi za naprej/nazaj, če je več slik */}
                                    {location.images!.length > 1 && (
                                        <>
                                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Prejšnja</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Naslednja</span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            ) : (
                                /* Placeholder, če ni slik */
                                <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                                    <svg className="bd-placeholder-img mb-3" width="100" height="100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                                        <rect width="100%" height="100%" fill="#6c757d"></rect>
                                    </svg>
                                    <span className="fs-4 text-muted">Ni slike lokacije</span>
                                </div>
                            )}
                        </div>

                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <h1 className="display-5 fw-bold text-dark mb-0">{location.title}</h1>
                                <div className="badge bg-warning text-dark fs-5 shadow-sm">
                                    ★ {location.rating}
                                </div>
                            </div>

                            <p className="lead text-secondary">{location.description}</p>

                            <div className="d-flex align-items-center text-muted mt-4 pt-3 border-top">
                                <small>
                                    Objavljeno: {location.createdAt}
                                </small>
                            </div>
                        </div>
                    </div>


                    <div className="mt-5">
                        <div className="card mb-4 bg-light border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h5 className="card-title mb-3">Povejte svoje mnenje</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <textarea
                                            className="form-control border-0 shadow-inner"
                                            rows={3}
                                            placeholder="Napišite komentar..."
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            style={{ resize: 'none' }}
                                        ></textarea>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary px-4 fw-bold">Objavi komentar</button>
                                    </div>
                                </form>
                            </div>
                        </div>


                        <div className="d-flex flex-column gap-3">
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <CardComment
                                        key={comment.id}
                                        content={comment.content}
                                        createdAt={comment.createdAt}
                                        user={comment.user}
                                    />
                                ))
                            ) : (
                                <div className="alert alert-light text-center py-4 border-dashed text-muted">
                                    Trenutno ni komentarjev. Bodite prvi, ki boste komentirali!
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                <div className="col-lg-4">
                    <div className="sticky-top" style={{ top: '2rem', zIndex: 1 }}>
                        <div className="card shadow-sm border-0 mb-3">
                            <div className="card-header bg-white fw-bold py-3">
                                Informacije o lokaciji
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item py-3">
                                    <div className="text-uppercase text-muted small fw-bold mb-1">Naslov</div>
                                    <div className="fs-5">{location.address}</div>
                                </li>
                                <li className="list-group-item py-3">
                                    <div className="text-uppercase text-muted small fw-bold mb-1">ID zapisa</div>
                                    <div className="font-monospace">#{location.id}</div>
                                </li>
                            </ul>
                            <div className="card-body">
                                <button
                                    className="btn btn-outline-secondary w-100"
                                    onClick={() => navigate('/')}
                                >
                                    ← Nazaj na seznam
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Location;