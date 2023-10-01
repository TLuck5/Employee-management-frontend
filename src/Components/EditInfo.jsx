import axios from 'axios';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function EditInfo({ employee }) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(true);
    const [empData, SetEmpData] = useState({ ...employee, image: null });


    const handleClose = () => {
        setShowModal(false);
        navigate("/employeedata");
        window.location.reload()
    };

    const handleDone = async (id) => {
        if (empData.name === "" || empData.empID === "" || empData.email === "" || empData.position === "" || empData.department === "" || empData.salary === "" || empData.dateOfJoining === "" || empData.image === "") {
            alert("Enter all Entries before submitting");
            navigate("/")
            return;
        }
        // const data = JSON.parse(localStorage.getItem("empData")) || [];
        // const updatedData = data.map((item) =>
        //     item.id === employee.id ? { ...empData, id: item.id } : item
        // );
        // localStorage.setItem("empData", JSON.stringify(updatedData));
        await axios.patch(`https://employee-management-backend-7pgq.onrender.com/api/editEmployee/${id}`, empData).then((res) => {
            console.log(res)
        }).catch((err) => [
            console.log(err)
        ])
        handleClose();
        window.location.reload()
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        SetEmpData((prevData) => ({
            ...prevData,
            image: selectedFile,
        }));
    };
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Employees Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <label htmlFor="exampleInputFullName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="exampleInputFullName" name="name" value={empData.name} onChange={(e) => SetEmpData({ ...empData, name: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmployeeId" className="form-label">Employee ID</label>
                    <input type="text" className="form-control" id="exampleInputEmployeeId" name='empID' value={empData.empID} onChange={(e) => SetEmpData({ ...empData, empID: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail" name='email' value={empData.email} onChange={(e) => SetEmpData({ ...empData, email: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPosition" className="form-label">Position</label>
                    <input type="text" className="form-control" id="exampleInputPosition" name='position' value={empData.position} onChange={(e) => SetEmpData({ ...empData, position: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputSupervisor" className="form-label">Department</label>
                    <input type="text" className="form-control" id="exampleInputSupervisor" name='department' value={empData.department} onChange={(e) => SetEmpData({ ...empData, department: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputSalary" className="form-label">Salary</label>
                    <input type="number" className="form-control" id="exampleInputSalary" name='salary' value={empData.salary} onChange={(e) => SetEmpData({ ...empData, salary: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputDateOfJoining" className="form-label">Date of Joining</label>
                    <div className="md-form md-outline input-with-post-icon">
                        <input type="date" className="form-control datepicker" name='dateOfJoining' value={empData.dateOfJoining} onChange={(e) => {
                            SetEmpData({ ...empData, dateOfJoining: e.target.value });
                        }} />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                        Image
                    </label>
                    <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        name="image"
                        onChange={handleFileChange}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-light' onClick={handleClose}>Cancel</button>
                <button className='btn btn-success' onClick={() => { handleDone(empData._id) }}>Done</button>
            </Modal.Footer>
        </Modal>
    );
}
