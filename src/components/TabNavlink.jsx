import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CreateUser from "./CreateUser";
import { Link } from "react-router-dom";


const TabNavlink = ({ row, value }) => {

	const editData = (row) => {
		const tableData = {
			_id: row._id,
			name: row.name,
			email: row.email,
			team: row.team,
			position: row.position,
			disabled: row.disabled,
			phone: row.phone
		};
		
	};
	// console.log('row', row?.original)
	return (
		<>

		
				<Link to={`create-user/${row?.original?._id}`}
				 state={{
					_id: row?.original?._id || '',
					name: row?.original?.name || '',
					email: row?.original?.email || '',
					team: row?.original?.team || '',
					position: row?.original?.position || '',
					disabled: row?.original?.disabled || false,
					phone: row?.original?.phone || ''

				}} >
				<span className="text-red-600">

					{value}
				</span>


			</Link>

		</>
	);
};

export default TabNavlink;
					{/* { row?.original[column?.accessorKey]} */}
