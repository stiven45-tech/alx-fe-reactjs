import { useQuery } from '@tanstack/react-query';

const PostsComponent = () => {
  // Fetch function for posts
  const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  // Using useQuery hook to fetch data
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 60000, // Data is fresh for 1 minute
    cacheTime: 300000, // Cache persists for 5 minutes
  });

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Loading posts...</h2>
        <div style={{ fontSize: '48px' }}>⏳</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        <h2>Error fetching posts</h2>
        <p>{error.message}</p>
        <button onClick={() => refetch()} style={{ padding: '10px 20px', marginTop: '10px' }}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Posts from JSONPlaceholder API</h1>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          style={{
            padding: '10px 20px',
            backgroundColor: isFetching ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isFetching ? 'not-allowed' : 'pointer'
          }}
        >
          {isFetching ? 'Refetching...' : 'Refetch Data'}
        </button>
      </div>

      <p style={{ color: '#666', marginBottom: '20px' }}>
        Total Posts: {data?.length || 0}
        {isFetching && ' (Updating...)'}
      </p>

      <div style={{ display: 'grid', gap: '15px' }}>
        {data?.slice(0, 10).map((post) => (
          <div
            key={post.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <h3 style={{ marginTop: 0, color: '#333' }}>
              {post.id}. {post.title}
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>{post.body}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px' }}>
        <h3>React Query Features Demo:</h3>
        <ul style={{ lineHeight: '2' }}>
          <li> Automatic caching - Try navigating away and back</li>
          <li> Background refetching - Data updates automatically</li>
          <li> Loading and error states - Handled automatically</li>
          <li> Manual refetch - Use the button above</li>
          <li> Data stays fresh for 1 minute (staleTime)</li>
        </ul>
      </div>
    </div>
  );
};

export default PostsComponent;
