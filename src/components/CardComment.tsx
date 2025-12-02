interface Props {
    content: string;
    createdAt: Date;
    user: {
        first_name: string;
        last_name: string;
    };
}

const CardComment = ({content, createdAt, user}: Props) => {
    const formatDate = (dateVal: string | Date) => {
        if (!dateVal) return '';
        const d = new Date(dateVal);
        return isNaN(d.getTime()) ? String(dateVal) : d.toLocaleDateString('sl-SI');
    };

    return (
        <div className="card mb-2 p-3 shadow-sm border-0 bg-white">
            <div className="d-flex justify-content-between">
                <div className="fw-bold mb-1 text-primary">{user.first_name} {user.last_name}</div>
                <small className="text-muted">{formatDate(createdAt)}</small>
            </div>
            <div className="mb-1 text-dark">
                {content}
            </div>
        </div>
    )
}
export default CardComment