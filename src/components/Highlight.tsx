interface HighlightProps {
    search?: string;
    text: string;
}

const Highlight = ({ search, text }: HighlightProps) => {
    if (!search || !text) {
        return <>{text}</>;
    }

    const searchList = search.split(' ')
    const parts = text.split(new RegExp(`(${searchList.join('|')})`, 'g'));

    return (
        <span className="text-base text-slate-700 ml-1">
            {parts.map((part, i) =>
                searchList.includes(part) ? (
                    <mark key={i}>{part}</mark>
                ) : (
                    part
                )
            )}
        </span>
    );
};

export default Highlight;
