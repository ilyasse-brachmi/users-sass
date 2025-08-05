"use client";

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import CreateUserModal from "./CreateUserModal";

const UsersHeader = () => {

  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState(input);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);

    return () => clearTimeout(handler);
  }, [input]);

  useEffect(() => {
    if (debouncedInput) {
      console.log('Fetch API with:', debouncedInput);
    }
  }, [debouncedInput]);

  return (
    <>
      <div className="my-4 flex flex-col lg:flex-row gap-y-2 items-center justify-between p-2 bg-gray-50 rounded-lg w-full">
        <h1 className="font-bold text-4xl">Users</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 p-2 border rounded-lg border-gray-200">
            <SearchIcon sx={{ color: '#767676' }} />
            <input type="text" onChange={(e) => setInput(e.target.value)} placeholder="Search ..." className="border-0 outline-none bg-transparent" />
          </div>
          <button onClick={() => setOpen(true)} className="cursor-pointer flex gap-2 items-center bg-primary hover:bg-primary/80 duration-200 text-white rounded-lg px-4 py-2">
            <AddIcon />
            <span>Create User</span>
          </button>
        </div>
      </div>
      <CreateUserModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default UsersHeader;