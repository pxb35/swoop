    import { useState } from 'react';
    import Button from 'react-bootstrap/Button';
    import Offcanvas from 'react-bootstrap/Offcanvas';
    
     function Example() {
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      return (
        <>
          <Button variant="primary" onClick={handleShow}>
            Launch Offcanvas
          </Button>

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas Title</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              This is the content of your Offcanvas. You can place any React components or elements here.
            </Offcanvas.Body>
          </Offcanvas>
        </>
      );
    }

    export default Example;