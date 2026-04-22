import { useState } from 'react'
import styles from './Search.module.css'

function Search() {
  const [type, setType] = useState('all')
  const [date, setDate] = useState('any')
  const [sort, setSort] = useState('relevance')

  const [searchText, setSearchText] = useState('')
  const [results, setResults] = useState([{ title: 'Results will appear here', type: 'info' }])

  const handleSearch = () => {
    const data = [
      { title: 'What is Heart Failure?', type: 'video' },
      { title: 'Heart Failure Risk Factors', type: 'video' },
      { title: 'Heart Failure: 10 Management Tips', type: 'blog' },
      { title: 'Heart Failure Prevention Tips from a Professional', type: 'podcast' },
    ]

    const filtered = data.filter(item => {
      const matchesText = item.title.toLowerCase().includes(searchText.toLowerCase())
      const matchesType = type === 'all' || item.type === type
      return matchesText && matchesType
    })

    setResults(filtered)
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchCard}>
        <h2>Search</h2>

        <div className={styles.searchForm}>
          <div className={styles.searchGroup}>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>

          <div className={styles.searchGroup}>
            <select
              className={styles.searchSelect}
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="video">Video</option>
              <option value="blog">Blog</option>
              <option value="podcast">Podcast</option>
            </select>

            <select
              className={styles.searchSelect}
              value={date}
              onChange={e => setDate(e.target.value)}
            >
              <option value="any">Any time</option>
              <option value="24h">Last 24 hours</option>
              <option value="week">Last week</option>
            </select>

            <select
              className={styles.searchSelect}
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="relevance">All</option>
              <option value="latest">Latest</option>
            </select>
          </div>

          <button className={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>

          <div className={styles.resultsGroup}>
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
  )
}

export default Search
