import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export default function AddEmployee() {
    const [EmpData, SetEmpData] = useState({ name: "", empID: "", email: "", position: "", department: "", salary: "", dateOfJoining: "", image: "" });
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        if (EmpData.name === "" || EmpData.empID === "" || EmpData.email === "" || EmpData.position === "" || EmpData.department === "" || EmpData.salary === "" || EmpData.dateOfJoining === "" || EmpData.image === "") {
            alert("Enter all Entries before submitting");
            navigate("")
            return;
        }
        e.preventDefault();

        await axios.post("https://employee-management-backend-7pgq.onrender.com/api/addEmployee", EmpData).then((res) => {
            console.log(res)
            alert("submitted")
        }).catch((err) => {
            console.log(err)
        })

        // const existingData = localStorage.getItem("empData") ? JSON.parse(localStorage.getItem("empData")) : [];

        // existingData.push({ id: uuidv4(), ...EmpData });

        // localStorage.setItem("empData", JSON.stringify(existingData));
        navigate("/");
        location.reload()

    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Employee Information</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={submitHandler}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputFullName" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="exampleInputFullName" value={EmpData.name} onChange={(e) => SetEmpData({ ...EmpData, name: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmployeeId" className="form-label">Employee ID</label>
                            <input type="text" className="form-control" id="exampleInputEmployeeId" value={EmpData.empID} onChange={(e) => SetEmpData({ ...EmpData, empID: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail" value={EmpData.email} onChange={(e) => SetEmpData({ ...EmpData, email: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPosition" className="form-label">Position</label>
                            <input type="text" className="form-control" id="exampleInputPosition" value={EmpData.position} onChange={(e) => SetEmpData({ ...EmpData, position: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputSupervisor" className="form-label">Department</label>
                            <input type="text" className="form-control" id="exampleInputSupervisor" value={EmpData.department} onChange={(e) => SetEmpData({ ...EmpData, department: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputSalary" className="form-label">Salary</label>
                            <input type="number" className="form-control" id="exampleInputSalary" value={EmpData.salary} onChange={(e) => SetEmpData({ ...EmpData, salary: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputDateOfJoining" className="form-label">Date of Joining</label>
                            <div className="md-form md-outline input-with-post-icon">
                                <input type="date" className="form-control datepicker" value={EmpData.dateOfJoining} onChange={(e) => {
                                    SetEmpData({ ...EmpData, dateOfJoining: e.target.value });
                                }} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Image</label>
                            <input className="form-control" type="file" id="formFile" value={EmpData.image} onChange={(e) => SetEmpData({ ...EmpData, image: e.target.value })} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}


