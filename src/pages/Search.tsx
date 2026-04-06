import "./Search.css"

function Search() {
    return (
      <div className="search-container">
        <div className="search-card">
          <h2>Search</h2>
          <div className="search-form">
            <div className="search-group">
              <input type="text" placeholder="Type something..." className="search-input"/>
            </div>
            <button className="search-btn">Search</button>
  
            <div
              className="results-group"
              style={{
                marginTop: "1rem",
                padding: "0.5rem",
                backgroundColor: "#2e386e",
                borderRadius: "4px",
                color: "white",
                textAlign: "center",
              }}
            >
              Results will appear here
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Search;