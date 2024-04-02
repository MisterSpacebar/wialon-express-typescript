import react from 'react';

import { Modal, Button } from 'react-bootstrap';

interface UnitModalProps {
  show: boolean;
  onHide: () => void;
  unit: { [key:string]:any } | null;
}

const UnitModal: React.FC<UnitModalProps> = ({ show, onHide, unit }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Your modal content here */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UnitModal;