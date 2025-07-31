import React, { useEffect, useMemo, useState } from "react";
import DataTable from "./Table/DataTable";
import { COLUMNS } from "./Table/columns";

const Users = () => {
  const columns = useMemo(() => COLUMNS, []);

  const [apiData, setApiData] = useState([]);

  //Api url
  const apiUrl = "http://localhost:5000/users";

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        const result = await response.json();
        setApiData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

 

  const [searchKeyword, setSearchKeyword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const paginatedRows = apiData.slice((page - 1) * limit, page * limit);
  const totalItem = apiData.length;

  // Update filter query when gender or age changes
  const updateFilterQuery = (newGender, newAge) => {
    const filters = [];
    if (newGender) filters.push(`gender=${newGender}`);
    if (newAge) filters.push(`age=${newAge}`);
    setFilterQuery(filters.length ? `&_${filters.join("&_")}` : "");
  };

  // Handle gender change
  const handleGenderChange = (e) => {
    const newGender = e.target.value;
    setGender(newGender);
    updateFilterQuery(newGender, age);
  };

  // Handle age change
  const handleAgeChange = (e) => {
    const newAge = e.target.value;
    setAge(newAge);
    updateFilterQuery(gender, newAge);
  };

   // Fetch data from API
  const fetchData = async (customPage = page, customLimit = limit) => {
    try {
      setLoading(true);
      const url = searchKeyword
        ? `${apiUrl}?_page=${customPage}&_limit=${customLimit}&search=${searchKeyword}${filterQuery}`
        : `${apiUrl}?_page=${customPage}&_limit=${customLimit}${filterQuery}`;

      const response = await fetch(url);
      const result = await response.json();

      setApiData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = () => {
    fetchData();
    console.log("Search Keyword:", searchKeyword);
    console.log(gender, age);
    console.log(filterQuery);

    setSearchKeyword("");
    setGender("");
    setAge("");
  };

  return (
    <div className="p-4 overflow-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        {/* Global filter on the left */}
        <div className="flex-1 flex justify-start">
          <input
            type="text"
            placeholder={`${loading ? "Loading..." : "Search... "}`}
            className="border p-2 rounded w-full md:w-64 outline-none border-blue-300"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        <div className="flex flex-row gap-2 flex-1 justify-end items-center">
          <select
            className="border rounded p-2 border-blue-300 outline-none"
            value={gender}
            onChange={handleGenderChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select
            className="border rounded p-2 border-blue-300"
            value={age}
            onChange={handleAgeChange}
          >
            <option value="">Select Age</option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36-45">36-45</option>
            <option value="46+">46+</option>
          </select>
        </div>
      </div>

      <DataTable
        dataRows={paginatedRows}
        dataColumns={columns}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalItems={totalItem}
      />
    </div>
  );
};

export default Users;
