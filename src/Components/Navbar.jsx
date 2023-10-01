import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img
                        src="https://tse3.mm.bing.net/th?id=OIP.WNXR6jcvRjlwQdQ7-8UtSAAAAA&pid=Api&P=0&h=180"
                        alt="Logo"
                        width="120"
                        height="60"
                    />
                    <span className="ms-3" style={{ fontFamily: "cursive", fontWeight: "bold" }}>
                        ABC Company
                    </span>
                </Link>
                <div className="d-flex justify-end" style={{ flexDirection: "column" }}>
                    <div style={{ marginRight: "10px" }}>
                        <Link to="/employeedata" className="btn btn-info m-1">
                            Employee's data
                        </Link>
                    </div>
                    <div>
                        <Link to="/addEmployee" className="btn btn-info m-1">
                            Add Employee
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}


