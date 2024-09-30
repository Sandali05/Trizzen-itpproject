import React, { useEffect, useState } from 'react';
import gif from './img/sale-gif.gif'


interface NewsfeedItem {
  _id: string;
  description: string;
  discount: number;
  itemId: string;
  createdAt: string;
  updatedAt: string;
}

const News: React.FC = () => {
  const [newsfeeds, setNewsfeeds] = useState<NewsfeedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsfeeds = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/newsfeeds');
        const data = await response.json();
        setNewsfeeds(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching newsfeeds');
        setLoading(false);
      }
    };
    fetchNewsfeeds();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 max-w-screen-xl mx-auto my-20">
      {newsfeeds.length > 0 ? (
        newsfeeds.map((newsfeed) => (
          <div key={newsfeed._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 duration-300">
            
            {/* Display a random GIF or a relevant static image for each news */}
            <img
              src={gif}
              alt="News GIF"
              className="w-full h-40 object-cover"
            />
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{newsfeed.description}</h3>
              <p className="text-gray-600">Discount: <span className="font-bold text-green-600">{newsfeed.discount}%</span></p>
              <p className="mt-4 text-xs text-gray-500">Created at: {new Date(newsfeed.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 col-span-full">No newsfeeds available</div>
      )}
    </div>
  );
};

export default News;
