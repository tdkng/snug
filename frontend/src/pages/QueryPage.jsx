import ResultsPanel from '../components/query/ResultsPanel.jsx';
import MapComponent from '../components/query/MapComponent.jsx';
import NavBar from '../components/shared/NavBar.jsx';

const Query = () => {
  return (
    <div>
      <div className="p-4">
        <NavBar />
      </div>
      <h1 className="py-6 flex justify-center align-middle text-white text-2xl font-bold">
        Showing results for ...
      </h1>
      <div className="flex">
        <div className="flex-1 w-[40%]">
          <ResultsPanel />
        </div>
        <div className="flex-1">
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default Query;
