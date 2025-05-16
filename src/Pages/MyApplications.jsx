import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner, Alert } from 'react-bootstrap';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log("MyApplications mounted");
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/adoptions/mine', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setApplications(data.applications);
          setError('');
        } else {
          setError(data.message || 'Failed to load applications');
        }
      } catch (err) {
        setError('Server error');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <Spinner animation="border" role="status" className="mt-5"><span className="visually-hidden">Loading...</span></Spinner>;

  if (error) return <Alert variant="danger" className="mt-5">{error}</Alert>;

  return (
    <Container className="my-5">
      <h2>My Adoption Applications</h2>
      {applications.length === 0 ? (
        <p>You have not submitted any adoption applications yet.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Type</th>
              <th>Breed</th>
              <th>Adoption Type</th>
              <th>Status</th>
              <th>Submitted On</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id}>
                <td>{app.petId?.name || 'N/A'}</td>
<td>{app.petId?.type || 'N/A'}</td>
<td>{app.petId?.breed || 'N/A'}</td>

                <td>{app.adoptionType}</td>
                <td>{app.status}</td>
                <td>{new Date(app.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MyApplications;
