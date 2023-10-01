
import { Link, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AddEmployee from "./Components/AddEmployee";
import EmployeeData from "./Components/EmployeeData";
import InfoEmployee from "./Components/InfoEmployee";
// import Home from "./Components/Home";

function App() {

  return (
    <>
      <Navbar />
      <AddEmployee />
      <Routes>
        {/* <Route element={<Home />} exact path="/" /> */}
        <Route element={<EmployeeData />} exact path="/employeedata" />
        {/* <Route element={<AddEmployee />} exact path="/addEmployee" /> */}
        <Route element={<InfoEmployee />} exact path="/infoemployee/:id" />
        <Route element={<EmployeeData />} exact path="/employeedata" />
      </Routes>

    </>
  );
}

export default App;

