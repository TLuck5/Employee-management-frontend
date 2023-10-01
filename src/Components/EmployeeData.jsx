import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import EditInfo from './EditInfo';
import axios from 'axios';


export default function EmployeeData() {
    const [id, setId] = useState("")
    const [editOpen, setEditOpen] = useState(false)
    const [empData, setEmpData] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    const [filterVal, setFilterVal] = useState([]);
    const [selectedVal, setSelectedVal] = useState("All")
    const navigate = useNavigate()

    const fetchData = async () => {
        // let data = await JSON.parse(localStorage.getItem('empData'));
        // setEmpData(data);
        // if (data == null) {
        //     alert("Add employee before accessing employee data")
        //     navigate("/")
        //     return
        // }

        await axios.get("https://employee-management-backend-7pgq.onrender.com/api/allEmployee").then((response) => {
            setEmpData(response.data.allUsers)
        }).catch((err) => {
            console.log("error===>", err)
        })
    };

    useEffect(() => {
        fetchData();
    }, []);

    const Givendepartment = ["All"]

    empData.map((item) => {
        if (!Givendepartment.includes(item.department)) {
            Givendepartment.push((item.department).toString())
        }
    })

    const FilterItem = () => {
        const filtered = empData.filter((item) => {
            return (
                (selectedVal === "All" || item.department.toLowerCase() === selectedVal.toLowerCase()) &&
                (item.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                    item.department.toLowerCase().includes(searchVal.toLowerCase()))
            )
        }
        );
        setFilterVal(filtered);
    }

    useEffect(() => {
        FilterItem();
    }, [searchVal, selectedVal])

    const handleDelete = async (id) => {
        // const items = empData.filter((item) => item.id !== id);
        // localStorage.setItem("empData", JSON.stringify(items));
        // if (empData.length === 0) {
        //     localStorage.removeItem("empData");
        // }
        await axios.post(`https://employee-management-backend-7pgq.onrender.com/api/deleteEmployee/${id}`).then((response) => [
            console.log(response)
            alert("deleted")
        ]).catch((err) => {
            console.log(err)
        })
        navigate("/")
        location.reload()
    }
    const toggleButton = (Id) => {
        setEditOpen((prevEdit) => !prevEdit)
        setId(Id)
    }

    const employee = empData.find(item => item._id === id)
    return (
        <>
            {editOpen ? (
                <EditInfo employee={employee} />
            ) :
                (
                    <>
                        <div className='d-flex justify-center'>
                            <div className="input-group m-5">
                                <input type="text" className="form-control" placeholder="Search..." value={searchVal} onChange={(e) => setSearchVal(e.target.value)} />
                            </div>
                            <div style={{ width: "250px", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "20px" }}>
                                <select className='form-select' onChange={(e) => setSelectedVal(e.target.value)}>
                                    {Givendepartment.map((item, i) => {
                                        return (
                                            <option key={i + 1} value={item}>
                                                {item}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>

                        <div>
                            <table className="table">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Department</th>
                                        <th scope="col">View Profile</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchVal === "" && selectedVal == "All" ? (
                                        empData.map((elem, index) => (
                                            <tr key={uuidv4()}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{elem.name}</td>
                                                <td>{elem.email}</td>
                                                <td>{elem.department}</td>
                                                <td>
                                                    {/* <Link to={`/infoemployee/${elem.id}`}><button className="btn btn-danger">Info</button></Link> */}
                                                    <button className='btn btn-info ' onClick={() => { toggleButton(elem._id) }}>Edit</button>
                                                    <button className='btn btn-danger m-2' onClick={() => { handleDelete(elem._id) }}>Delete</button>
                                                </td>
                                            </tr>
                                        )))
                                        : (
                                            filterVal.map((elem, index) => (
                                                <tr key={uuidv4()}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{elem.name}</td>
                                                    <td>{elem.email}</td>
                                                    <td>{elem.department}</td>
                                                    <td>
                                                        {/* <Link to={`/infoemployee/${elem.id}`}><button className="btn btn-danger">Info</button></Link> */}
                                                        <button className='btn btn-info ' onClick={() => { toggleButton(elem._id) }}>Edit</button>
                                                        <button className='btn btn-danger m-2' onClick={() => { handleDelete(elem._id) }}>Delete</button>
                                                    </td>
                                                </tr>
                                            )))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                )
            }
        </>
    );
}


