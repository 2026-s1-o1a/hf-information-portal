import type { User } from '../App'

type Props = {
  user: User | null
}

function Home({ user }: Props) {
  return (
    <div>
      <h2>Heart Failure Information Portal</h2>

      <div>
        <h3>Guidelines</h3>
        <p>Latest guidelines content...</p>

        {/* ONLY FOR CUSTODIAN */}
        {user?.role === 'custodian' && (
          <div style={{ marginTop: '20px' }}>
            <button>Add Content</button>
            <button>Edit Content</button>
          </div>
        )}
      </div>
    </div>
  )
}
export default Home
