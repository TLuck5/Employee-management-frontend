import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import EditInfo from './EditInfo';

export default function InfoEmployee() {
    const [editOpen, setEditOpen] = useState(false)
    const { id } = useParams();
    let data = JSON.parse(localStorage.getItem("empData")) || [];
    const navigate = useNavigate()
    const employee = data.find(item => item.id === id);

    const handleDelete = () => {
        const items = data.filter((item) => item.id !== id);
        localStorage.setItem("empData", JSON.stringify(items));
        if (items.length === 0) {
            localStorage.removeItem("empData");
        }
        navigate("/employeedata")
    }

    const toggleButton = () => {
        setEditOpen((prevEdit) => !prevEdit)
    }

    return (
        <>
            {editOpen ? (
                <EditInfo employee={employee} />
            ) : (
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card" key={uuidv4()}>
                                <img className="card-img-top" src={employee.image} alt="Employee's image" />
                                <div className="card-body">
                                    <h5 className="card-title">{employee.name}</h5>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><strong>Employee ID:</strong> {employee.empID}</li>
                                    <li className="list-group-item"><strong>Email:</strong> {employee.email}</li>
                                    <li className="list-group-item"><strong>Position:</strong> {employee.position}</li>
                                    <li className="list-group-item"><strong>Department:</strong> {employee.department}</li>
                                    <li className="list-group-item"><strong>Salary:</strong> {employee.salary}</li>
                                    <li className="list-group-item"><strong>Date of Joining:</strong> {employee.dateOfJoining}</li>
                                </ul>
                                <div className="card-body d-flex justify-content-between">
                                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                                    <button className="btn btn-primary" onClick={toggleButton}>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}


