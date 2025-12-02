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

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-lg-8">
                    <div className="card shadow-sm mb-5 overflow-hidden border-0">
                        <div className="bg-dark text-white d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                            <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                                <rect width="100%" height="100%" fill="#55595c"></rect>
                                <text x="50%" y="50%" fill="#eceeef" dy=".3em" fontSize="2rem" textAnchor="middle">Slika lokacije</text>
                            </svg>
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