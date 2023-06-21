import React, { Suspense, lazy, useContext, useEffect, useState } from 'react'
import './Manageuser.css';
import {  deleteUsers , findUser, manageData } from '../Service/Admin.service';
import { LoginContext } from '../../ContextProvider/Context';
import { Link, useNavigate } from 'react-router-dom';
import Table from "react-bootstrap/Table";
import Paginations from '../Page/Pagination/Pagination';
const Headers1 = lazy(() => import("../Page/Headers1"));


const Manageusers = () => {
  const { setLoginData } = useContext(LoginContext);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("new");
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
 

  const getUser = async () => {
    try {
      await findUser(search, sort, page).then((res) => {
        setLoginData(true);
        setData(res.massage);
        setPageCount(res.Pagination.pageCount);
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  },[search,sort,page]);



   const getData = async () => {
     try {
       await manageData().then((res) => {
           setLoginData(true);
           setData(res.massage);
           navigate("/admin/manageuser");
       }).catch((err) => {
            navigate("/login");
         })
     } catch (err) {
       console.log(err);
     }
   };
  
    useEffect(() => {
      getData();
    },[]);
  
  

  
  const deleteUser =async(id) => {
    try {
      await deleteUsers(id).then((res) => {
        window.location.reload();
      })
    } catch (err) {
      console.log(err)
    }
  }

//handlePrevious
    const handlePrevious = () => {
      setPage(() => {
        if (page === 1) return page;
        return page - 1;
      });
    };
 
  //handleNext
  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };


 
  return (
    <>
      {role === "admin" ? (
        <>
          <Suspense fallback={<>Loading...</>}>
            <Headers1 />
          </Suspense>
          <div className="mt-3 mb-5 d-flex,justify-content-center">
            <h2>Welcome to Manageusers Pannel</h2>
            <div>
              <input
                type="search"
                placeholder="Search here☺️"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="search"
              />
            </div>
            <div>
              <select>
                <option> Sort By Value </option>
                <option onClick={(e) => setSort("new")}>New</option>
                <option onClick={(e) => setSort("old")}>Old</option>
              </select>
            </div>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>User Name</th>
                <th>Email Id</th>
                <th>Mobile No.</th>
                <th>Date </th>
                <th>Role</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            {data.length > 0 ? (
              <>
                {data.map((row, i) => (
                  <tbody key={i}>
                    <tr>
                      <td>{i + 1 + (page-1)*4}</td>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.mobile}</td>
                      <td>{row.info}</td>
                      <td>{row.role}</td>
                      <td>
                        <Link to={`/admin/edit/${row._id}`} className="edit">
                          Edit
                        </Link>
                      </td>
                      <td>
                        <button onClick={() => { deleteUser(row._id)}}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </>
            ) : (
              <center>
                <h1>Data not found</h1>
              </center>
            )}
          </Table>
          <Paginations
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
          />
        </>
      ) : (
        navigate("/login")
      )}
    </>
  );
}

export default Manageusers