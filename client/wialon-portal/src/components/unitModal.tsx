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

    await fetch(server.port+'/unit-upload', {})
  };

  return (
    <Modal className='modal-lg modal-top' show={show} onHide={onHide}>
    <Modal.Header closeButton>
        <Modal.Title>{unit?.nm}</Modal.Title>
    </Modal.Header>
      <Modal.Body>
        {/* Your modal content here */
            unit ? (
                <div>
                <p>Class: {unit.cls}</p>
                <p>Unit ID: {unit.id}</p>
                <p>Hardware ID: {unit.hw}</p>
                </div>
            ) : (
                <p>No unit selected</p>
            )
        }
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
                <p className='unit-id'>IMEI:</p>
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