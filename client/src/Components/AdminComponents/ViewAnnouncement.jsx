import { useParams } from 'react-router-dom';
import axios from '../../axios';
import React, { useEffect, useState } from 'react'

const ViewAnnouncement = () => {

    const [announcement,setAnnouncement] = useState({});
    const {id} = useParams();
    const fetchAnnouncement = async()=>{
        const response = await axios.get(`/announcements/viewannouncement/${id}`)
        setAnnouncement(response.data);
    }

    useEffect(()=>{
        fetchAnnouncement();
    },[]);

    function formatDateTime(isoString) {
        const date = new Date(isoString);
        return date.toLocaleString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true, 
          timeZone: "Asia/Kolkata"
        });
      }
      

  return (
    <div className='px-4 py-6 pl-56 pr-6 py-6'>
      <h1>{announcement.title}</h1>
      <p>{announcement.message}</p>
      <p>{formatDateTime(announcement.created_at)}</p>

    </div>
  )
}

export default ViewAnnouncement
