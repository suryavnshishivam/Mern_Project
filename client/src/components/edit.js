import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const Edit = () => {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: "",
        records: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const id = params.id.toString();
                const response = await fetch(`http://localhost:5000/api/records/${id}`);

                if (!response.ok) {
                    throw new Error(`An error has occurred: ${response.statusText}`);
                }

                const record = await response.json();

                if (!record) {
                    throw new Error(`Record with id ${id} not found`);
                }

                setForm(record);
            } catch (error) {
                // Alert the user if an error occurs during the fetch process
                window.alert(error.message);
                // Navigate back to the home page or any appropriate page
                navigate("/");
            }
        }

        fetchData();

        // No cleanup needed, so no return statement required

    }, [params.id, navigate]);


    const updateForm = (value) => {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    const onSubmit = async (e) => {
        e.preventDefault();

        const editedPerson = {
            name: form.name,
            position: form.position,
            level: form.level,
        };

        try {
            const response = await fetch(`http://localhost:5000/api/records/${params.id}`, {
                method: "PUT",
                body: JSON.stringify(editedPerson),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error("Failed to update record");
            }

            // Navigate to the home page after successful submission
            navigate("/");
        } catch (error) {
            // Alert the user if an error occurs during the fetch process
            window.alert(error.message);
        }
    }


    return (
        <div className="px-5">
            <h3>Update Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="position">Position: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        value={form.position}
                        onChange={(e) => updateForm({ position: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionIntern"
                            value="Intern"
                            checked={form.level === "Intern"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionIntern" className="form-check-label">Intern</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionJunior"
                            value="Junior"
                            checked={form.level === "Junior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionJunior" className="form-check-label">Junior</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionSenior"
                            value="Senior"
                            checked={form.level === "Senior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionSenior" className="form-check-label">Senior</label>
                    </div>
                </div>
                <br />

                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Record"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}

export default Edit