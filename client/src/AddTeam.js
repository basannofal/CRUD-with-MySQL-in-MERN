import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, NavLink, useNavigate, useParams } from 'react-router-dom'

const AddTeam = () => {

    const { id } = useParams('');
    const [isupdate, setIsupdate] = useState(false);
    const [tname, setTname] = useState('');

    const [team, setTeam] = useState({
        teamname: '',
        teamleader: '',
        totalmember: ''
    });

    const navigate = useNavigate()
    const handlechange = (e) => {
        setTeam((pre) => ({ ...pre, [e.target.name]: e.target.value }))
    }

    const Submit = async (e) => {
        e.preventDefault();
        console.log(team);
        try {
            await axios.post('/addteam', team);
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    const Getdata = async () => {
        try {
            const res = await axios.get(`/team/${id}`)
            setTname(res.data[0].Team_Name)
            setTeam({
                teamname: res.data[0].Team_Name,
                teamleader: res.data[0].Team_Leader,
                totalmember: res.data[0].Total_Team_Member
            })
            console.log(team);
        } catch (error) {
            console.log(error);
        }
    }

    const Update = async(e) => {
        e.preventDefault();
        try {
            const res = axios.patch(`/updateteam/${id}`, team)
            console.log(res);
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (id) {
            Getdata()
            setIsupdate(true)
        }
    }, []);
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className=" mx-auto">
                        <div className='my-2'>
                            <p><NavLink to={`/`} >--Go Back</NavLink></p>
                        </div>
                        <div className='border'>
                            {
                                isupdate
                                    ?
                                    <h2 className='mx-5 my-3 mb-4'>Update {tname} Team</h2>
                                    :
                                    <h2 className='mx-5 my-3 mb-4'>Team Ragistration</h2>
                            }
                            <div className="m-2 ">

                                <label className='label'>Enter Team Name</label>
                                <input type="text" name='teamname' className='form-control' placeholder='Enter Team Name' onChange={handlechange} value={team.teamname} />
                            </div>
                            <div className="m-2 ">

                                <label className='label'>Enter Team Leader Name</label>
                                <input type="text" name='teamleader' className='form-control' placeholder='Enter Team Leader Name' onChange={handlechange} value={team.teamleader} />
                            </div>

                            <div className="m-2 ">

                                <label className='label'>Enter Team Member</label>
                                <input type="number" name='totalmember' className='form-control' placeholder='Enter Team Member' onChange={handlechange} value={team.totalmember} />
                            </div>

                            <div className="m-2 mt-4">
                            {
                                isupdate 
                                ?
                                <button className='btn btn-primary' onClick={Update}>Update</button>
                                :
                                <button className='btn btn-primary' onClick={Submit}>Add Team</button>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddTeam