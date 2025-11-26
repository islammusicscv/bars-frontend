import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import apiClient from "../services/axiosInstance.ts";

const Location = () => {
    const [location, setLocation] = useState('');
    const [content, setContent] = useState('');
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            content: content,
            location_id: Number(id)
        }

        console.log(data);

        try {
            const res = await apiClient.post('/comments', data);
            console.log(res);

        }
        catch (err) {
            console.log(err);
        }
    }

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
          <form onSubmit={handleSubmit}>
              <input type='text' value={content}
                     onChange={(e) => setContent(e.target.value)} />
              <input type='submit' />
          </form>


      </>
  )
}
export default Location;