import ResultsPanel from './ResultsPanel.jsx';
import MapComponent from './MapComponent.jsx';

const Query = () => {
    document.body.style.backgroundColor = 'var(--color-brown)';
    return (
        <div>
            <h1 className="py-6 flex justify-center align-middle text-white text-2xl font-bold">
                Showing results for ...
            </h1>
            <div className="flex">
                <div className="flex-1 w-[40%]"><ResultsPanel/></div>
                <div className="flex-1"><MapComponent/></div>
            </div>
        </div>
    )
}

export default Query