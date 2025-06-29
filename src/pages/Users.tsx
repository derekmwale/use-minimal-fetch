import { useFetchHook } from "../hooks/useFetchHook";

export default function Users() {
  const { data, loading, error, refetch } = useFetchHook("/forum/users/");

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Users</h2>
      <button onClick={refetch}>Refetch</button>
      <ul>
        {data?.map((user: any) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}
