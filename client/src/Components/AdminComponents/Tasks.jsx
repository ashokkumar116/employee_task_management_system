import axios from "../../axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import React, { useEffect, useState } from "react";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import Swal from "sweetalert2";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Link, Navigate } from "react-router-dom";
import { Editor } from "primereact/editor";
import styled from "styled-components";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [assignedNames, setAssignedNames] = useState({});
    const [createdNames, setCreatedNames] = useState({});
    const [addVisible, setAddVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assigned_to, setAssigned_to] = useState("");
    const [priority, setPriority] = useState("");
    const [deadline, setDeadline] = useState("");
    const [employees, setEmployees] = useState([]);
    const [errMess, setErrMess] = useState(null);
    const [editVisible, setEditVisible] = useState(false);
    const [editId, setEditId] = useState(null);

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

    const fetchTasks = async () => {
        const res = await axios.get("/tasks/getalltasks");
        setTasks(res.data);
    };

    const fetchUserMaps = async () => {
        try {
            const res = await axios.get("/auth/employees");
            const nameMap = {};
            res.data.forEach((emp) => {
                nameMap[emp.id] = emp.name;
            });
            setAssignedNames(nameMap);
            setCreatedNames(nameMap);
        } catch (err) {
            console.error("Error fetching employees", err);
        }
    };

    const getSeverity = (status) => {
        switch (status) {
            case "Not Started":
                return "danger";

            case "In Progress":
                return "warning";

            case "Completed":
                return "success";

            case "High":
                return "danger";

            case "Low":
                return "success";

            case "Medium":
                return "warning";
        }
    };

    const getIcon = (status) => {
        switch (status) {
            case "Not Started":
                return "pi pi-ban";

            case "In Progress":
                return "pi pi-clock";

            case "Completed":
                return "pi pi-check-circle";
            case "High":
                return "pi pi-angle-double-up";

            case "Low":
                return "pi pi-angle-double-down";

            case "Medium":
                return "pi pi-angle-double-right";
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchUserMaps();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const dateTemplate = (rowData) => {
        return <span>{formatDate(rowData.deadline)}</span>;
    };

    const asstoBody = (rowData) => {
        return (
            <span>
                {assignedNames[rowData.assigned_to].toUpperCase() ||
                    "Loading..."}
            </span>
        );
    };

    const assbyBody = (rowData) => {
        return (
            <span>
                {createdNames[rowData.created_by].toUpperCase() ||
                    "Loading ..."}
            </span>
        );
    };

    const statusBody = (rowData) => {
        return (
            <Tag
                icon={getIcon(rowData.status)}
                value={rowData.status}
                severity={getSeverity(rowData.status)}
            />
        );
    };

    const priorityBody = (rowData) => {
        return (
            <Tag
                icon={getIcon(rowData.priority)}
                value={rowData.priority}
                severity={getSeverity(rowData.priority)}
            />
        );
    };

    const actionbody = (rowData) => {
        return (
            <div className="flex gap-2">
                <Link to={`/viewtask/${rowData.id}`}>
                    <button className="btn btn-info">View</button>
                </Link>
                <button
                    onClick={() => handleEditShow(rowData.id)}
                    className="btn btn-warning"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(rowData.id)}
                    className="btn btn-error"
                >
                    Delete
                </button>
            </div>
        );
    };

    const assignedUsersDropdown = employees.map((emp) => ({
        label: emp.name,
        value: emp.id,
    }));

    const priorityDropdown = [
        { label: "High", value: "High" },
        { label: "Medium", value: "Medium" },
        { label: "Low", value: "Low" },
    ];

    const priorityOptions = [
        { label: "High", value: "High" },
        { label: "Medium", value: "Medium" },
        { label: "Low", value: "Low" },
    ];

    const statusOptions = [
        { label: "Not Started", value: "Not Started" },
        { label: "In Progress", value: "In Progress" },
        { label: "Completed", value: "Completed" },
    ];

    const assignedToOptions = employees.map((emp) => ({
        label: emp.name,
        value: emp.id,
    }));

    const assignedByOptions = employees.map((emp) => ({
        label: emp.name,
        value: emp.id,
    }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = deadline
            ? `${deadline.getFullYear()}-${String(
                  deadline.getMonth() + 1
              ).padStart(2, "0")}-${String(deadline.getDate()).padStart(
                  2,
                  "0"
              )}`
            : "";

        const payload = {
            title,
            description,
            assigned_to,
            priority,
            deadline: formattedDate,
        };

        try {
            const res = await axios.post("/tasks/createtask", payload);
            const assignedUser = employees.find(
                (emp) => emp.id === assigned_to
            );

            if (res.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Task Added Successfully",
                    text: `New Task assigned to ${
                        assignedUser?.name || "Unknown"
                    }`,
                });
                setAddVisible(false);
                fetchTasks();
                setTitle("");
                setDescription("");
                setAssigned_to("");
                setPriority("");
                setDeadline("");
            }
        } catch (error) {
            setErrMess(error.response.data.message);
        }
    };

    const handleEditShow = async (id) => {
        setEditVisible(true);
        const taskk = await axios.get(`/tasks/task/${id}`);
        console.log(taskk);
        setEditId(id);
        setTitle(taskk.data.title);
        setDescription(taskk.data.description);
        setAssigned_to(taskk.data.assigned_to);
        setPriority(taskk.data.priority);
        setDeadline(new Date(taskk.data.deadline));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedDate = deadline
                ? `${deadline.getFullYear()}-${String(
                      deadline.getMonth() + 1
                  ).padStart(2, "0")}-${String(deadline.getDate()).padStart(
                      2,
                      "0"
                  )}`
                : "";

            const res = await axios.put(`/tasks/task/edit/${editId}`, {
                title,
                description,
                assigned_to,
                priority,
                deadline: formattedDate,
            });
            if (res.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Edited!",
                    text: "Task Edited Successfully",
                });
                setEditVisible(false);
                fetchTasks();
            }
        } catch (error) {
            setErrMess(error.response.data.message);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: `Delete ?`,
            text: "Are you sure you want to remove this Task?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`/tasks/task/delete/${id}`);
                    if (res.status === 200) {
                        Swal.fire(
                            "Deleted!",
                            `Task has been removed Successfully.`,
                            "success"
                        );
                        fetchTasks();
                    }
                } catch (error) {
                    Swal.fire("Error", "Something went wrong", "error");
                    console.log(error);
                }
            }
        });
    };

    const [filters, setFilters] = useState({
        global: { value: "", matchMode: "contains" },
        priority: { value: null, matchMode: "equals" },
        assigned_to: { value: null, matchMode: "equals" },
        created_by: { value: null, matchMode: "equals" },
        status: { value: null, matchMode: "equals" },
    });

    const getNameById = (id) => {
        const emp = employees.find((e) => e.id === id);
        return emp ? emp.name : "Unknown";
    };

    const truncateText = (text, maxLength = 15) => {
        return text.length > maxLength
            ? text.slice(0, maxLength) + "..."
            : text;
    };

    const StyledEditor = styled(Editor)`
        .p-editor-toolbar {
            background-color: #1f1f1f !important;
            border-color: #333 !important;
        }

        .p-editor-toolbar .ql-picker-label,
        .p-editor-toolbar .ql-picker-item,
        .p-editor-toolbar .ql-stroke,
        .p-editor-toolbar button svg {
            color: white !important;
            stroke: white !important;
            fill: white !important;
        }
    `;

    return (
        <div className="px-4 py-6 pl-56 pr-6 py-6 dark">
            <h1 className="text-2xl font-bold text-center mb-5">Tasks</h1>
            <div className="flex justify-between items-center">
                <button
                    className="btn btn-success"
                    onClick={() => setAddVisible(true)}
                >
                    Add Task +
                </button>
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search"> </InputIcon>
                    <InputText
                        placeholder="Search Tasks"
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
                className="mt-5 text-nowrap"
                value={tasks}
                paginator
                rows={5}
                filters={filters}
                removableSort
                globalFilterFields={[
                    "title",
                    "description",
                    "priority",
                    "status",
                ]}
                emptyMessage="No Tasks Found"
            >
                <Column
                    field="title"
                    header="Title"
                    body={(row) => <span>{truncateText(row.title)}</span>}
                />
                <Column
                    field="description"
                    header="Description"
                    body={(row) => (
                        <div
                            className="line-clamp-2 max-w-[300px] text-sm"
                            dangerouslySetInnerHTML={{
                                __html: truncateText(row.description),
                            }}
                        />
                    )}
                />
                <Column
                    field="assigned_to"
                    header="Assigned To"
                    filter
                    showFilterMatchModes={false}
                    filterElement={(options) => (
                        <Dropdown
                            value={options.value}
                            options={assignedToOptions}
                            onChange={(e) =>
                                options.filterCallback(e.value, options.index)
                            }
                            placeholder="Filter by Assigned To"
                            className="p-column-filter"
                            showClear
                        />
                    )}
                    body={(row) => getNameById(row.assigned_to).toUpperCase()}
                />

                <Column
                    field="created_by"
                    header="Assigned By"
                    filter
                    showFilterMatchModes={false}
                    filterElement={(options) => (
                        <Dropdown
                            value={options.value}
                            options={assignedByOptions}
                            onChange={(e) =>
                                options.filterCallback(e.value, options.index)
                            }
                            placeholder="Filter by Assigned By"
                            className="p-column-filter"
                            showClear
                        />
                    )}
                    body={(row) => getNameById(row.created_by).toUpperCase()}
                />

                <Column
                    field="status"
                    header="Status"
                    filter
                    showFilterMatchModes={false}
                    filterElement={(options) => (
                        <Dropdown
                            value={options.value}
                            options={statusOptions}
                            onChange={(e) =>
                                options.filterCallback(e.value, options.index)
                            }
                            placeholder="Filter by Status"
                            className="p-column-filter"
                            showClear
                        />
                    )}
                    body={(row) => (
                        <Tag
                            value={row.status}
                            severity={getSeverity(row.status)}
                            icon={getIcon(row.status)}
                        />
                    )}
                />

                <Column
                    field="priority"
                    header="Priority"
                    filter
                    showFilterMatchModes={false}
                    filterElement={(options) => (
                        <Dropdown
                            value={options.value}
                            options={priorityOptions}
                            onChange={(e) =>
                                options.filterCallback(e.value, options.index)
                            }
                            placeholder="Filter by Priority"
                            className="p-column-filter"
                            showClear
                        />
                    )}
                    body={(row) => (
                        <Tag
                            value={row.priority}
                            severity={getSeverity(row.priority)}
                            icon={getIcon(row.priority)}
                        />
                    )}
                />

                <Column
                    sortable
                    field="deadline"
                    header="Deadline"
                    body={dateTemplate}
                />
                <Column header="Action" body={actionbody} />
            </DataTable>

            <Dialog
                visible={addVisible}
                maximizable
                showCloseIcon
                onHide={() => {
                    if (!addVisible) return;
                    setAddVisible(false);
                }}
                draggable={false}
                header="Add Task"
            >
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 items-center justify-center"
                >
                    <InputText
                        className="w-100"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <Editor
                        className="w-100 dark-editor bg-gray-300 text-black"
                        value={description}
                        onTextChange={(e) => setDescription(e.htmlValue)}
                        placeholder="Description"
                    />

                    <Dropdown
                        className="w-100"
                        options={assignedUsersDropdown}
                        value={assigned_to}
                        onChange={(e) => setAssigned_to(e.target.value)}
                        placeholder="Assign To"
                    />
                    <Dropdown
                        className="w-100"
                        options={priorityDropdown}
                        placeholder="Priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    />
                    <Calendar
                        className="w-100"
                        placeholder="Deadline"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                    <button type="submit" className="btn btn-success w-100">
                        Add Task
                    </button>
                    {errMess && <p className="text-error">{errMess}</p>}
                </form>
            </Dialog>

            <Dialog
                visible={editVisible}
                maximizable
                showCloseIcon
                onHide={() => {
                    if (!editVisible) return;
                    setEditVisible(false);
                }}
                draggable={false}
                header="Edit Task"
            >
                <form
                    onSubmit={handleEditSubmit}
                    className="flex flex-col gap-3 items-center justify-center"
                >
                    <InputText
                        className="w-100"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <Editor
                        className="w-100 dark-editor bg-gray-300 text-black"
                        value={description}
                        onTextChange={(e) => setDescription(e.htmlValue)}
                        placeholder="Description"
                    />
                    <Dropdown
                        className="w-100"
                        options={assignedUsersDropdown}
                        value={assigned_to}
                        onChange={(e) => setAssigned_to(e.target.value)}
                        placeholder="Assign To"
                    />
                    <Dropdown
                        className="w-100"
                        options={priorityDropdown}
                        placeholder="Priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    />
                    <Calendar
                        className="w-100"
                        placeholder="Deadline"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                    <button type="submit" className="btn btn-success w-100">
                        Edit Task
                    </button>
                    {errMess && <p className="text-error">{errMess}</p>}
                </form>
            </Dialog>
        </div>
    );
};

export default Tasks;
