"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const ProjectPage = () => {
  const [allDataProject, setAllDataProject] = useState([]);
  const [inputData, setInputData] = useState({
    school: "",
    location: "",
    itemgoal: "",
    status: "PENDING",
  });
  const [updateData, setUpdateData] = useState(null); // Holds selected project for updating
  const [isModalVisible, setModalVisible] = useState(false); // For delete confirmation modal
  const [projectToDelete, setProjectToDelete] = useState(null); // To store project ID for deletion
  const [isDeletedMessageVisible, setDeletedMessageVisible] = useState(false); // For record deleted message
  const [isUpdatedMessageVisible, setUpdatedMessageVisible] = useState(false); // For record updated message
  const [isAddedMessageVisible, setAddedMessageVisible] = useState(false); // For new record added message

  async function fetchAllDataProject() {
    try {
      const res = await fetch("http://localhost:3000/api/project");
      const data = await res.json();
      setAllDataProject(data.project);
    } catch (error) {
      console.log(error);
    }
  }

  async function saveProject(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school: inputData.school,
          location: inputData.location,
          itemgoal: parseInt(inputData.itemgoal, 10),
          status: inputData.status,
        }),
      });

      if (res.ok) {
        setAddedMessageVisible(true); // Show added message
        fetchAllDataProject();
        setInputData({
          school: "",
          location: "",
          itemgoal: "",
          status: "PENDING",
        });
        // Hide message after 3 seconds
        setTimeout(() => {
          setAddedMessageVisible(false);
        }, 3000);
      } else {
        alert("Failed to add project");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function updateProject(e) {
    e.preventDefault();
    if (!updateData || !updateData.projectID) {
      alert("No project selected for update");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/project", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectID: updateData.projectID, // Ensure projectID is included
          school: updateData.school,
          location: updateData.location,
          itemgoal: parseInt(updateData.itemgoal, 10),
          status: updateData.status,
        }),
      });

      if (res.ok) {
        setUpdatedMessageVisible(true); // Show updated message
        fetchAllDataProject();
        setUpdateData(null);
        // Hide message after 3 seconds
        setTimeout(() => {
          setUpdatedMessageVisible(false);
        }, 3000);
      } else {
        alert("Failed to update project");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const showDeleteModal = (projectID) => {
    setProjectToDelete(projectID);
    setModalVisible(true);
  };

  const hideDeleteModal = () => {
    setModalVisible(false);
    setProjectToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      const res = await fetch("http://localhost:3000/api/project", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectID: projectToDelete }),
      });

      if (res.ok) {
        hideDeleteModal();
        setDeletedMessageVisible(true);
        fetchAllDataProject(); // Refresh the list after deletion
        // Hide message after 3 seconds
        setTimeout(() => {
          setDeletedMessageVisible(false);
        }, 3000);
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchAllDataProject();
  }, []);

  const handleRowClick = (project) => {
    setUpdateData(project); // Set clicked project for update
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (updateData) {
      setUpdateData((prev) => ({ ...prev, [name]: value }));
    } else {
      setInputData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="h-screen w-full flex justify-around items-center">
      <div className="w-[75%]">
        <div className="flex justify-left items-center gap-5 w-[100%]">
          <h1 className="font-noto text-black text-[30px] font-medium">
            Projects
          </h1>
          <div className="flex justify-between w-[55%]">
            <div className="text-black flex justify-between items-center h-fit px-[10px] py-[5px] rounded-[30px] w-[65%] border-[1px] border-black">
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent text-white placeholder-gray-500 border-none"
              />
              <Search color="black" />
            </div>
          </div>
        </div>

        <table className="w-[100%]">
          <thead>
            <tr className="bg-[#808080] text-white">
              <th className="text-center py-3">Project ID</th>
              <th className="text-center py-3">School</th>
              <th className="text-center py-3">Location</th>
              <th className="text-center py-3">Chairs Needed</th>
              <th className="text-center py-3">Status</th>
              <th className="text-center py-3 px-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {allDataProject.length > 0 ? (
              allDataProject.map((data, i) => (
                <tr
                  key={i}
                  className="border-b-[1px] border-black cursor-pointer"
                  onClick={() => handleRowClick(data)}
                >
                  <td className="text-center py-4 text-black">
                    {data.projectID}
                  </td>
                  <td className="text-center py-4 text-black">{data.school}</td>
                  <td className="text-center py-4 text-black">
                    {data.location}
                  </td>
                  <td className="text-center py-4 text-black">
                    {data.itemgoal}
                  </td>
                  <td className="text-center py-4 text-black">{data.status}</td>
                  <td className="text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering row click
                        showDeleteModal(data.projectID);
                      }}
                      className="bg-[#FF0000] text-white w-[80%] rounded-[5px]"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-black">
                  No projects available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="w-[20%] h-[56.5%] flex justify-center items-end">
        <div className="flex flex-col justify-around items-center rounded-md w-[100%] bg-[rgba(0,0,0,0.1)] h-[87%]">
          {updateData ? (
            <>
              <h1 className="text-black font-medium text-[20px]">
                Update Project
              </h1>
              <form
                onSubmit={updateProject}
                className="w-[90%] flex flex-col gap-3"
              >
                <div>
                  <p className="text-black">School</p>
                  <input
                    type="text"
                    name="school"
                    value={updateData.school}
                    onChange={handleChange}
                    className="bg-[#808080] py-[1px] px-[5px] rounded-sm w-full"
                  />

                  <p className="text-black">Location</p>
                  <input
                    type="text"
                    name="location"
                    value={updateData.location}
                    onChange={handleChange}
                    className="bg-[#808080] py-[1px] px-[5px] rounded-sm w-full"
                  />

                  <p className="text-black">Chairs Needed</p>
                  <input
                    type="text"
                    name="itemgoal"
                    value={updateData.itemgoal}
                    onChange={handleChange}
                    className="bg-[#808080] py-[1px] px-[5px] rounded-sm w-full"
                  />
                </div>

                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="py-[2px] w-[50%] rounded-md text-white bg-[#0078D4]"
                  >
                    Update
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-black font-medium text-[20px]">
                Add Project
              </h1>
              <form
                onSubmit={saveProject}
                className="w-[90%] flex flex-col gap-3"
              >
                <div>
                  <p className="text-black">School</p>
                  <input
                    type="text"
                    name="school"
                    value={inputData.school}
                    onChange={handleChange}
                    className="bg-[#808080] py-[1px] px-[5px] rounded-sm w-full"
                  />

                  <p className="text-black">Location</p>
                  <input
                    type="text"
                    name="location"
                    value={inputData.location}
                    onChange={handleChange}
                    className="bg-[#808080] py-[1px] px-[5px] rounded-sm w-full"
                  />

                  <p className="text-black">Chairs Needed</p>
                  <input
                    type="text"
                    name="itemgoal"
                    value={inputData.itemgoal}
                    onChange={handleChange}
                    className="bg-[#808080] py-[1px] px-[5px] rounded-sm w-full"
                  />
                </div>

                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="py-[2px] w-[50%] rounded-md text-white bg-[#588027]"
                  >
                    Add
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      {isModalVisible && (
        <div className="fixed inset-0 flex items-center h-screen w-full backdrop-blur-sm justify-center z-50">
          <div className="bg-white p-5 rounded shadow-md">
            <h2 className="text-lg font-bold">Delete Confirmation</h2>
            <p>Are you sure you want to delete this project?</p>
            <div className="flex justify-around mt-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={hideDeleteModal}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeletedMessageVisible && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 p-4 bg-red-500 text-white rounded shadow-md">
          Record Deleted!
        </div>
      )}

      {isUpdatedMessageVisible && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 p-4 bg-[#0078D4] text-white rounded shadow-md">
          Record updated!
        </div>
      )}

      {isAddedMessageVisible && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 p-4 bg-[#588027] text-white rounded shadow-md">
          Added new record!
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
