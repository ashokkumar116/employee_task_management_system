import { Column } from "primereact/column";
import axios from "../../axios";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import Swal from "sweetalert2";

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [title,setTitle] = useState("");
    const [message,setMessage] = useState("");

    const fetchAnnouncements = async () => {
        const res = await axios.get("/announcements/getannouncements");
        setAnnouncements(res.data);
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const handleSubmit = async(e)=>{
      e.preventDefault();
      try {
        const response = await axios.post('/announcements/createannouncement',{title,message});
        if(response.status === 200){
          setShowAdd(false);
          setMessage("");
          setTitle("");
          Swal.fire({
            icon:"success",
            title:"Created!",
            text:"New Announcement is Created successfully"
          })
          fetchAnnouncements();

        }
      } catch (error) {
        console.log(error);
      }
    }

    return (
        <div className="px-4 py-6 pl-56 pr-6 py-6">
            <div className="top my-5">
                <button
                    className="btn btn-success"
                    onClick={() => setShowAdd(true)}
                >
                    Add Announcement +
                </button>
            </div>
            <div className="table">
                <DataTable
                    value={announcements}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                >
                    <Column field="title" header="Title" />
                    <Column field="message" header="Message" body={(rowData)=>{return<div className="text-sm prose prose-sm max-w-none font-normal" dangerouslySetInnerHTML={{__html:rowData.message}} />}} />
                    <Column
                        header="Action"
                        body={(rowData) => {
                            return (
                                <div className="flex gap-3">
                                    <Link
                                        to={`/viewannouncement/${rowData.id}`}
                                    >
                                        <button className="btn btn-info">
                                            View
                                        </button>
                                    </Link>
                                    <Link
                                        to={`/viewannouncement/${rowData.id}`}
                                    >
                                        <button className="btn btn-warning">
                                            Edit
                                        </button>
                                    </Link>
                                    <Link
                                        to={`/viewannouncement/${rowData.id}`}
                                    >
                                        <button className="btn btn-error">
                                            Delete
                                        </button>
                                    </Link>
                                </div>
                            );
                        }}
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
                }}
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <InputText className="w-100" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                  <Editor className="bg-gray-300 w-100 text-black" placeholder="Message" value={message} onTextChange={(e)=>setMessage(e.htmlValue)} />
                  <button type="submit" className="btn btn-success">Announce It</button>
                </form>
            </Dialog>
        </div>
    );
};

export default Announcements;
