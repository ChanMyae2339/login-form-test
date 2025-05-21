// columns.ts or columns.js
import { createColumnHelper } from "@tanstack/react-table";

// TypeScript type (remove or change if using JS)
type Person = {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
};

const columnHelper = createColumnHelper<Person>();

export const COLUMNS = [
  columnHelper.accessor("id", {
    header: "ID",
    footer: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("first_name", {
    header: "First Name",
    footer: "First Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("last_name", {
    header: "Last Name",
    footer: "Last Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: "Age",
    footer: "Age",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
    footer: "Gender",
    cell: (info) => info.getValue(),
  }),
];

export const GROUP_COLUMNS = [
  columnHelper.accessor("id", {
    header: "ID",
    footer: "ID",
  }),
  {
    header: "Name",
    footer: "Name",
    columns: [
      columnHelper.accessor("first_name", {
        header: "First Name",
        footer: "First Name",
      }),
      columnHelper.accessor("last_name", {
        header: "Last Name",
        footer: "Last Name",
      }),
    ],
  },
  {
    header: "Info",
    footer: "Info",
    columns: [
      columnHelper.accessor("age", {
        header: "Age",
        footer: "Age",
      }),
      columnHelper.accessor("gender", {
        header: "Gender",
        footer: "Gender",
      }),
    ],
  },
];
