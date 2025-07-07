import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/axios';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'owner') navigate('/owner/dashboard');
    else if (user?.role === 'admin') navigate('/admin/verify-owners');
  }, [user, navigate]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await API.get('/hotels');
        setHotels(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="row">
      {hotels.map((hotel) => (
        <div className="col-md-4 mb-4" key={hotel._id}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{hotel.name}</h5>
              <p>{hotel.description}</p>
              <p><strong>Location:</strong> {hotel.location}</p>
              <Link to={`/hotel/${hotel._id}`} className="btn btn-primary">View Details</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;