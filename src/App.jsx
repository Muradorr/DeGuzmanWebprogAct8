import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Navbar,
  Button,
  Card,
  Badge,
} from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const colors = {
    page: "#020617",
    card: "#0d121c",
    dark: "#080c14",
    input: "#020617",
    border: "#1e293b",
    inputBorder: "#334155",
    cyan: "#22d3ee",
    text: "#ffffff",
    muted: "#94a3b8",
    mutedDark: "#64748b",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !course || !email || !address) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
      );

      const data = await response.json();

      if (data.length === 0) {
        alert("Address not found. Please try a different address.");
        return;
      }

      const result = data[0];

      const newStudent = {
        id: Date.now(),
        firstName,
        lastName,
        course,
        email,
        originalAddress: address,
        latitude: Number(result.lat),
        longitude: Number(result.lon),
      };

      setStudents((prev) => [...prev, newStudent]);

      setFirstName("");
      setLastName("");
      setCourse("");
      setEmail("");
      setAddress("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while fetching the location.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const cardStyle = {
    backgroundColor: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: "14px",
    overflow: "hidden",
  };

  const headerStyle = {
    backgroundColor: colors.card,
    borderBottom: `1px solid ${colors.border}`,
    padding: "18px 22px",
  };

  const inputStyle = {
    backgroundColor: colors.input,
    border: `1px solid ${colors.inputBorder}`,
    color: colors.text,
    borderRadius: "8px",
    padding: "11px 13px",
    boxShadow: "none",
  };

  const labelStyle = {
    color: colors.muted,
    fontSize: "10px",
    letterSpacing: "1.2px",
    fontWeight: "700",
    textTransform: "uppercase",
  };

  const tableCellStyle = {
    backgroundColor: colors.card,
    color: colors.muted,
    borderColor: colors.border,
    padding: "14px",
  };

  return (
    <div
      style={{
        backgroundColor: colors.page,
        minHeight: "100vh",
        color: colors.text,
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <Navbar
        className="px-4 px-md-5 py-3 sticky-top"
        style={{
          backgroundColor: colors.page,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <Container fluid>
          <Navbar.Brand>
            <div
              style={{
                color: colors.cyan,
                fontWeight: "900",
                fontSize: "19px",
                letterSpacing: "2px",
              }}
            >
              STUDENT LOCATION SYSTEM
            </div>

            <div
              style={{
                color: colors.mutedDark,
                fontSize: "9px",
                letterSpacing: "1.4px",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              Register Students and View Their Locations
            </div>
          </Navbar.Brand>

          <div
            style={{
              ...cardStyle,
              padding: "8px 18px",
              minWidth: "115px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: colors.mutedDark,
                fontSize: "8px",
                fontWeight: "700",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Total Students
            </div>

            <div
              style={{
                color: colors.cyan,
                fontSize: "22px",
                fontWeight: "900",
              }}
            >
              {students.length}
            </div>
          </div>
        </Container>
      </Navbar>

      <Container fluid className="px-4 px-md-5 py-4" style={{ maxWidth: "1500px" }}>
        <div
          className="mb-4"
          style={{
            ...cardStyle,
            padding: "30px 32px",
          }}
        >
          <div className="d-flex align-items-center mb-3">
            <div
              style={{
                width: "5px",
                height: "42px",
                backgroundColor: colors.cyan,
                borderRadius: "10px",
                marginRight: "14px",
              }}
            />

            <div>
              <div
                style={{
                  color: colors.cyan,
                  fontSize: "10px",
                  fontWeight: "800",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                INF232 • React Framework
              </div>

              <div
                style={{
                  color: colors.mutedDark,
                  fontSize: "9px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                Student Mapping Activity
              </div>
            </div>
          </div>

          <h1
            style={{
              fontSize: "clamp(30px, 4vw, 48px)",
              fontWeight: "900",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Student Locations
          </h1>

          <p
            style={{
              color: colors.muted,
              fontSize: "13px",
              maxWidth: "700px",
              margin: 0,
            }}
          >
            Register students, search their address, and display their locations
            on an interactive map.
          </p>
        </div>

        <Row className="g-4">
          <Col lg={7}>
            <Card className="h-100" style={cardStyle}>
              <Card.Header style={headerStyle}>
                <div
                  style={{
                    color: colors.cyan,
                    fontSize: "9px",
                    letterSpacing: "1.7px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                  }}
                >
                  Student Location
                </div>

                <div
                  style={{
                    color: colors.text,
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Interactive Student Location Map
                </div>
              </Card.Header>

              <Card.Body className="p-3">
                <div
                  style={{
                    height: "520px",
                    border: `1px solid ${colors.border}`,
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <MapContainer
                    center={[14.5995, 121.033]}
                    zoom={11}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      attribution="&copy; OpenStreetMap contributors"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {students.map((student) => (
                      <Marker
                        key={student.id}
                        position={[student.latitude, student.longitude]}
                      >
                        <Popup>
                          <div style={{ color: "#0f172a" }}>
                            <h6
                              style={{
                                fontWeight: "800",
                                textTransform: "uppercase",
                                marginBottom: "3px",
                              }}
                            >
                              {student.firstName} {student.lastName}
                            </h6>

                            <p
                              style={{
                                color: "#0891b2",
                                fontSize: "11px",
                                fontWeight: "800",
                                marginBottom: "8px",
                              }}
                            >
                              {student.course}
                            </p>

                            <p style={{ fontSize: "12px", marginBottom: "4px" }}>
                              <strong>Email:</strong> {student.email}
                            </p>

                            <p style={{ fontSize: "12px", marginBottom: "4px" }}>
                              <strong>Address:</strong> {student.originalAddress}
                            </p>

                            <p style={{ fontSize: "12px", margin: 0 }}>
                              <strong>Coordinates:</strong>{" "}
                              {student.latitude.toFixed(4)},{" "}
                              {student.longitude.toFixed(4)}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5}>
            <Card style={cardStyle}>
              <Card.Header style={headerStyle}>
                <div
                  style={{
                    color: colors.cyan,
                    fontSize: "9px",
                    letterSpacing: "1.7px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                  }}
                >
                  Registration
                </div>

                <div
                  style={{
                    color: colors.text,
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Student Registration
                </div>
              </Card.Header>

              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      style={inputStyle}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      style={inputStyle}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>Course</Form.Label>
                    <Form.Select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      style={inputStyle}
                    >
                      <option value="">Select Course</option>
                      <option value="BSCS">BSCS</option>
                      <option value="BSIT">BSIT</option>
                      <option value="BSIS">BSIS</option>
                      <option value="BSCpE">BSCpE</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="student@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={inputStyle}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={labelStyle}>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Example: Pasay City, Philippines"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      style={{
                        ...inputStyle,
                        resize: "none",
                      }}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-100 border-0"
                    style={{
                      backgroundColor: colors.cyan,
                      color: colors.page,
                      fontWeight: "900",
                      fontSize: "11px",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      padding: "13px",
                      borderRadius: "8px",
                    }}
                  >
                    {loading ? "Transmitting..." : "Initialize Registration"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Card style={cardStyle}>
              <Card.Header style={headerStyle}>
                <div
                  style={{
                    color: colors.cyan,
                    fontSize: "9px",
                    letterSpacing: "1.7px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                  }}
                >
                  Student Records
                </div>

                <div
                  style={{
                    color: colors.text,
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Registered Roster
                </div>
              </Card.Header>

              <Card.Body className="p-0">
                <Table responsive hover className="m-0 align-middle">
                  <thead>
                    <tr>
                      {[
                        "#",
                        "Student",
                        "Course",
                        "Email",
                        "Address",
                        "Coordinates",
                        "Action",
                      ].map((heading) => (
                        <th
                          key={heading}
                          style={{
                            backgroundColor: colors.dark,
                            color: colors.muted,
                            borderColor: colors.border,
                            fontSize: "10px",
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            padding: "14px",
                          }}
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {students.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          style={{
                            ...tableCellStyle,
                            color: colors.mutedDark,
                            textAlign: "center",
                            padding: "45px",
                            fontSize: "11px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "1.5px",
                          }}
                        >
                          No Personnel Found in Database
                        </td>
                      </tr>
                    ) : (
                      students.map((student, index) => (
                        <tr key={student.id}>
                          <td style={tableCellStyle}>{index + 1}</td>

                          <td
                            style={{
                              ...tableCellStyle,
                              color: colors.text,
                              fontWeight: "700",
                              textTransform: "uppercase",
                            }}
                          >
                            {student.firstName} {student.lastName}
                          </td>

                          <td style={tableCellStyle}>
                            <Badge
                              style={{
                                backgroundColor: "rgba(34,211,238,.10)",
                                color: colors.cyan,
                                border: "1px solid rgba(34,211,238,.30)",
                              }}
                            >
                              {student.course}
                            </Badge>
                          </td>

                          <td style={tableCellStyle}>{student.email}</td>

                          <td style={tableCellStyle}>
                            {student.originalAddress}
                          </td>

                          <td
                            style={{
                              ...tableCellStyle,
                              fontFamily: "monospace",
                              fontSize: "11px",
                            }}
                          >
                            <div>LAT: {student.latitude.toFixed(5)}</div>
                            <div>LNG: {student.longitude.toFixed(5)}</div>
                          </td>

                          <td style={tableCellStyle}>
                            <Button
                              size="sm"
                              onClick={() => handleDelete(student.id)}
                              style={{
                                backgroundColor: "transparent",
                                color: colors.cyan,
                                border: `1px solid ${colors.cyan}`,
                                fontSize: "9px",
                                fontWeight: "800",
                                textTransform: "uppercase",
                                borderRadius: "6px",
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <footer
        style={{
          backgroundColor: colors.dark,
          borderTop: `1px solid ${colors.border}`,
          marginTop: "40px",
          padding: "22px 30px",
        }}
      >
        <Container
          fluid
          className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2"
          style={{ maxWidth: "1500px" }}
        >
          <div>
            <div
              style={{
                color: colors.cyan,
                fontSize: "11px",
                fontWeight: "800",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Dan Lawrence Fabia
            </div>

            <div
              style={{
                color: colors.mutedDark,
                fontSize: "8px",
                textTransform: "uppercase",
              }}
            >
              Student Location System
            </div>
          </div>

          <div
            style={{
              color: colors.mutedDark,
              fontSize: "9px",
              textTransform: "uppercase",
            }}
          >
            INF232 • Web Development
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default App;