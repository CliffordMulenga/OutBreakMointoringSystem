/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';

const HospitalDashboard = () => {
  const [hospitals, setHospitals] = useState([
    { id: 1, name: 'Hospital 1', diseases: [] },
    { id: 2, name: 'Hospital 2', diseases: [] },
    { id: 3, name: 'Hospital 3', diseases: [] },
  ]);

  const [diseases, setDiseases] = useState([
    { id: 1, name: 'Disease A' },
    { id: 2, name: 'Disease B' },
    { id: 3, name: 'Disease C' },
  ]);

  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showAddCaseModal, setShowAddCaseModal] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState('');
  const [newCases, setNewCases] = useState('');


  const [newHospital, setNewHospital] = useState('');
  const [newDisease, setNewDisease] = useState('');
  const [showHospitalModal, setShowHospitalModal] = useState(false);
  const [showDiseaseModal, setShowDiseaseModal] = useState(false);
// show disease edit
  const [showDiseaseEditModal, setShowDiseaseEditModal] = useState(false);
  const [showEditCasesModal, setShowEditCasesModal] = useState(false);
  const [editCases, setEditCases] = useState('');
  const [diseaseToEdit, setDiseaseToEdit] = useState(null);

  // Function to handle opening and closing of modals
  const handleShowHospitalModal = () => setShowHospitalModal(true);
  const handleCloseHospitalModal = () => setShowHospitalModal(false);
  const handleShowDiseaseModal = () => setShowDiseaseModal(true);

  // show disease edit
  const handleShowDiseaseEditModal = () => setShowDiseaseEditModal(true);
  const handleCloseDiseaseEditModal = () => setShowDiseaseEditModal(false);

  const handleCloseDiseaseModal = () => setShowDiseaseModal(false);

  // Add a new hospital
  const handleAddHospital = () => {
    if (newHospital.trim()) {
      setHospitals([...hospitals, { id: hospitals.length + 1, name: newHospital, diseases: [] }]);
      setNewHospital('');
      handleCloseHospitalModal();
    }
  };

  // Add a new disease
  const handleAddDisease = () => {
    if (newDisease.trim()) {
      setDiseases([...diseases, { id: diseases.length + 1, name: newDisease }]);
      setNewDisease('');
      handleCloseDiseaseModal();
    }
  };

  const handleSaveDisease = () => {
    const updatedDiseases = diseases.map(disease => {
      if (disease.id === diseaseToEdit.id) {
        return { ...disease, name: newDisease }; // Update the name of the existing disease
      }
      return disease;
    });
  
    setDiseases(updatedDiseases);
    setNewDisease(''); // Clear input after saving
    handleCloseDiseaseModal(); // Close the modal
  };
   

  // Select a hospital to view its diseases
  const handleSelectHospital = (hospital) => {
    setSelectedHospital(hospital);
  };

  // Open modal to add cases to a specific disease for the selected hospital
  const handleAddCases = () => {
    setShowAddCaseModal(true);
  };

  const handleSaveCases = () => {
    const updatedHospitals = hospitals.map((hospital) => {
      if (hospital.id === selectedHospital.id) {
        const existingDisease = hospital.diseases.find((d) => d.name === selectedDisease);

        if (existingDisease) {
          existingDisease.cases += parseInt(newCases);
        } else {
          hospital.diseases.push({ name: selectedDisease, cases: parseInt(newCases) });
        }
      }
      return hospital;
    });

    setHospitals(updatedHospitals);
    setNewCases('');
    setSelectedDisease('');
    setShowAddCaseModal(false);
  };

  // Open modal to edit cases for a specific disease in a selected hospital
  const handleEditCases = (disease) => {
    setDiseaseToEdit(disease);
    setEditCases(disease.cases);
    setShowEditCasesModal(true);
  };

  const handleSaveEditCases = () => {
    const updatedHospitals = hospitals.map((hospital) => {
      if (hospital.id === selectedHospital.id) {
        hospital.diseases = hospital.diseases.map((disease) =>
          disease.name === diseaseToEdit.name ? { ...disease, cases: parseInt(editCases) } : disease
        );
      }
      return hospital;
    });

    setHospitals(updatedHospitals);
    setEditCases('');
    setShowEditCasesModal(false);
  };

  return (
    <div className="container mt-5">
      <h2>Hospital Dashboard</h2>

      {/* Section to Add Hospitals and Diseases */}
      <div className="mb-5">
        <h3>Manage Hospitals and Diseases</h3>
        <Button variant="primary" onClick={handleShowHospitalModal} className="me-3">
          Add Hospital
        </Button>
        <Button variant="primary" onClick={handleShowDiseaseModal}>
          Add Disease
        </Button>
      </div>

      {/* Disease List Dropdown */}
      <div className="mb-5">
  <h4>List of Diseases</h4>
  <Form.Select
    aria-label="List of Diseases"
    onChange={(e) => {
      const selectedDisease = diseases.find(d => d.name === e.target.value);
      setSelectedDisease(selectedDisease ? selectedDisease.name : '');
    }}
  >
    <option>Select a disease to view details</option>
    {diseases.map((disease) => (
      <option key={disease.id} value={disease.name}>
        {disease.name}
      </option>
    ))}
  </Form.Select>

  {selectedDisease && (
  <div className="mt-3">
    <Button
      variant="warning"
      onClick={() => {
        const diseaseToEdit = diseases.find(d => d.name === selectedDisease);
        setDiseaseToEdit(diseaseToEdit);
        setNewDisease(diseaseToEdit.name); // Set the current disease name in the input field
        handleShowDiseaseEditModal(); // Open the modal to edit
      }}
    >
      Edit Disease
    </Button>
    <Button
      variant="danger"
      className="ms-2"
      onClick={() => {
        setDiseases(diseases.filter(d => d.name !== selectedDisease));
        setSelectedDisease(''); // Clear selection after deletion
      }}
    >
      Delete Disease
    </Button>
  </div>
)}

</div>



      {/* Section to Select Hospital and View its Disease Data */}
      <div className="mb-5">
        <h3>Select Hospital</h3>
        <Form.Select onChange={(e) => handleSelectHospital(hospitals.find(h => h.id === parseInt(e.target.value)))} aria-label="Select Hospital">
          <option>Select a hospital</option>
          {hospitals.map((hospital) => (
            <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
          ))}
        </Form.Select>

        {selectedHospital && (
          <div className="mt-4">
            <h4>{selectedHospital.name} - Disease Data</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Disease</th>
                  <th>Number of Cases</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {selectedHospital.diseases.length > 0 ? (
                  selectedHospital.diseases.map((disease, index) => (
                    <tr key={index}>
                      <td>{disease.name}</td>
                      <td>{disease.cases}</td>
                      <td>
                        <Button variant="warning" onClick={() => handleEditCases(disease)}>
                          Edit Cases
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No disease data available for this hospital.</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Button variant="success" onClick={handleAddCases}>
              Add Cases
            </Button>
          </div>
        )}
      </div>

      {/* Add Hospital Modal */}
      <Modal show={showHospitalModal} onHide={handleCloseHospitalModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Hospital</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Hospital Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter hospital name"
                value={newHospital}
                onChange={(e) => setNewHospital(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseHospitalModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddHospital}>
            Add Hospital
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Disease Modal */}
      <Modal show={showDiseaseModal} onHide={handleCloseDiseaseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Disease</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Disease Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter disease name"
                value={newDisease}
                onChange={(e) => setNewDisease(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDiseaseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddDisease}>
            Add Disease
          </Button>
        </Modal.Footer>
      </Modal>

    {/* Edit disease Modal */}

    <Modal show={showDiseaseEditModal} onHide={handleCloseDiseaseModal}>
  <Modal.Header closeButton>
    <Modal.Title>{diseaseToEdit ? 'Edit Disease' : 'Add Disease'}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group>
        <Form.Label>Disease Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter disease name"
          value={newDisease}
          onChange={(e) => setNewDisease(e.target.value)}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseDiseaseEditModal}>
      Close
    </Button>
    <Button variant="primary" onClick={handleSaveDisease}>
      {/* {diseaseToEdit ? 'Save Changes' : 'Add Disease'} */} save
    </Button>
  </Modal.Footer>
</Modal>


      {/* Edit Cases Modal */}
      <Modal show={showEditCasesModal} onHide={() => setShowEditCasesModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Cases</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Number of Cases</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter updated number of cases"
                value={editCases}
                onChange={(e) => setEditCases(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditCasesModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEditCases}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Cases Modal */}
      <Modal show={showAddCaseModal} onHide={() => setShowAddCaseModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Cases</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Select Disease</Form.Label>
              <Form.Select
                value={selectedDisease}
                onChange={(e) => setSelectedDisease(e.target.value)}
                aria-label="Select Disease"
              >
                <option>Select a disease</option>
                {diseases.map((disease) => (
                  <option key={disease.id} value={disease.name}>
                    {disease.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Number of Cases</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of cases"
                value={newCases}
                onChange={(e) => setNewCases(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddCaseModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveCases}>
            Add Cases
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HospitalDashboard;


// This is the best state
