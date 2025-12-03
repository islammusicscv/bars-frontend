import {useState} from "react";
import {useNavigate} from "react-router-dom";
import apiClient from "../services/axiosInstance.ts";
import type {CreateLocationData} from "../interfaces/CreateLocation.ts";

const LocationAdd = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [rating, setRating] = useState(5);

    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFiles(e.target.files);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data: CreateLocationData = {
            title,
            description,
            address,
            rating: Number(rating)
        };

        try {
            const res = await apiClient.post('/locations', data);

            if (res.status === 200 || res.status === 201) {
                const newLocationId = res.data.id;
                console.log("Lokacija ustvarjena, ID:", newLocationId);

                // dodaj slike
                if (selectedFiles && selectedFiles.length > 0) {
                    const formData = new FormData();

                    for (let i = 0; i < selectedFiles.length; i++) {
                        formData.append('files', selectedFiles[i]);
                    }

                    await apiClient.post(`/locations/${newLocationId}/images`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                }

                alert("Lokacija in slike uspešno dodane!");
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.message || "Napaka pri dodajanju lokacije ali slik.";
            alert(`Napaka: ${errorMsg}`);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-body p-4">
                            <h2 className="mb-4 text-center">Dodaj novo lokacijo</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="titleInput"
                                        placeholder="Naziv"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <label htmlFor="titleInput">Naziv lokacije</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <textarea
                                        className="form-control"
                                        placeholder="Opis"
                                        id="descInput"
                                        style={{height: '100px'}}
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                    <label htmlFor="descInput">Opis</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="addressInput"
                                        placeholder="Naslov"
                                        required
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                    <label htmlFor="addressInput">Naslov</label>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="ratingInput" className="form-label">Ocena (1-5)</label>
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
                                    <div className="text-center fw-bold">{rating}</div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="formFileMultiple" className="form-label">Dodaj slike lokacije</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="formFileMultiple"
                                        multiple
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={handleFileChange}
                                    />
                                    <div className="form-text">Izberete lahko več slik hkrati (max 5MB na sliko).</div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success w-100 py-2"
                                    disabled={uploading}
                                >
                                    {uploading ? (
                                        <span>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Shranjevanje...
                                        </span>
                                    ) : "Shrani lokacijo"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocationAdd;