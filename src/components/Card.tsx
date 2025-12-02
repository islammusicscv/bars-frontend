import type {Location} from '../interfaces/Location.ts';
import {Link} from "react-router-dom";

interface Props {
    location: Location;
}

const Card = ({location}: Props) => {
    return (
        <div className="col">
            <div className="card shadow-sm h-100 border-0 rounded-4 overflow-hidden hover-shadow transition">
                {/* Zgornji del s sliko in oceno */}
                <div className="position-relative">
                    <svg aria-label="Placeholder: Thumbnail" className="bd-placeholder-img card-img-top"
                         height="200" preserveAspectRatio="xMidYMid slice" role="img" width="100%"
                         xmlns="http://www.w3.org/2000/svg" style={{objectFit: 'cover'}}>
                        <rect width="100%" height="100%" fill="#343a40"></rect>
                        <text x="50%" y="50%" fill="#f8f9fa" dy=".3em" fontSize="2rem" textAnchor="middle" fontWeight="bold">
                            {location.title.charAt(0).toUpperCase()}
                        </text>
                    </svg>
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