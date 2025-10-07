import ResultsPanel from './ResultsPanel.jsx';

const Query = () => {
    document.body.style.backgroundColor = 'var(--color-brown)';
    return (
        <div>
            <h1 className="py-6 flex justify-center align-middle text-white text-2xl font-bold">
                Showing results for ...
            </h1>
            <div className="flex items-center">
                <div><ResultsPanel/></div>
                <img
                    className="h-full w-full object-cover object-center"
                    src="https://placehold.co/600x400"
                />
            </div>
        </div>
    )
}

export default Query