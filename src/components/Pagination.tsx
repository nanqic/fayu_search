import { Pagi } from "../reuests";

export default function Pagination({ total, pageSize, page, fetchData }: Pagi & { fetchData: (p: number) => void }) {
    const totalPages = Math.ceil(total / pageSize);
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <button
                key={i}
                onClick={() => fetchData(i)}
                className={`join-item btn ${i === page ? 'btn-active' : ''}`}
            >
                {i}
            </button>
        );
    }

    return <div className="join flex-wrap">{pages}</div>;
}
