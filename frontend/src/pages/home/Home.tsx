import { useState } from 'react'
import type { User } from '../App'
import Navbar from '../../components/Navbar'

type Props = {
  user: User | null
  setUser: (u: User) => void
}

type Role = 'user' | 'doctor' | 'custodian' | 'admin'

const roleLabels: Record<Role, string> = {
  user: 'Everyone',
  doctor: 'Doctors',
  custodian: 'Custodians',
  admin: 'Admins',
}

type Content = {
  id: number
  title: string
  type: 'article' | 'survey'
  targetRole: Role
  commentRole: Role | 'none'
}

function Home({ user }: Props) {
  const [contents, setContents] = useState<Content[]>(() => {
    const stored = localStorage.getItem('contents')
    return stored ? JSON.parse(stored) : []
  })

  const [newTitle, setNewTitle] = useState('')
  const [targetRole, setTargetRole] = useState<Role | ''>('')
  const [commentRole, setCommentRole] = useState<Role | 'none'>('none')

  const roleLevel: Record<Role, number> = {
    user: 1,
    doctor: 2,
    custodian: 3,
    admin: 4,
  }

  const handleAddContent = () => {
    if (!newTitle) return
    if (!targetRole) {
      alert('Please select target role')
      return
    }

    const newContent: Content = {
      id: Date.now(),
      title: newTitle,
      type: 'survey',
      targetRole,
      commentRole,
    }

    const updated = [...contents, newContent]

    setContents(updated)
    localStorage.setItem('contents', JSON.stringify(updated))

    // reset everything
    setNewTitle('')
    setTargetRole('')
    setCommentRole('none')
  }

  const getCommentOptions = () => {
    if (!targetRole) return []

    const levels: Role[] = ['user', 'doctor']

    return levels.filter(r => roleLevel[r] >= roleLevel[targetRole])
  }

  return (
    
    <div style={{ padding: '20px' }}>
      <Navbar />
      <h2>HF Portal</h2>

      {/* ONLY custodian can create content */}
      {user?.role === 'custodian' && (
        <div>
          <input
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Survey title"
          />

          {/* TARGET */}
          <div>
            <label>Audience:</label>
            <select
              value={targetRole}
              onChange={e => {
                const newTarget = e.target.value as Role
                setTargetRole(newTarget)

                // reset invalid commentRole when target changes
                if (commentRole !== 'none' && roleLevel[commentRole] < roleLevel[newTarget]) {
                  setCommentRole('none')
                }
              }}
            >
              <option value="">Select</option>
              <option value="user">{roleLabels.user}</option>
              <option value="doctor">{roleLabels.doctor}</option>
            </select>
          </div>

          {/* COMMENT CONTROL */}
          <div>
            <label>Who can comment?</label>

            <select
              value={commentRole}
              onChange={e => setCommentRole(e.target.value as Role | 'none')}
            >
              <option value="none">No one</option>

              {getCommentOptions().map(role => (
                <option key={role} value={role}>
                  {roleLabels[role]}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleAddContent}>Add Survey</button>
        </div>
      )}

      {contents
        .filter(c => {
          if (!user) return c.targetRole === 'user'
          if (user.role === 'admin') return true

          return roleLevel[user.role] >= roleLevel[c.targetRole]
        })
        .map(c => (
          <div key={c.id} style={{ border: '1px solid', margin: 10 }}>
            <h3>{c.title}</h3>

            {user &&
            (user.role === 'admin' ||
              user.role === 'custodian' ||
              (c.commentRole !== 'none' && roleLevel[user.role] >= roleLevel[c.commentRole])) ? (
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
