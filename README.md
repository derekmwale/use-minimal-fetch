#USE MINIMAL FETCH

A minimal, type-safe React `useFetch` hook with an Axios wrapper.

## Features

- Lightweight alternative to React Query / SWR
- Auto handles `loading`, `error`, and `data` states
- Built on Axios with:
  - Token injection
  - Custom headers
  - Interceptors
- perform GET requests
- perform POST requests 
- Perform all HTTP requests easily

## Install

```bash

## 1. Set Up .env
    The first thing you do is to setup your base url for you apis or endpoints to be used easily*/
    VITE_API_BASE_URL=https://your-api.com

## 2. Use the useHookFetch function
   just import the useHookFetch function and add a endpoint for your GET request
   
   #e.g
   import { useFetchHook } from "use-minimal-fetch";
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


## 2. Importing and using usePost for POST requests
   just import the usePost and add a endpoint for your POST request

   #e.g
      import { usePost } from "usefetch-api-wrapper";

      function CreateUserForm() {
        const { post, data, loading, error } = usePost("/users");

        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          try {
            await post({ name: "John Doe", email: "john@example.com" });
            alert("User created!");
          } catch {
            alert("Failed to create user");
          }
        };

        return (
          <form onSubmit={handleSubmit}>
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create User"}
            </button>
            {error && <p>{error.message}</p>}
          </form>
        );
      }


## 3. Import and using useApi for All HTTP requests like GET, POST, PUT, PATCH and DELETE
  just import the useApi then add a endpoint and specify the method type
    ### `useApi(url, options)`

    Handles GET, POST, PUT, PATCH, DELETE with one hook.

    ```tsx
    const { data, loading, error, execute } = useApi("/users", {
      method: "post",
      lazy: true
    });

    execute({ name: "John Doe" });
    

  #e.g
  🔹 GET (auto-loads):
  const { data, loading, error } = useApi("/posts");


  🔹 POST (manual):
  const { loading, error, execute } = useApi("/posts", {
    method: "post",
    lazy: true
  });

  const handleSubmit = () => {
      execute({ title: "New Post", body: "Hello world" });
  };


  🔹 DELETE:
  const { execute } = useApi("/posts/1", { method: "delete", lazy: true });

  const handleDelete = () => {
    execute();
  };



npm install use-minimal-fetch
