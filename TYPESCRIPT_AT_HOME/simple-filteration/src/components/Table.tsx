import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { BiSort } from "react-icons/bi";
import { MdSort } from "react-icons/md";
import { AiOutlineDown } from "react-icons/ai";
import { data } from "../utils/data";
import { DiVim } from "react-icons/di";

const Table = () => {
  const [projects, setProjects] = useState(data);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const [statusDropDownVisible, setStatusDropDownVisible] = useState<
    number | null
  >(null);
  const [filters, setFilters] = useState({
    name: "",
    country: "",
    email: "",
    project: "",
    status: "",
  });
  const handleSortOptionClick = (key: string) => {
    sortProjects(key);
    setDropdownVisible(false);
  };
  const sortProjects = (key: string) => {
    let sortedProjects = [...projects];

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      sortedProjects.sort((a, b) => (a[key] > b[key] ? -1 : 1));
      setSortConfig({ key, direction: "descending" });
    } else {
      sortedProjects.sort((a, b) => (a[key] > b[key] ? 1 : -1));
      setSortConfig({ key, direction: "ascending" });
    }
    setProjects(sortedProjects);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProjects = projects.filter(
    (project) =>
      (filters.name === "" ||
        project.client
          .toLocaleLowerCase()
          .includes(filters.name.toLocaleLowerCase())) &&
      (filters.country === "" ||
        project.country
          .toLowerCase()
          .includes(filters.country.toLowerCase())) &&
      (filters.email === "" ||
        project.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (filters.project === "" ||
        project.project
          .toLowerCase()
          .includes(filters.project.toLowerCase())) &&
      (filters.status === "" ||
        project.status.toLowerCase().includes(filters.status.toLowerCase()))
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedProjects = projects.map((project, i) =>
      i === index
        ? {
            ...project,
            status: newStatus,
            progress: newStatus === "Completed" ? "100%" : project.progress,
          }
        : project
    );
    setProjects(updatedProjects);
    setStatusDropDownVisible(null);
  };

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="w-[calc(100vw-4rem)] ml-[7rem]">
      <div className="flex items-center mb-5 space-x-[4rem] mt-[2rem]">
        <div className=" relative ">
          <button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className="bg-gray-900  text-white min-w-[150px] px-[15px] py-[10px]  border rounded-[10px] font-bold flex items-center justify-around  hover:bg-gray-700 cursor-pointer  transition-all"
          >
            <BiSort className="mr-[0.3rem]" />
            <span>Sort</span>
            <AiOutlineDown className="ml-2" />
          </button>

          {dropdownVisible && (
            <div className="z-50 absolute flex flex-col">
              <button
                onClick={() => handleSortOptionClick("client")}
                className="min-w-[150px] bg-gray-900 text-white w-[150px] px-[15px] py-[10px]  border rounded-[10px] font-bold  hover:bg-gray-700 cursor-pointer"
              >
                Name
              </button>
              <button
                onClick={() => handleSortOptionClick("country")}
                className="min-w-[150px] bg-gray-900 text-white w-[150px] px-[15px] py-[10px]  border rounded-[10px] font-bold  hover:bg-gray-700 cursor-pointer"
              >
                Country
              </button>
              <button
                onClick={() => handleSortOptionClick("date")}
                className="min-w-[150px] bg-gray-900 text-white w-[150px] px-[15px] py-[10px]  border rounded-[10px] font-bold  hover:bg-gray-700 cursor-pointer"
              >
                Date
              </button>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => setFiltersVisible(!filtersVisible)}
            className="bg-gray-900 text-white w-[250px] px-[15px] py-[10px]  border rounded-[10px] font-bold flex items-center justify-around  hover:bg-gray-700 cursor-pointer"
          >
            <MdSort className="mr-[0.3rem]" />
            <span>Filter</span>
            <AiOutlineDown className="ml-2" />
          </button>
          {filtersVisible && (
            <div className="z-50 absolute text-center">
              <div>
                <label className="text-white block">Filter by Name:</label>
                <input
                  onChange={handleFilterChange}
                  placeholder="Enter Name:"
                  className="w-[250px] border rounded-[10px] font-bold  hover:bg-gray-700 cursor-pointer border-white bg-gray-900 text-white px-4 py-[5px]"
                  type="text"
                  name="name"
                />
              </div>
              <div>
                <label className="text-white block">Filter by Country:</label>
                <input
                  onChange={handleFilterChange}
                  placeholder="Enter Country:"
                  className="w-[250px] border rounded-[10px] font-bold  hover:bg-gray-700 cursor-pointer border-white bg-gray-900 text-white px-4 py-[5px]"
                  type="text"
                  name="country"
                />
              </div>
              <div>
                <label className="text-white block">Filter by E-mail:</label>
                <input
                  onChange={handleFilterChange}
                  placeholder="Enter E-mail:"
                  className="w-[250px] border rounded-[10px] font-bold  hover:bg-gray-700 cursor-pointer border-white bg-gray-900 text-white px-4 py-[5px]"
                  type="text"
                  name="email"
                />
              </div>
              <div>
                <label className="text-white block">Filter by Project:</label>
                <input
                  onChange={handleFilterChange}
                  placeholder="Enter Project:"
                  className="w-[250px] border rounded-[10px] font-bold  hover:bg-gray-700 cursor-pointer border-white bg-gray-900 text-white px-4 py-[5px]"
                  type="text"
                  name="project"
                />
              </div>
              <div>
                <label className="text-white block">Filter by Status:</label>
                <input
                  onChange={handleFilterChange}
                  placeholder="Enter Status:"
                  className="w-[250px] border rounded-[10px] font-bold  hover:bg-gray-700 cursor-pointer border-white bg-gray-900 text-white px-4 py-[5px]"
                  type="text"
                  name="status"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className=" rounded border border-gray-700 text-white overflow-x-auto mr-9">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-5 py-3 text-left">Image</th>
              <th className="px-5 py-3 text-left">Name</th>
              <th className="px-5 py-3 text-left">Country</th>
              <th className="px-5 py-3 text-left">Email</th>
              <th className="px-5 py-3 text-left">Project Name</th>
              <th className="px-5 py-3 text-left">Task Progress</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Date</th>
              <th className="px-5 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project, index) => (
              <tr key={index} className="border border-gray-700">
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center items-center">
                    <img
                      src={project.image}
                      alt={project.client}
                      className="w-[3rem] h-[3rem] object-cover rounded-full"
                    />
                  </div>
                </td>
                <td className="px-4 py-2">{project.client}</td>
                <td className="px-4 py-2">{project.country}</td>
                <td className="px-4 py-2">{project.email}</td>
                <td className="px-4 py-2">{project.project}</td>
                <td className="px-4 py-2">
                  <div className="w-24 h-2 bg-gray-700 rounded">
                    <div
                      className="h-2 bg-green-500 rounded"
                      style={{ width: project.progress }}
                    ></div>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`p-1 rounded text-white ${
                      project.status === "Completed"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-4 py-2">{project.date}</td>
                <td className="px-4 py-2">
                  <div className="relative">
                    <BsThreeDots
                      className="cursor-pointer"
                      onClick={() => setStatusDropDownVisible(index)}
                    />
                    {statusDropDownVisible === index && (
                      <div className="z-999 absolute top-full right-0 mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg">
                        <button
                          onClick={() =>
                            handleStatusChange(index, "In Progress")
                          }
                          className="block px-4 py-2 text-white hover:bg-gray-700 w-full text-left"
                        >
                          In Progress
                        </button>
                        <button
                          onClick={() => handleStatusChange(index, "Completed")}
                          className="block px-4 py-2 text-white hover:bg-gray-700 w-full text-left"
                        >
                          Completed
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-4 mb-4 mr-12 items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded mr-2 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded ml-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
