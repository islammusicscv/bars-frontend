import apiClient from "../services/axiosInstance.ts";

interface Props {
    id: number;
    content: string;
    createdAt: Date;
    user: {
        id: number;
        first_name: string;
        last_name: string;
    };
    currentUserId: number | null;
    onDelete: () => void;
}

const CardComment = ({id, content, createdAt, user, currentUserId, onDelete}: Props) => {
    const formatDate = (dateVal: string | Date) => {
        if (!dateVal) return '';
        const d = new Date(dateVal);
        return isNaN(d.getTime()) ? String(dateVal) : d.toLocaleDateString('sl-SI');
    };

    const isAuthor = currentUserId != null && user?.id != null && Number(user.id) === Number(currentUserId);

    const handleDelete = async () => {
        if (confirm("Ali ste prepričani, da želite izbrisati ta komentar?")) {
            try {
                await apiClient.delete(`/comments/${id}`);
                onDelete(); // Osveži seznam
            } catch (err) {
                console.error("Napaka pri brisanju komentarja:", err);
                alert("Napaka pri brisanju komentarja.");
            }
        }
    };

    return (
        <div className="card mb-2 p-3 shadow-sm border-0 bg-white">
            <div className="d-flex justify-content-between">
                <div className="fw-bold mb-1 text-primary">{user.first_name} {user.last_name}</div>
                <small className="text-muted">{formatDate(createdAt)}</small>
                { isAuthor && (
                    <button
                        className="btn btn-sm btn-outline-danger ms-2"
                        onClick={handleDelete}
                        title="Izbriši komentar"
                    >
                        Izbriši
                    </button>
                )}
            </div>
            <div className="mb-1 text-dark">
                {content}
            </div>
        </div>
    )
}
export default CardComment