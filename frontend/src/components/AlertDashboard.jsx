/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Accordion, Button, Card, Table } from 'react-bootstrap';

const AlertDashboard = () => {
  // Placeholder data for outbreaks
  const outbreakData = [
    {
      disease: 'Disease A',
      totalCases: 1200,
      hospitalsInvolved: 15,
      hospitalList: [
        { name: 'Hospital 1', cases: 300 },
        { name: 'Hospital 2', cases: 400 },
        { name: 'Hospital 3', cases: 500 },
      ],
      isOutbreak: false,
    },
    {
      disease: 'Disease B',
      totalCases: 0,
      hospitalsInvolved: 0,
      hospitalList: [],
      isOutbreak: false,
    },
    {
      disease: 'Disease C',
      totalCases: 800,
      hospitalsInvolved: 10,
      hospitalList: [
        { name: 'Hospital 4', cases: 200 },
        { name: 'Hospital 5', cases: 300 },
        { name: 'Hospital 6', cases: 300 },
      ],
      isOutbreak: false,
    },
  ];

  const potentialOutbreakData = [
    {
      disease: 'Disease D',
      totalCases: 500,
      hospitalsInvolved: 5,
      hospitalList: [
        { name: 'Hospital 7', cases: 100 },
        { name: 'Hospital 8', cases: 150 },
        { name: 'Hospital 9', cases: 250 },
      ],
    },
    {
      disease: 'Disease E',
      totalCases: 700,
      hospitalsInvolved: 8,
      hospitalList: [
        { name: 'Hospital 10', cases: 200 },
        { name: 'Hospital 11', cases: 250 },
        { name: 'Hospital 12', cases: 250 },
      ],
    },
  ];

  // Find the diseases with outbreaks
  const activeOutbreaks = outbreakData.filter((outbreak) => outbreak.isOutbreak);
  const [currentOutbreakIndex, setCurrentOutbreakIndex] = useState(0);
  const currentOutbreak = activeOutbreaks[currentOutbreakIndex] || {};

  const handleToggleOutbreak = (index) => {
    setCurrentOutbreakIndex(index);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Alert Dashboard</h2>

      {/* Outbreak Alert Section */}
      <Card className={`mb-5 ${activeOutbreaks.length > 0 ? 'bg-danger text-white' : 'bg-success text-white'}`}>
        <Card.Body>
          {activeOutbreaks.length > 0 ? (
            <>
              <h4 className="card-title">Outbreak Alert: {currentOutbreak.disease}</h4>
              <p>Total Number of Cases: {currentOutbreak.totalCases}</p>
              <p>Total Number of Hospitals Involved: {currentOutbreak.hospitalsInvolved}</p>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>See List of Hospitals</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      {currentOutbreak.hospitalList?.map((hospital, index) => (
                        <li key={index}>{hospital.name} - {hospital.cases} cases</li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </>
          ) : (
            <h4 className="card-title">No outbreak pattern detected</h4>
          )}
        </Card.Body>
      </Card>

      {/* Toggle Outbreak Section */}
      {activeOutbreaks.length > 0 && (
        <div className="mb-4">
          <h3>Toggle Between Outbreaks</h3>
          {activeOutbreaks.map((outbreak, index) => (
            <Button
              key={index}
              variant={index === currentOutbreakIndex ? 'primary' : 'outline-primary'}
              className="me-2 mb-2"
              onClick={() => handleToggleOutbreak(index)}
            >
              {outbreak.disease}
            </Button>
          ))}
        </div>
      )}

      {/* Potential Outbreak Section */}
      <h3 className="mb-4">Potential Outbreaks</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Disease</th>
            <th>Total Cases</th>
            <th>Total Hospitals Involved</th>
            <th>Hospital Details</th>
          </tr>
        </thead>
        <tbody>
          {potentialOutbreakData.map((potentialOutbreak, index) => (
            <tr key={index}>
              <td>{potentialOutbreak.disease}</td>
              <td>{potentialOutbreak.totalCases}</td>
              <td>{potentialOutbreak.hospitalsInvolved}</td>
              <td>
                <Accordion>
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header>View Hospitals</Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        {potentialOutbreak.hospitalList.map((hospital, idx) => (
                          <li key={idx}>{hospital.name} - {hospital.cases} cases</li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AlertDashboard;
