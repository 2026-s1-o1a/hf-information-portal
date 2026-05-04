import PostList from './PostList';

function Home() {
  return (
    <div>
      <div>Heart Failure Information Portal</div>

      <div className="content-container">
        <div className="content-header">
          <h2>Guidelines</h2>
        </div>
        <div className="content-body">
          <h3>Latest Guidelines</h3>
          <p>Get information on the latest guidelines here.</p>
          <PostList />
        </div>
      </div>
    </div>
  )
}
export default Home
