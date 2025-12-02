import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import apiClient from "../services/axiosInstance.ts";
import CardComment from "../components/CardComment.tsx";

const Location = () => {
    const [location, setLocation] = useState<Location | null>(null);
    const [content, setContent] = useState<string>('');
    const [comments, setComments] = useState<Comment[]>([]);
    const {id} = useParams();

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
        <div className="container mt-4">
            <h1 className="display-4">
                {location.title}
            </h1>
            <p className="lead">
                {location.description}
            </p>
            <div className="text-muted mb-3">
                Datum objave: {location.createdAt.toString()}
            </div>
            <div className="mb-3">
                <strong>Ocena: </strong> {location.rating} / 5
            </div>
            <div className="mb-4">
                <strong>Naslov: </strong> {location.address}
            </div>

            <hr />

            <h3>Komentarji</h3>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="input-group">
                    <input
                        type='text'
                        className="form-control"
                        placeholder="Dodaj komentar..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button type='submit' className="btn btn-primary">Pošlji</button>
                </div>
            </form>

            <div className="d-flex flex-column gap-3">
                {comments.map((comment)=>(
                    <CardComment
                        key={comment.id}
                        content={comment.content}
                        createdAt={comment.createdAt}
                    />
                ))}
            </div>
        </div>
    )
}
export default Location;