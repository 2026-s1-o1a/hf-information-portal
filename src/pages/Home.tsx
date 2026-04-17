import { useState } from 'react'
import type { User } from '../App'

type Props = {
  user: User | null
  setUser: (u: User) => void
}

type Content = {
  id: number
  title: string
  type: 'article' | 'survey'
  targetRoles: string[]
  commentRoles: string[]
}

function Home({ user, setUser }: Props) {
  const [contents, setContents] = useState<Content[]>(() => {
    // DB REPLACE:
    // GET /contents
    const stored = localStorage.getItem('contents')
    return stored ? JSON.parse(stored) : []
  })

  const [newTitle, setNewTitle] = useState('')
  const [targetRoles, setTargetRoles] = useState<string[]>([])

  const handleAddContent = () => {
    if (!newTitle) return

    const newContent: Content = {
      id: Date.now(), // DB REPLACE: backend will generate ID
      title: newTitle,
      type: 'survey',
      targetRoles: targetRoles.length ? targetRoles : ['user'],
      commentRoles: targetRoles.length ? targetRoles : ['user'],
    }

    const updated = [...contents, newContent]

    setContents(updated)

    // DB REPLACE:
    // POST /contents
    localStorage.setItem('contents', JSON.stringify(updated))

    setNewTitle('')
    setTargetRoles([])
  }

  const toggleRole = (role: string) => {
    setTargetRoles(prev => (prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]))
  }

  const handleVerifyDoctor = () => {
    if (!user) return

    const updated: User = { ...user, role: 'doctor' }
    // DB REPLACE:
    // update role via API (e.g. PATCH /users/:id)
    localStorage.setItem('currentUser', JSON.stringify(updated))

    setUser(updated)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>HF Portal</h2>

      {user?.role === 'custodian' && <button onClick={handleVerifyDoctor}>Verify as Doctor</button>}

      {user?.role === 'custodian' && (
        <div>
          <input
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Survey title"
          />

          <div>
            <label>
              <input type="checkbox" onChange={() => toggleRole('user')} />
              User
            </label>

            <label>
              <input type="checkbox" onChange={() => toggleRole('doctor')} />
              Doctor
            </label>
          </div>

          <button onClick={handleAddContent}>Add Survey</button>
        </div>
      )}

      {contents
        .filter(c => user && (user.role === 'custodian' || c.targetRoles.includes(user.role)))
        .map(c => (
          <div key={c.id} style={{ border: '1px solid', margin: 10 }}>
            <h3>{c.title}</h3>

            {/* DB REPLACE (optional future):
                comments would come from backend */}
            {user?.role === 'custodian' || c.commentRoles.includes(user?.role || '') ? (
              <textarea placeholder="Comment..." />
            ) : (
              <p>No permission to comment</p>
            )}
          </div>
        ))}
    </div>
  )
}

export default Home
