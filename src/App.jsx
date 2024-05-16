import "./App.css";
import MainContent from "./components/MainContent";
import { Container } from "@mui/material";

export default function App() {
  return (
    <div className="app" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Container maxWidth="xl">
        <MainContent />
      </Container>
    </div>
  );
}
