import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const RecordList = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/records");
                if (!response.ok) {
                    throw new Error("Failed to fetch records");
                }
                const data = await response.json();
                setRecords(data);
            } catch (error) {
                console.error("Error fetching records:", error.message);
            }
        };

        fetchRecords();
    }, []);


    const deleteRecord = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/records/${id}`, {
                method: "DELETE"
            });
            const newRecords = records.filter((el) => el._id !== id);
            setRecords(newRecords);
        } catch (error) {
            window.alert("Failed to delete record");
        }
    }


    const recordList = () => {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    return (
        <div className="px-5">
            <h3>Record List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}

export default RecordList;

const Record = (props) => (
    <tr>
        <td>{props.record.name}</td>
        <td>{props.record.position}</td>
        <td>{props.record.level}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
            <button className="btn btn-link"
                onClick={() => {
                    props.deleteRecord(props.record._id);
                }}
            >
                Delete
            </button>
        </td>
    </tr>
);