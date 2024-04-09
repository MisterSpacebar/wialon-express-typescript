import React, { useEffect, useState } from 'react';
import { server } from '../App';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/unitModal.css';

interface UnitModalProps {
  show: boolean;
  onHide: () => void;
  unit: { [key:string]:any } | null;
  session_id: string;
}

const UnitModal: React.FC<UnitModalProps> = ({ show, onHide, unit, session_id }) => {
  console.log('unit:', unit);

  const [name, setName] = useState('');
  const [imei, setImei] = useState('');
  const [warning, setWarning] = useState<string | null>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setName(event.target.value);
  };
  const handleImeiChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImei(event.target.value);
  };

  // makes sure the text areas are cleared when the modal is closed
  useEffect(() => {
    if (show) {
      setName('');
      setImei('');
    }
  }, [show]);

  console.log('Name text:', name);
  console.log('IMEI text:', imei);

  // Send the data to the server to be processed
  const handleSave = async () => {
    console.log('Save button clicked');

    let nameArray = name.split('\n');
    let imeiArray = imei.split('\n');

    console.log('Name:', nameArray);
    console.log('IMEI:', imeiArray);

    // set up the return object
    let unitData = {
      session_id: session_id,
      names: nameArray,
      imeis: imeiArray,
      unit_properties: unit
    };

    console.log('(unitModal) Data:', JSON.stringify(unitData));

    try {
      console.log('Server:', server.port+'/upload/units');
      

      const response = await fetch(server.port+'/upload/units', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(unitData)
      });

      if (response.ok) {
        console.log('Data sent to express server successfully');
        setWarning('Data sent to express server successfully');
        alert('Data sent to express server successfully');
        // Handle success case here
      } else {
        console.log('Failed to send data');
        console.log('Failed to send data');
        alert('Failed to send data');
        // Handle failure case here
      }
    } catch (error) {
      console.log('Error:', error);
      setWarning('Error: ' + error);
      alert('Error: ' + error);
      // Handle error case here

    }
  };

  return (
    <Modal className='modal-lg modal-top' show={show} onHide={onHide}>
    <Modal.Header closeButton>
        <Modal.Title>Upload Units: {unit?.nm}</Modal.Title>
    </Modal.Header>
      <Modal.Body>
        {/* Your modal content here */
            // unit ? (
            //     <div>
            //     <p>Class: {unit.cls}</p>
            //     <p>Unit ID: {unit.id}</p>
            //     <p>Hardware ID: {unit.hw}</p>
            //     </div>
            // ) : (
            //     <p>No unit selected</p>
            // )
        }

        <div>
          <p>
            Instructions
          </p>
          <p>
            Paste the names and IDs of the units in the corresponding text area. Each name and ID should be on a separate line, Excel usually includes line breaks when pasting from a column. Make sure that is the case.
          </p>
        </div>

        <Container>
            <Row className='unit-entries'>
              <Col className='unit-name d-flex flex-column justify-content-center align-items-center'>
                <p className='unit-name'>Name:</p>
                <textarea className='name-text'
                  value={name}
                  onChange={handleNameChange}
                  rows={name.split('\n').length}
                  placeholder="Paste names here"></textarea>
              </Col>
              <Col className='unit-id d-flex flex-column justify-content-center align-items-center'>
                <p className='unit-id'>Unique ID:</p>
                <textarea className='imei-text'
                  value={imei}
                  onChange={handleImeiChange}
                  rows={imei.split('\n').length}
                  placeholder="Paste IDs here"></textarea>
              </Col>
            </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UnitModal;