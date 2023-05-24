import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
const AllTeam = () => {

  const [data, setData] = useState([]);
  const navigate = useNavigate();


  const Getdata = async () => {
    try {
      const res = await axios.get('/getteam');
      console.log(res.data);
      setData(res.data)
    } catch (error) {
      console.log(error);
    }

  }

  const teamdelete = async(id) => {
    try {
      const res = await axios.delete(`/teamdelete/${id}`)
      console.log(res);
      Getdata()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Getdata()
  }, []);

  return (
    <>
      <div class="container pt-5">
        <h2>All Registred Teams</h2>
        <p>All Teams for New Compitition</p>
        <NavLink to={`/addteam`} >
          <button className='btn btn-primary mt-4 mb-3'>Add New Team +</button>
        </NavLink>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Team Id</th>
              <th>Team Name</th>
              <th>Team Leader Name</th>
              <th>Team Member</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((e) => {
                return (
                  <tr>
                    <td>{e.id}</td>
                    <td>{e.Team_Name}</td>
                    <td>{e.Team_Leader}</td>
                    <td>{e.Total_Team_Member}</td>
                    <td>
                    <button className='btn btn-success mr-3' onClick={() => {navigate(`/addteam/${e.id}`)}}>Update</button>
                    <button className='btn btn-danger' onClick={() => {teamdelete(e.id)}}>Delete</button>
                    </td>
                  </tr>

                )
              })
            }

          </tbody>
        </table>
      </div>

    </>
  )
}

export default AllTeam