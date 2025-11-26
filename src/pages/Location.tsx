import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import apiClient from "../services/axiosInstance.ts";

const Location = () => {
    const [location, setLocation] = useState('');
    const {id} = useParams();

    useEffect(() => {
        const fetchData =  async () => {
            try {
                const res = await apiClient.get(`/locations/${id}`);
                setLocation(res.data);
                //console.log(res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [id]);

    return (
      <>
        <h1>
            {location.title}
        </h1>
          <h3>
              {location.description}
          </h3>
          <div>
              Datum objave: {location.createdAt}
          </div>
          <h2>{location.rating}</h2>
          <div>
              {location.address}
          </div>
          <hr />
          <h2>Komentarji:</h2>
          <form>
              <input type='text' />
              <input type='submit' />
          </form>
      </>
  )
}
export default Location;