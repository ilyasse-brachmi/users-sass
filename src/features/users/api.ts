export const getUsers = async () => {
  const result = await fetch('https://reqres.in/api/users?per_page=10', {
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
