import TableData from "./components/TableData";
import { Container, Navbar } from "react-bootstrap";

function App() {
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container className="d-flex justify-content-center">
          <Navbar.Brand href="/">
            React-Bootstrap table design with API data
          </Navbar.Brand>
        </Container>
      </Navbar>
      <TableData />
    </>
  );
}

export default App;
