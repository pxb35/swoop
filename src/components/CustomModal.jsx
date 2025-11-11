import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function CustomModal({ show, onClose, title, children, onConfirm }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || 'Modal Title'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        {onConfirm && (
          <Button variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
