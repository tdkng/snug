import sample_pfp from '../assets/sample_pfp.jpg';
import home_bg from '../assets/cafe_bg.jpg';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SideBar } from '@/components/shared/SideBar';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider>
        <SideBar />
        <Profile />
      </SidebarProvider>
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
    <div className="py-24 max-w-4xl w-[80%] mx-auto">
      <div className="rounded-2xl">
        {/* Profile Header */}
        <div className="bg-brown bt-8 overflow-hidden rounded-t-2xl">
          <img
            className="h-[calc(30vh)] w-full object-cover object-center opacity-45"
            src={home_bg}
            alt="Background"
          />
        </div>
        <div className="relative bg-white rounded-b-2xl shadow-sm p-8 mb-8 border border-gray-100">
          <div className="absolute -top-18 w-36 h-36 overflow-clip rounded-full aspect-square object-cover">
            <img src={sample_pfp} alt="Profile" />
          </div>
          <div className="mt-16 flex items-center">
            <div className="flex items-center ml-4 w-full justify-between">
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
