import { Link } from "react-router-dom";

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
          <p>
          <Link to="/content">
          Go to Content Page
          </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Home
