import { Column } from "primereact/column";
import axios from "../../axios";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import Swal from "sweetalert2";

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [editid, setEditid] = useState(null);
    const [editShow, setEditShow] = useState(false);

    const fetchAnnouncements = async () => {
        const res = await axios.get("/announcements/getannouncements");
        setAnnouncements(res.data);
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/announcements/createannouncement", { title, message });
            if (response.status === 200) {
                setShowAdd(false);
                setMessage("");
                setTitle("");
                Swal.fire({
                    icon: "success",
                    title: "Created!",
                    text: "New Announcement is Created successfully",
                });
                fetchAnnouncements();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditShow = async (id) => {
        setEditShow(true);
        setEditid(id);
        const response = await axios.get(`/announcements/viewannouncement/${id}`);
        setTitle(response.data.title);
        setMessage(response.data.message);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.put(`/announcements/editannouncement/${editid}`, { title, message });

        if (response.status === 200) {
            setEditShow(false);
            fetchAnnouncements();
            Swal.fire({
                icon: "success",
                title: "Edited!",
                text: "Announcement Edited Successfully",
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error While Editing the Announcement",
            });
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        Swal.fire({
            title: `Delete?`,
            text: "Are you sure you want to remove this Announcement?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete(`/announcements/deleteannouncement/${id}`);
                if (response.status === 200) {
                    fetchAnnouncements();
                    Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "Announcement Deleted Successfully",
                    });
                }
            }
        });
    };

    const truncateText = (text, maxLength = 30) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    return (
        <div className="px-6 py-8 pl-56 pr-6 min-h-screen bg-gray-950 text-white">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-700 pb-3">
                <i className="pi pi-bell text-orange-400 text-xl" />
                <h2 className="text-2xl font-bold tracking-wide">Announcements</h2>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg shadow-md mb-6">
                <div className="flex justify-start">
                    <button className="btn btn-success" onClick={() => setShowAdd(true)}>
                        Add Announcement +
                    </button>
                </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
                <DataTable
                    value={announcements}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    emptyMessage="No Announcements Found"
                    className="text-white"
                >
                    <Column field="title" header="Title" body={(rowData) => truncateText(rowData.title)} />
                    <Column
                        field="message"
                        header="Message"
                        body={(rowData) => (
                            <div
                                className="text-sm max-w-xs font-normal"
                                dangerouslySetInnerHTML={{
                                    __html: truncateText(rowData.message),
                                }}
                            />
                        )}
                    />
                    <Column
                        header="Action"
                        body={(rowData) => (
                            <div className="flex gap-3">
                                <Link to={`/viewannouncement/${rowData.id}`}>
                                    <button className="btn btn-info">View</button>
                                </Link>
                                <button onClick={() => handleEditShow(rowData.id)} className="btn btn-warning">
                                    Edit
                                </button>
                                <button onClick={(e) => handleDelete(e, rowData.id)} className="btn btn-error">
                                    Delete
                                </button>
                            </div>
                        )}
                    />
                </DataTable>
            </div>

            <Dialog
                visible={showAdd}
                draggable={false}
                maximizable
                onHide={() => {
                    if (!showAdd) return;
                    setShowAdd(false);
                    setMessage("");
                    setTitle("");
                }}
                header="Add Announcement"
                className="w-11/12 md:w-1/2"
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <InputText
                        className="w-full"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <Editor
                        className="w-full bg-gray-300 text-black"
                        placeholder="Message"
                        value={message}
                        onTextChange={(e) => setMessage(e.htmlValue)}
                    />
                    <button type="submit" className="btn btn-success">
                        Announce It
                    </button>
                </form>
            </Dialog>

            <Dialog
                visible={editShow}
                draggable={false}
                maximizable
                onHide={() => {
                    if (!editShow) return;
                    setEditShow(false);
                    setMessage("");
                    setTitle("");
                }}
                header="Edit Announcement"
                className="w-11/12 md:w-1/2"
            >
                <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                    <InputText
                        className="w-full"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => {setTitle(e.target.value)}}
                        required
                    />
                    <Editor
                        className="w-full bg-gray-300 text-black"
                        placeholder="Message"
                        value={message}
                        onTextChange={(e) => setMessage(e.htmlValue)}
                    />
                    <button type="submit" className="btn btn-warning">
                        Edit Announcement
                    </button>
                </form>
            </Dialog>
        </div>
    );
};

export default Announcements;
