import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Toast } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const MyListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  const [selectedListing, setSelectedListing] = useState(null);
  const [newListing, setNewListing] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    description: '',
    status: 'available'
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get(`/api/pets/user/${user._id}`);
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
      showWarningToast('Error fetching your listings');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAddListing = async () => {
    try {
      const response = await axios.post('/api/pets', {
        ...newListing,
        userId: user._id
      });
      setListings([...listings, response.data]);
      setShowAddModal(false);
      setNewListing({
        name: '',
        species: '',
        breed: '',
        age: '',
        description: '',
        status: 'available'
      });
      showSuccessToast('Listing added successfully');
    } catch (error) {
      console.error('Error adding listing:', error);
      showWarningToast('Error adding listing');
    }
  };

  const handleEditListing = async () => {
    try {
      const response = await axios.put(`/api/pets/${selectedListing._id}`, selectedListing);
      setListings(listings.map(listing => 
        listing._id === selectedListing._id 
          ? response.data 
          : listing
      ));
      setShowEditModal(false);
      showSuccessToast('Listing updated successfully');
    } catch (error) {
      console.error('Error updating listing:', error);
      showWarningToast('Error updating listing');
    }
  };

  const handleDeleteListing = async () => {
    try {
      await axios.delete(`/api/pets/${selectedListing._id}`);
      setListings(listings.filter(listing => listing._id !== selectedListing._id));
      setShowDeleteModal(false);
      showSuccessToast('Listing deleted successfully');
    } catch (error) {
      console.error('Error deleting listing:', error);
      showWarningToast('Error deleting listing');
    }
  };

  const showSuccessToast = (message) => {
    setToastMessage(message);
    setToastVariant('success');
    setShowToast(true);
  };

  const showWarningToast = (message) => {
    setToastMessage(message);
    setToastVariant('warning');
    setShowToast(true);
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="mb-0">My Listings</h2>
        </Col>
        <Col className="text-end">
          <Button
            variant="primary"
            onClick={() => setShowAddModal(true)}
            className="me-2"
            title="Add New Listing"
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Add Listing
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Species</th>
                    <th>Breed</th>
                    <th>Age</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map(listing => (
                    <tr key={listing._id}>
                      <td>{listing.name}</td>
                      <td>{listing.species}</td>
                      <td>{listing.breed}</td>
                      <td>{listing.age}</td>
                      <td>
                        <span className={`badge ${listing.status === 'adopted' ? 'bg-success' : 'bg-warning'}`}>
                          {listing.status}
                        </span>
                      </td>
                      <td>{formatDate(listing.createdAt)}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => {
                            setSelectedListing(listing);
                            setShowEditModal(true);
                          }}
                          className="me-2"
                          title="Edit"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => {
                            setSelectedListing(listing);
                            setShowDeleteModal(true);
                          }}
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add Listing Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pet name"
                value={newListing.name}
                onChange={(e) => setNewListing({ ...newListing, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="species" className="mb-3">
              <Form.Label>Species</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter species"
                value={newListing.species}
                onChange={(e) => setNewListing({ ...newListing, species: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="breed" className="mb-3">
              <Form.Label>Breed</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter breed"
                value={newListing.breed}
                onChange={(e) => setNewListing({ ...newListing, breed: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="age" className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter age"
                value={newListing.age}
                onChange={(e) => setNewListing({ ...newListing, age: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter pet description"
                value={newListing.description}
                onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="status" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newListing.status}
                onChange={(e) => setNewListing({ ...newListing, status: e.target.value })}
              >
                <option value="available">Available</option>
                <option value="adopted">Adopted</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddListing}>
            Add Listing
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Listing Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pet name"
                value={selectedListing?.name || ''}
                onChange={(e) => setSelectedListing({ ...selectedListing, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="species" className="mb-3">
              <Form.Label>Species</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter species"
                value={selectedListing?.species || ''}
                onChange={(e) => setSelectedListing({ ...selectedListing, species: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="breed" className="mb-3">
              <Form.Label>Breed</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter breed"
                value={selectedListing?.breed || ''}
                onChange={(e) => setSelectedListing({ ...selectedListing, breed: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="age" className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter age"
                value={selectedListing?.age || ''}
                onChange={(e) => setSelectedListing({ ...selectedListing, age: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter pet description"
                value={selectedListing?.description || ''}
                onChange={(e) => setSelectedListing({ ...selectedListing, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="status" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={selectedListing?.status || ''}
                onChange={(e) => setSelectedListing({ ...selectedListing, status: e.target.value })}
              >
                <option value="available">Available</option>
                <option value="adopted">Adopted</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditListing}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this listing?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteListing}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        className="position-fixed top-0 end-0 mt-3 me-3"
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">{toastVariant === 'success' ? 'Success' : 'Warning'}</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
};

export default MyListings;