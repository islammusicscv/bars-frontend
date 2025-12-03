import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../services/axiosInstance.ts";
import type { Location } from "../interfaces/Location.ts";
import type { UpdateLocationData } from "../interfaces/UpdateLocation.ts";
import { useAuth } from "../context/AuthContext.tsx";

const LocationEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userId } = useAuth();

    const [location, setLocation] = useState<Location | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [rating, setRating] = useState(5);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const res = await apiClient.get<Location>(`/locations/${id}`);
                const data = res.data;
                setLocation(data);

                // ali je user lastnik
                if (userId && data.user?.id !== userId) {
                    alert("Nimate pravic za urejanje te lokacije.");
                    navigate('/');
                    return;
                }

                setTitle(data.title);
                setDescription(data.description);
                setAddress(data.address);
                setRating(data.rating);
            } catch (err) {
                console.error("Napaka pri nalaganju lokacije:", err);
                alert("Lokacije ni mogoče naložiti.");
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchLocation();
        }
    }, [id, userId, navigate]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFiles(e.target.files);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        const updateData: UpdateLocationData = {
            title,
            description,
            address,
            rating: Number(rating)
        };

        try {
            await apiClient.patch(`/locations/${id}`, updateData);

            if (selectedFiles && selectedFiles.length > 0) {
                const formData = new FormData();
                for (let i = 0; i < selectedFiles.length; i++) {
                    formData.append('files', selectedFiles[i]);
                }

                await apiClient.post(`/locations/${id}/images`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            alert("Lokacija uspešno posodobljena!");
            navigate(`/locations/${id}`);
        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.message || "Napaka pri posodabljanju.";
            alert(`Napaka: ${errorMsg}`);
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="text-center mt-5">Nalaganje...</div>;
    if (!location) return <div className="text-center mt-5">Lokacija ne obstaja.</div>;

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-body p-4">
                            <h2 className="mb-4 text-center">Uredi lokacijo</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="titleInput"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="titleInput">Naziv lokacije</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <textarea
                                        className="form-control"
                                        id="descInput"
                                        style={{height: '100px'}}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                    <label htmlFor="descInput">Opis</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="addressInput"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="addressInput">Naslov</label>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="ratingInput" className="form-label">Ocena: {rating}</label>
                                    <input
                                        type="range"
                                        className="form-range"
                                        min="1"
                                        max="5"
                                        step="1"
                                        id="ratingInput"
                                        value={rating}
                                        onChange={(e) => setRating(Number(e.target.value))}
                                    />
                                </div>

                                {/* Prikaz obstoječih slik (samo informativno) */}
                                {location.images && location.images.length > 0 && (
                                    <div className="mb-3">
                                        <label className="form-label">Obstoječe slike:</label>
                                        <div className="d-flex gap-2 overflow-auto pb-2">
                                            {location.images.map(img => (
                                                <img
                                                    key={img.id}
                                                    src={`http://localhost:3000/uploads/${img.url}`}
                                                    alt="Thumbnail"
                                                    style={{height: '60px', width: '60px', objectFit: 'cover', borderRadius: '4px'}}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mb-4">
                                    <label htmlFor="formFileMultiple" className="form-label">Dodaj nove slike</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="formFileMultiple"
                                        multiple
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={handleFileChange}
                                    />
                                    <div className="form-text">Nove slike bodo dodane obstoječim.</div>
                                </div>

                                <div className="d-grid gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary py-2"
                                        disabled={uploading}
                                    >
                                        {uploading ? "Shranjevanje..." : "Shrani spremembe"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate(`/locations/${id}`)}
                                    >
                                        Prekliči
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationEdit;