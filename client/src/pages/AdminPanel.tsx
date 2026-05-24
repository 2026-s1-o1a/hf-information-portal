import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './AdminPanel.module.css'

type VerificationRequest = {
  id: string
  email: string
  firstName: string
  lastName: string

  requestedRole: 'clinician' | 'doctor' | 'pharmacy' | 'custodian'

  verificationData: {
    ahpraNumber?: string

    organisation?: string

    workEmail?: string

    pharmacyName?: string
    pharmacyAddress?: string
    licenseNumber?: string

    phoneNumber?: string
  }
}

function AdminPanel() {
  const [requests, setRequests] = useState<VerificationRequest[]>([])

  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/verification-requests', {
          withCredentials: true,
        })
        console.log(response.data)
        setRequests(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchRequests()
  }, [])

  const handleApprove = async () => {
    try {
      if (!selectedRequest) return

      await axios.post(
        'http://localhost:3000/api/auth/approve-request',
        {
          applicationId: selectedRequest.id,
        },
        {
          withCredentials: true,
        }
      )

      alert('Application approved')

      setRequests(prev => prev.filter(request => request.id !== selectedRequest.id))

      setSelectedRequest(null)
    } catch (error) {
      console.error(error)

      alert('Failed to approve application')
    }
  }

  const handleReject = async () => {
    try {
      if (!selectedRequest) return

      await axios.post(
        'http://localhost:3000/api/auth/reject-request',
        {
          applicationId: selectedRequest.id,
        },
        {
          withCredentials: true,
        }
      )

      alert('Application rejected')

      setRequests(prev => prev.filter(request => request.id !== selectedRequest.id))

      setSelectedRequest(null)
    } catch (error) {
      console.error(error)

      alert('Failed to reject application')
    }
  }

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>

      <h2>Pending Verification Requests</h2>

      <div className={styles.requestsContainer}>
        {/* Left */}
        <div className={styles.requestsList}>
          {requests.map(request => (
            <div
              key={request.id}
              className={styles.requestCard}
              onClick={() => setSelectedRequest(request)}
            >
              <h3>
                {request.firstName} {request.lastName}
              </h3>

              <p>
                Requested Role: <strong>{request.requestedRole}</strong>
              </p>
            </div>
          ))}
        </div>

        {/* Right */}
        <div className={styles.detailsPanel}>
          {selectedRequest ? (
            <>
              <h2>
                {selectedRequest.firstName} {selectedRequest.lastName}
              </h2>
              <strong>Email:</strong> {selectedRequest.email}
              <p>
                <strong>Requested Role:</strong> {selectedRequest.requestedRole}
              </p>
              <hr />
              <h3>Verification Details</h3>
              {Object.entries(selectedRequest.verificationData).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
              <div className={styles.buttonGroup}>
                <button className={styles.approveBtn} onClick={handleApprove}>
                  Approve
                </button>

                <button className={styles.rejectBtn} onClick={handleReject}>
                  Reject
                </button>
              </div>
            </>
          ) : (
            <p>Select a request to view details.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
