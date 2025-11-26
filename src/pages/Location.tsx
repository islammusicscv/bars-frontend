import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import apiClient from "../services/axiosInstance.ts";
import axios from "axios";
import Card from "../components/Card.tsx";
import CardComment from "../components/CardComment.tsx";

const Location = () => {
    const [location, setLocation] = useState('');
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const {id} = useParams();

    const getComments = async () => {
        const res = await apiClient.get(`/comments/location/${id}`);

        if (res.status === 200) {
            setComments(res.data);
            console.log(res.data);
        }
    }

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

    useEffect(() => {
        fetchData();
        getComments();
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
          <hr />
          {comments.map((comment)=>(
              <CardComment key={comment.id} comment={comment.content, comment.createdAt}/>
          ))}

      </>
  )
}
export default Location;