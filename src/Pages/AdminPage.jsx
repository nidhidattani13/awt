import React, { useState } from 'react';
import { 
  Container, Row, Col, Table, Alert, 
  Card, Badge, Tabs, Tab, Modal, Form, Button, Toast
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const AdminPage = () => {
  const [key, setKey] = useState('applications');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  const [selectedItem, setSelectedItem] = useState(null);
  const [editType, setEditType] = useState('');
  
  // Move mock data into state so it can be updated
  const [applications, setApplications] = useState([
    {
      _id: '1',
      petName: 'Max',
      petType: 'Dog',
      applicantName: 'John Doe',
      applicantEmail: 'john@example.com',
      status: 'pending',
      createdAt: new Date().toISOString()
    },
    {
      _id: '2',
      petName: 'Bella',
      petType: 'Cat',
      applicantName: 'Jane Smith',
      applicantEmail: 'jane@example.com',
      status: 'approved',
      createdAt: new Date().toISOString()
    }
  ]);

  const [pets, setPets] = useState([
    {
      _id: '1',
      name: 'Max',
      species: 'Dog',
      breed: 'Labrador',
      age: '2',
      status: 'available',
      createdAt: new Date().toISOString()
    },
    {
      _id: '2',
      name: 'Bella',
      species: 'Cat',
      breed: 'Siamese',
      age: '1',
      status: 'adopted',
      createdAt: new Date().toISOString()
    }
  ]);

  const [users] = useState([
    {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      createdAt: new Date().toISOString()
    },
    {
      _id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      createdAt: new Date().toISOString()
    }
  ]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const openEditModal = (item, type) => {
    setSelectedItem(item);
    setEditType(type);
    setShowEditModal(true);
  };

  const openDeleteModal = (item, type) => {
    setSelectedItem(item);
    setEditType(type);
    setShowDeleteModal(true);
  };

  const handleEdit = () => {
    if (!selectedItem) return;

    const updatedItem = { ...selectedItem };
    
    if (editType === 'application') {
      const updatedApps = applications.map(app => 
        app._id === selectedItem._id 
          ? updatedItem 
          : app
      );
      setApplications(updatedApps);
    } else if (editType === 'pet') {
      const updatedPets = pets.map(pet => 
        pet._id === selectedItem._id 
          ? updatedItem 
          : pet
      );
      setPets(updatedPets);
    }

    setShowEditModal(false);
    showSuccessToast('Item updated successfully');
  };

  const handleDelete = () => {
    if (!selectedItem) return;

    if (editType === 'application') {
      setApplications(applications.filter(app => app._id !== selectedItem._id));
    } else if (editType === 'pet') {
      setPets(pets.filter(pet => pet._id !== selectedItem._id));
    }

    setShowDeleteModal(false);
    showSuccessToast('Item deleted successfully');
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
          <h2 className="mb-0">Admin Dashboard</h2>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Adoption Applications</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Pet Name</th>
                    <th>Pet Type</th>
                    <th>Applicant</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app._id}>
                      <td>{app.petName}</td>
                      <td>{app.petType}</td>
                      <td>{app.applicantName}</td>
                      <td>{app.applicantEmail}</td>
                      <td>
                        <Badge bg={app.status === 'approved' ? 'success' : app.status === 'rejected' ? 'danger' : 'warning'}>
                          {app.status}
                        </Badge>
                      </td>
                      <td>{formatDate(app.createdAt)}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => openEditModal(app, 'application')}
                          className="me-2"
                          title="Edit"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => openDeleteModal(app, 'application')}
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

      <Row>
        <Col>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Listed Pets</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Breed</th>
                    <th>Age</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pets.map(pet => (
                    <tr key={pet._id}>
                      <td>{pet.name}</td>
                      <td>{pet.species}</td>
                      <td>{pet.breed}</td>
                      <td>{pet.age}</td>
                      <td>
                        <Badge bg={pet.status === 'adopted' ? 'success' : 'warning'}>
                          {pet.status}
                        </Badge>
                      </td>
                      <td>{formatDate(pet.createdAt)}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => openEditModal(pet, 'pet')}
                          className="me-2"
                          title="Edit"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => openDeleteModal(pet, 'pet')}
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

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Users</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <Badge bg={user.role === 'admin' ? 'danger' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </td>
                      <td>{formatDate(user.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editType === 'application' ? 'Edit Application' : 'Edit Pet'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {editType === 'application' && (
              <>
                <Form.Group controlId="petName" className="mb-3">
                  <Form.Label>Pet Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter pet name"
                    value={selectedItem?.petName || ''}
                    onChange={(e) => setSelectedItem({ ...selectedItem, petName: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="petType" className="mb-3">
                  <Form.Label>Pet Type</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter pet type"
                    value={selectedItem?.petType || ''}
                    onChange={(e) => setSelectedItem({ ...selectedItem, petType: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="status" className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    className="form-select"
                    value={selectedItem?.status || ''}
                    onChange={(e) => setSelectedItem({ ...selectedItem, status: e.target.value })}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}
            {editType === 'pet' && (
              <>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter pet name"
                    value={selectedItem?.name || ''}
                    onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="species" className="mb-3">
                  <Form.Label>Species</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter species"
                    value={selectedItem?.species || ''}
                    onChange={(e) => setSelectedItem({ ...selectedItem, species: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="breed" className="mb-3">
                  <Form.Label>Breed</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter breed"
                    value={selectedItem?.breed || ''}
                    onChange={(e) => setSelectedItem({ ...selectedItem, breed: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="age" className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter age"
                    value={selectedItem?.age || ''}
                    onChange={(e) => setSelectedItem({ ...selectedItem, age: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="status" className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    className="form-select"
                    value={selectedItem?.status || ''}
                    onChange={(e) => setSelectedItem({ ...selectedItem, status: e.target.value })}
                  >
                    <option value="available">Available</option>
                    <option value="adopted">Adopted</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
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
          Are you sure you want to delete this {editType === 'application' ? 'application' : 'pet'}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
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

export default AdminPage;