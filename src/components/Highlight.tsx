interface HighlightProps {
    search?: string;
    text: string;
}

const Highlight = ({ search, text }: HighlightProps) => {
    if (!search || !text) {
        return <>{text}</>;
    }

    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return (
        <span>
            {parts.map((part, i) =>
                part.toLowerCase() === search.toLowerCase() ? (
                    <mark key={i}>{part}</mark>
                ) : (
                    part
                )
            )}
        </span>
    );
};

export default Highlight;
