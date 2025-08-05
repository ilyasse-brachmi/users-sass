import { FetchResponse } from "@/types/global";
import { User } from "@/types/users";


export const getUsers = async (page: number = 1, perPage: number = 12): Promise<FetchResponse<User>> => {
  const result = await fetch(`https://reqres.in/api/users?page=${page}&per_page=${perPage}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'reqres-free-v1',
    },
    cache: 'no-store',
  });

  if (!result.ok) {
    throw new Error('Failed to fetch users');
  }

  const json = await result.json();
  return json;
};

// Keep the old function for backward compatibility if needed
export const getUsersLegacy = async () => {
  const result = await fetch('https://reqres.in/api/users?per_page=12', {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'reqres-free-v1',
    },
    cache: 'no-store',
  });

  if (!result.ok) {
    throw new Error('Failed to fetch users');
  }

  const json = await result.json();
  return json.data;
};