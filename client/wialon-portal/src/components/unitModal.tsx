import React, { useEffect, useState } from 'react';
import { server } from '../App';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
  const [isLoading, setIsLoading] = useState(false);

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

  // Send the data to the server to be processed
  const handleSave = async () => {
    console.log('Save button clicked');

    // split the text areas into arrays and remove empty lines
    let nameArray = name.split('\n').filter(line => line.trim() !== '');
    let imeiArray = imei.split('\n').filter(line => line.trim() !== '');

    // set up the return object
    let unitData = {
      session_id: session_id,
      names: nameArray,
      imeis: imeiArray,
      unit_properties: unit
    };

    try {
      console.log('Server:', server.port+'/upload/units');
      setIsLoading(true);
      /**
       * Sends a POST request to upload units to the server.
       * 
       * @param {object} unitData - The data of the units to be uploaded.
       * @returns {Promise<Response>} - A Promise that resolves to the server response.
       */
      const response = await fetch(server.port+'/upload/units', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(unitData)
      });

      if (response.ok) {
        // Handle success case here
        console.log('Data sent to express server successfully');
        setIsLoading(false);
        setWarning('Data sent to express server');
        alert(`SUCCESS:${warning}\nPlease close the window when you are done`);
        // Handle success case here
      } else {
        console.log('Failed to send data');
        console.log('Failed to send data');
        alert('Failed to send data');
        // Handle failure case here
      }
    } catch (error) {
      // Handle error case here
      console.log('Error:', error);
      setWarning(""+error);
      alert(`ERROR:${warning}`);
      // Handle error case here

    }
  };

  return (
    <Modal className='modal-lg modal-top' show={show} onHide={onHide}>
      {isLoading && 
        (<div className="overlay">
          <div className="loading-throbber"></div>
        </div>)
        }
    <Modal.Header closeButton>
        <Modal.Title>Unit: {unit?.nm}</Modal.Title>
    </Modal.Header>
      <Modal.Body>
        <div className="unit-modal-insutrctions">
          <p className='unit-modal-insutrctions-title'>
            Upload Instructions
          </p>
          <p>
            Paste the names and IDs of the units in the corresponding text area.
          </p>
          <p>
            Each name and ID should be on their own line, Excel usually includes line breaks when pasting from a column. Make sure that is the case.
          </p>
          <p className='for-example-text'>For example:</p>
          <table className='example-ID-table'>
            <tbody>
              <tr>
                <th>Unit Name</th>
                <th>Unique ID</th>
              </tr>
              <tr>
                <td>123456789012346</td>
                <td>123456789012346</td>
              </tr>
              <tr>
                <td>123456789012347</td>
                <td>123456789012347</td>
              </tr>
              <tr>
                <td>123456789012348</td>
                <td>123456789012348</td>
              </tr>
              <tr>
                <td>... etc ...</td>
                <td>... etc ...</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Container>
            <Row className='unit-entries'>
              <Col className='unit-name d-flex flex-column justify-content-center align-items-center'>
                <p className='unit-name'><b>Unit Name:</b></p>
                <textarea className='name-text modal-text-entry'
                  value={name}
                  onChange={handleNameChange}
                  rows={name.split('\n').length}
                  placeholder="Paste names here"></textarea>
              </Col>
              <Col className='unit-id d-flex flex-column justify-content-center align-items-center'>
                <p className='unit-id'><b>Unique ID:</b></p>
                <textarea className='imei-text modal-text-entry'
                  value={imei}
                  onChange={handleImeiChange}
                  rows={imei.split('\n').length}
                  placeholder="Paste IDs here"></textarea>
              </Col>
            </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" className='btn btn-danger' onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" className='btn btn-primary' onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UnitModal;