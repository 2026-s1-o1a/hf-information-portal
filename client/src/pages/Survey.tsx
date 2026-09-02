import { useEffect, useState } from 'react'
import { getForms } from '../services/umbraco'

type Survey = {
  id: string
  name: string
  createdBy: number
  created: string
  updated: string
}

export default function SurveyList() {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getForms()
      .then(setSurveys)
      .catch(err => setError(err.message))
  }, [])

  const openSurvey = (formId: string) => {
    window.location.href =
      `https://localhost:44343/surveys/?formId=${formId}`
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div>
      <h1>Available Surveys</h1>



  <table className="table table-striped table-bordered">
  <thead>
    <tr>
      <th>Name</th>
      <th>Created By</th>
      <th>Created</th>
      <th>Updated</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {surveys.map(survey => (
      <tr key={survey.id}>
        <td>{survey.name}</td>
        <td>{survey.createdBy}</td>
        <td>
          {new Date(survey.created).toLocaleDateString()}
        </td>
        <td>
          {new Date(survey.updated).toLocaleDateString()}
        </td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => openSurvey(survey.id)}
          >
            Take Survey
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  )
}

