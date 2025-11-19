import type {Location} from '../interfaces/location.ts';

interface Props {
    location: Location;
}

const Card = ({location}: Props) => {
  return (
      <>
          <div className="col">
              <div className="card shadow-sm">
                  <svg aria-label="Placeholder: Thumbnail" className="bd-placeholder-img card-img-top"
                       height="225" preserveAspectRatio="xMidYMid slice" role="img" width="100%"
                       xmlns="http://www.w3.org/2000/svg"><title>Placeholder</title>
                      <rect width="100%" height="100%" fill="#55595c"></rect>
                      <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                  </svg>
                  <div className="card-body"><p className="card-text">{location.title}</p>
                      <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                              <button type="button" className="btn btn-sm btn-outline-secondary">View
                              </button>
                              <button type="button" className="btn btn-sm btn-outline-secondary">Edit
                              </button>
                          </div>
                          <small className="text-body-secondary">{location.rating}</small></div>
                  </div>
              </div>
          </div>
      </>
  )
}
export default Card