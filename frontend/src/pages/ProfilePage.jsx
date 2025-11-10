import NavBar from '../components/shared/NavBar';
import sample_pfp from '../assets/sample_pfp.jpg';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <NavBar />
      </div>
      <Profile />
    </div>
  );
};

// Mock user data (replace with props or API call)
const user = {
  name: 'Timothy Nguyen',
  joined: 'December 2024',
  totalReviews: 18,
  favoriteCafes: [
    { name: 'Cafe Réveille', location: 'Berkeley, CA', rating: 4.8 },
    { name: 'Artís Coffee', location: 'Berkeley, CA', rating: 4.6 },
    { name: 'Caffe Strada', location: 'Berkeley, CA', rating: 4.5 },
  ],
  reviews: [
    {
      cafe: 'Artís Coffee',
      date: 'Oct 20, 2025',
      rating: 5,
      comment: 'Great Wi-Fi and calm atmosphere for studying.',
    },
    {
      cafe: 'Cafe Réveille',
      date: 'Sept 18, 2025',
      rating: 4,
      comment: 'Love the natural light and latte art.',
    },
  ],
};

const Profile = () => {
  return (
    <div>
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 border border-gray-100">
          <div className="flex items-center">
            <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-dark-brown">
              <img src={sample_pfp} alt="Profile" />
            </div>
            <div className="flex items-center w-full ml-4 justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-gray-800">
                  {user.name}
                </h1>
                <p className="text-gray-500 text-sm">Joined {user.joined}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-700">
                  <span className="font-semibold text-lg">
                    {user.totalReviews}
                  </span>{' '}
                  reviews written
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Favorite Cafes */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Favorite Cafes
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {user.favoriteCafes.map((cafe, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <h3 className="text-lg font-medium text-gray-800">
                  {cafe.name}
                </h3>
                <p className="text-sm text-gray-500">{cafe.location}</p>
                <p className="text-yellow-500 mt-1">
                  ⭐ {cafe.rating.toFixed(1)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Recent Reviews
          </h2>
          <div className="space-y-4">
            {user.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-800">
                    {review.cafe}
                  </h3>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <p className="text-yellow-500">⭐ {review.rating}</p>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;