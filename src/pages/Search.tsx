import "./Search.css"
import { useState } from "react"

function Search() {
    const [type, setType] = useState("all");
    const [date, setDate] = useState("any");
    const [sort, setSort] = useState("relevance");

    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState([{ title: "Results will appear here", type: "info" }]);
    
    const handleSearch = () => {
        const data = [
            { title: "What is Heart Failure?", type: "video" },
            { title: "Heart Failure Risk Factors", type: "video" },
            { title: "Heart Failure: 10 Management Tips", type: "blog" },
            { title: "Heart Failure Prevention Tips from a Professional", type: "podcast" }
        ];

        const filtered = data.filter((item) => {
            const matchesText = item.title
              .toLowerCase()
              .includes(searchText.toLowerCase());
        
            const matchesType =
              type === "all" || item.type === type;
        
            return matchesText && matchesType;
        });

        setResults(filtered);
    };


    return (
      <div className="search-container">
        <div className="search-card">
          <h2>Search</h2>
          <div className="search-form">
            <div className="search-group">
              <input type="text" placeholder="Search..." className="search-input" value={searchText}
              onChange={(e) => setSearchText(e.target.value)}/>
            </div>

            <div className="search-group">
                <select className="search-select" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="all">All</option>
                    <option value="video">Video</option>
                    <option value="blog">Blog</option>
                    <option value="podcast">Podcast</option>
                </select>

                <select className="search-select" value={date} onChange={(e) => setDate(e.target.value)}>
                    <option value="any">Any time</option>
                    <option value="24h">Last 24 hours</option>
                    <option value="week">Last week</option>
                </select>

                <select className="search-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="relevance">All</option>
                    <option value="latest">Latest</option>
                </select>
            </div>

            <button className="search-btn" onClick={handleSearch}>Search</button>
  
            <div className="results-group">
                {results.length === 0 ? (
                    <p>No results found</p>
                ) : (
                    results.map((item, index) => (
                        <p key={index}>
                            {item.title} ({item.type})
                        </p>
                    ))
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Search;