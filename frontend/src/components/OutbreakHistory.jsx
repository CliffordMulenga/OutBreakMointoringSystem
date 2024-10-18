/* eslint-disable no-unused-vars */
import React from 'react';
import { Table, Accordion, Card } from 'react-bootstrap';

const OutbreakHistory = () => {
  const outbreakData = [
    {
      year: 2022,
      disease: 'Disease A',
      totalCases: 1200,
      hospitalsInvolved: 15,
      hospitalList: ['Hospital 1', 'Hospital 2', 'Hospital 3'],
    },
    {
      year: 2021,
      disease: 'Disease B',
      totalCases: 800,
      hospitalsInvolved: 10,
      hospitalList: ['Hospital 4', 'Hospital 5'],
    },
    {
      year: 2020,
      disease: 'Disease C',
      totalCases: 500,
      hospitalsInvolved: 7,
      hospitalList: ['Hospital 6', 'Hospital 7', 'Hospital 8'],
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Outbreak History</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Year</th>
            <th>Disease</th>
            <th>Total Cases</th>
            <th>Total Hospitals Involved</th>
            <th>Hospital Details</th>
          </tr>
        </thead>
        <tbody>
          {outbreakData.map((outbreak, index) => (
            <tr key={index}>
              <td>{outbreak.year}</td>
              <td>{outbreak.disease}</td>
              <td>{outbreak.totalCases}</td>
              <td>{outbreak.hospitalsInvolved}</td>
              <td>
                <Accordion>
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header>View Hospitals</Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        {outbreak.hospitalList.map((hospital, idx) => (
                          <li key={idx}>{hospital}</li>
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

export default OutbreakHistory;
