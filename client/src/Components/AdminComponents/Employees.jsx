import { AuthContext } from "../../Contexts/AuthContext";
import axios from "../../axios";
import React, { useContext, useEffect, useState } from "react";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import Swal from "sweetalert2";
import { FileUpload } from "primereact/fileupload";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Link } from "react-router-dom";
import { Avatar } from "primereact/avatar";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [position, setPosition] = useState("");
    const [contact, setContact] = useState(null);
    const [join_date, setJoin_Date] = useState("");
    const [profile, setProfile] = useState(null);
    const [errMess, setErrMess] = useState(null);
    const roles = [{ name: "Admin" }, { name: "Employee" }];
    const positions = [
        { name: "Developer" },
        { name: "Designer" },
        { name: "HR" },
    ];
    const { loading } = useContext(AuthContext);
    const [editVisible, setEditVisible] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [addVisible, setAddVisible] = useState(false);

    const fetchEmployees = async () => {
        try {
            const employeeslist = await axios.get("/auth/employees");
            setEmployees(employeeslist.data);
            console.log(employeeslist.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    if (loading) {
        return <div>loading....</div>;
    }

    const handleDelete = (id, name) => {
        Swal.fire({
            title: `Delete ${name}?`,
            text: "Are you sure you want to remove this employee?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(
                        `/auth/employee/delete/${id}`
                    );
                    if (res.status === 200) {
                        Swal.fire(
                            "Deleted!",
                            `${name} has been removed.`,
                            "success"
                        );
                        fetchEmployees();
                    }
                } catch (error) {
                    Swal.fire("Error", "Something went wrong", "error");
                    console.log(error);
                }
            }
        });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const joinDateTemplate = (rowData) => {
        return <span>{formatDate(rowData.join_date)}</span>;
    };

    const actionbody = (rowData) => {
        return (
            <div className="flex gap-5">
                <Link to={`/viewemployee/${rowData.id}`}>
                    <button className="btn btn-info">View</button>
                </Link>
                <button
                    onClick={() => openEditModal(rowData)}
                    className="btn btn-warning"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(rowData.id, rowData.name)}
                    className="btn btn-error"
                >
                    Delete
                </button>
            </div>
        );
    };

    const profileTemplate = (rowData) => {
        return (rowData.profile_pic ? <Avatar shape="circle" size="large" image={`http://localhost:5000${rowData.profile_pic}`} /> : <Avatar shape="circle" label={rowData.name[0].toUpperCase()} size="large" />)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", role);
        formData.append("position", position);
        formData.append("contact", contact?.toString() || "");
        const formattedDate = join_date
            ? `${join_date.getFullYear()}-${String(
                  join_date.getMonth() + 1
              ).padStart(2, "0")}-${String(join_date.getDate()).padStart(
                  2,
                  "0"
              )}`
            : "";

        formData.append("join_date", formattedDate);
        formData.append("profile_pic", profile);

        try {
            const res = await axios.post("/auth/createEmployee", formData);
            if (res.status === 201) {
                setAddVisible(false);
                Swal.fire({
                    icon: "success",
                    title: "Added Successfully",
                    text: `${name} is Added as a New Employee`,
                });
                fetchEmployees();
                setName("");
                setEmail("");
                setPassword("");
                setRole("");
                setPosition("");
                setContact("");
                setProfile("");
                setJoin_Date("");
                setErrMess("");
            } else if (res.status === 400) {
                setErrMess(res.data.message);
            }
        } catch (error) {
            setErrMess(error.response.data.message);
        }
    };

    const openEditModal = (employee) => {
        setSelectedEmployee(employee);
        setName(employee.name);
        setEmail(employee.email);
        setPassword("");
        setRole(employee.role);
        setPosition(employee.position);
        setContact(employee.contact);
        setJoin_Date(new Date(employee.join_date));
        setProfile(null);
        setEditVisible(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        if (password) formData.append("password", password);
        formData.append("role", role);
        formData.append("position", position);
        formData.append("contact", contact);
        if (profile) formData.append("profile_pic", profile);

        try {
            setErrMess("");
            const res = await axios.put(
                `/auth/employee/edit/${selectedEmployee.id}`,
                formData
            );
            if (res.status === 200) {
                setEditVisible(false);
                Swal.fire(
                    "Updated!",
                    `${name} info has been updated.`,
                    "success"
                );
                fetchEmployees();
            }
        } catch (error) {
            setErrMess(error.response.data.message || "Update failed");
        }
    };

    const [filters, setFilters] = useState({
        global: { value: "", matchMode: "contains" },
        role: { value: null, matchMode: "equals" },
        position: { value: null, matchMode: "equals" },
    });
    const [roleFilterOptions, setRoleFilterOptions] = useState([]);
    const [positionFilterOptions, setPositionFilterOptions] = useState([]);

    useEffect(() => {
        if (employees.length > 0) {
            const rolesset = new Set(employees.map((emp) => emp.role));
            const positionset = new Set(employees.map((pos) => pos.position));

            setRoleFilterOptions(
                [...rolesset].map((role) => ({ label: role, value: role }))
            );
            setPositionFilterOptions(
                [...positionset].map((pos) => ({ label: pos, value: pos }))
            );
        }
    }, [employees]);

    return (
        <div className="px-4 py-6 pl-56 pr-6 py-6">
            <h1 className="text-3xl text-center mb-6 uppercase font-bold">
                Employees List
            </h1>

            <div className="flex items-center justify-between">
                <button
                    className="btn btn-success "
                    onClick={() => setAddVisible(true)}
                >
                    Add Employee +
                </button>

                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search"> </InputIcon>
                    <InputText
                        placeholder="Search Employees"
                        value={filters.global.value}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFilters((prevFilters) => ({
                                ...prevFilters,
                                global: { ...prevFilters.global, value },
                            }));
                        }}
                    />
                </IconField>
            </div>

            <DataTable
                removableSort
                className="mt-6"
                paginator
                rows={5}
                emptyMessage={"No Employees Found"}
                rowsPerPageOptions={[5, 10, 25, 50]}
                stripedRows
                value={employees}
                tableStyle={{ minWidth: "50rem" }}
                globalFilterFields={[
                    "name",
                    "role",
                    "email",
                    "position",
                    "contact",
                ]}
                filters={filters}
            >
                <Column field="name" header="Name" />
                <Column field="email" header="Email" />
                <Column
                    showFilterMatchModes={false}
                    field="role"
                    header="Role"
                    filter
                    filterElement={(options) => {
                        return (
                            <Dropdown
                                value={options.value}
                                options={roleFilterOptions}
                                onChange={(e) => {
                                    options.filterCallback(
                                        e.value,
                                        options.index
                                    );
                                }}
                                placeholder="Sort By Role"
                                className="p-column-filter"
                            />
                        );
                    }}
                />
                <Column
                    field="position"
                    header="Position"
                    showFilterMatchModes={false}
                    filter
                    filterElement={(options) => (
                        <Dropdown
                            value={options.value}
                            options={positionFilterOptions}
                            onChange={(e) =>
                                options.filterCallback(e.value, options.index)
                            }
                            placeholder="Sort by Position"
                        />
                    )}
                />
                <Column
                    sortable
                    field="join_date"
                    header="Joining Date"
                    body={joinDateTemplate}
                />
                <Column
                    field="profile_pic"
                    body={profileTemplate}
                    header="Profile"
                />
                <Column field="contact" header="Contact" />
                <Column header="Action" body={actionbody} />
            </DataTable>
            <Dialog
                visible={addVisible}
                header="Add Employee"
                draggable={false}
                maximizable
                onHide={() => {
                    if (!addVisible) return;
                    setAddVisible(false);
                }}
            >
                <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    className="flex flex-col gap-3 items-center justify-center"
                >
                    <InputText
                        className="w-100"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <InputText
                        autoComplete="off"
                        className="w-100"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Password
                        autoComplete="new-password"
                        className="w-100"
                        inputClassName="w-100"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        toggleMask
                        feedback={false}
                        required
                    />
                    <Dropdown
                        className="w-100"
                        placeholder="Role"
                        value={role}
                        onChange={(e) => setRole(e.value)}
                        options={roles}
                        optionLabel="name"
                        optionValue="name"
                        required
                    />
                    <Dropdown
                        className="w-100"
                        placeholder="Position"
                        value={position}
                        options={positions}
                        optionLabel="name"
                        optionValue="name"
                        onChange={(e) => setPosition(e.value)}
                        required
                    />
                    <InputNumber
                        className="w-100"
                        placeholder="Mobile Number"
                        value={contact}
                        useGrouping={false}
                        onChange={(e) => setContact(e.value)}
                        required
                    />
                    <Calendar
                        placeholder="Join Date"
                        className="w-100"
                        value={join_date}
                        onChange={(e) => setJoin_Date(e.target.value)}
                        required
                    ></Calendar>
                    <input
                        type="file"
                        mode="basic"
                        className="w-100 file-input file-input-primary "
                        onChange={(e) => setProfile(e.target.files[0])}
                        chooseLabel="Profile Picture"
                    />
                    <button className="btn btn-success" type="submit">
                        Add Employee
                    </button>
                    {errMess && <p className="text-error">{errMess}</p>}
                </form>
            </Dialog>

            <Dialog
                visible={editVisible}
                header="Edit Employee"
                draggable={false}
                maximizable
                onHide={() => {
                    if (!editVisible) return;
                    setEditVisible(false);
                    setName("");
                    setEmail("");
                    setContact(null);
                    setRole("");
                    setPosition("");
                    setJoin_Date("")
                }}
            >
                <form
                    onSubmit={handleEditSubmit}
                    className="flex flex-col gap-3 items-center justify-center"
                >
                    <InputText
                        className="w-100"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <InputText
                        className="w-100"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Password
                        className="w-100"
                        inputClassName="w-100"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New Password (optional)"
                        toggleMask
                        feedback={false}
                    />
                    <Dropdown
                        className="w-100"
                        placeholder="Role"
                        value={role}
                        onChange={(e) => setRole(e.value)}
                        options={roles}
                        optionLabel="name"
                        optionValue="name"
                        required
                    />
                    <Dropdown
                        className="w-100"
                        placeholder="Position"
                        value={position}
                        onChange={(e) => setPosition(e.value)}
                        options={positions}
                        optionLabel="name"
                        optionValue="name"
                        required
                    />
                    <InputNumber
                        className="w-100"
                        placeholder="Mobile Number"
                        value={contact}
                        useGrouping={false}
                        onChange={(e) => setContact(e.value)}
                        required
                    />
                    <input
                        type="file"
                        className="w-100 file-input file-input-primary"
                        onChange={(e) => setProfile(e.target.files[0])}
                    />
                    <button className="btn btn-warning" type="submit">
                        Update Employee
                    </button>
                    {errMess && <p className="text-error">{errMess}</p>}
                </form>
            </Dialog>
        </div>
    );
};

export default Employees;
