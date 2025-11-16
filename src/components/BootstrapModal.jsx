    import React, { useState } from 'react';
    import { Modal, Button } from 'react-bootstrap';

    export default function BootstrapModal (title, body) {
      const [showModal, setShowModal] = useState(false);

      const handleClose = () => setShowModal(false);
      const handleShow = () => setShowModal(true);

      return (
        <>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {body}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
