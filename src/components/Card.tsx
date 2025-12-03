import type {Location} from '../interfaces/Location.ts';
import {Link} from "react-router-dom";

interface Props {
    location: Location;
}

const Card = ({location}: Props) => {

    const getImageUrl = () => {
        if (location.images && location.images.length > 0) {
            return `http://localhost:3000/uploads/${location.images[0].url}`;
        }
        return null;
    };

    const imageUrl = getImageUrl();

    return (
        <div className="col">
            <div className="card shadow-sm h-100 border-0 rounded-4 overflow-hidden hover-shadow transition">
                {/* Zgornji del s sliko in oceno */}
                <div className="position-relative" style={{ height: '200px' }}>
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            className="card-img-top w-100 h-100"
                            alt={location.title}
                            style={{ objectFit: 'cover' }}
                            onError={(e) => {
                                // Fallback, če slika ne obstaja
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('d-none');
                            }}
                        />
                    ) : null}

                    {/* Placeholder, če slike ni ali se ne naloži */}
                    <div className={`w-100 h-100 bg-dark d-flex align-items-center justify-content-center ${imageUrl ? 'd-none' : ''}`}>
                      <span className="text-white fs-1 fw-bold text-uppercase">
                          {location.title.charAt(0)}
                      </span>
                    </div>

                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-warning text-dark shadow-sm fs-6 rounded-pill px-3">
                          ★ {location.rating}
                      </span>
                    </div>
                </div>

                {/* Vsebina kartice */}
                <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title fw-bold mb-2 text-dark text-truncate" title={location.title}>
                        {location.title}
                    </h5>

                    {/* Omejitev opisa na 3 vrstice */}
                    <p className="card-text text-secondary small mb-4" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '4.5em' // Rezervira prostor tudi če je opis kratek
                    }}>
                        {location.description}
                    </p>

                    <div className="mt-auto">
                        <Link to={`/locations/${location.id}`} className="btn btn-outline-primary w-100 rounded-pill fw-semibold">
                            Poglej podrobnosti
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Card