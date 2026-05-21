import { useEffect, useState } from 'react'

import axios from 'axios'

import styles from './RoleApplicationForm.module.css'
import { useNavigate } from 'react-router-dom'

type Role = 'clinician' | 'doctor' | 'pharmacy' | 'custodian'

const allRoles: Role[] = ['clinician', 'doctor', 'pharmacy', 'custodian']

function RoleApplicationForm() {
  const navigate = useNavigate()

  const [availableRoles, setAvailableRoles] = useState<Role[]>(allRoles)

  const [requestedRole, setRequestedRole] = useState<Role>('clinician')

  const [ahpraNumber, setAhpraNumber] = useState('')
  const [organisation, setOrganisation] = useState('')
  const [workEmail, setWorkEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const [pharmacyName, setPharmacyName] = useState('')
  const [pharmacyAddress, setPharmacyAddress] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')

  useEffect(() => {
    const fetchAvailableRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/me', {
          withCredentials: true,
        })

        const userRoles = response.data.roles || []

        const pendingRoles = response.data.pendingRoles || []

        const unavailableRoles = [...userRoles, ...pendingRoles]

        const filteredRoles = allRoles.filter(role => !unavailableRoles.includes(role))

        setAvailableRoles(filteredRoles)

        if (filteredRoles.length > 0) {
          setRequestedRole(filteredRoles[0])
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchAvailableRoles()
  }, [])

  const handleSubmit = async () => {
    try {
      if (!requestedRole) {
        alert('No roles available')
        return
      }

      let verificationData = {}

      if (
        requestedRole === 'doctor' ||
        requestedRole === 'clinician' ||
        requestedRole === 'custodian'
      ) {
        if (!ahpraNumber || !organisation || !workEmail || !phoneNumber) {
          alert('Please complete all verification fields')

          return
        }

        verificationData = {
          ahpraNumber,
          organisation,
          workEmail,
          phoneNumber,
        }
      }

      if (requestedRole === 'pharmacy') {
        if (!pharmacyName || !pharmacyAddress || !licenseNumber || !phoneNumber) {
          alert('Please complete all pharmacy fields')

          return
        }

        verificationData = {
          pharmacyName,
          pharmacyAddress,
          licenseNumber,
          phoneNumber,
        }
      }

      await axios.post(
        'http://localhost:3000/api/auth/apply',
        {
          requestedRole,
          verificationData,
        },
        {
          withCredentials: true,
        }
      )

      alert('Role application submitted')

      navigate('/')
    } catch (error) {
      console.error(error)

      alert('Failed to submit application')
    }
  }

  return (
    <div className={styles.container}>
      <h2>Apply for Additional Roles</h2>

      {availableRoles.length === 0 ? (
        <p>You already have or applied for all available roles.</p>
      ) : (
        <>
          <div className={styles.formGroup}>
            <label>Requested Role</label>

            <select value={requestedRole} onChange={e => setRequestedRole(e.target.value as Role)}>
              {availableRoles.map(role => (
                <option key={role} value={role}>
                  {role === 'custodian'
                    ? 'Content Custodian'
                    : role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {(requestedRole === 'doctor' ||
            requestedRole === 'clinician' ||
            requestedRole === 'custodian') && (
            <>
              <div className={styles.formGroup}>
                <label>{requestedRole === 'custodian' ? 'Employee ID' : 'AHPRA Number'}</label>

                <input
                  type="text"
                  value={ahpraNumber}
                  onChange={e => setAhpraNumber(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Organisation</label>

                <input
                  type="text"
                  value={organisation}
                  onChange={e => setOrganisation(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Work Email</label>

                <input
                  type="email"
                  value={workEmail}
                  onChange={e => setWorkEmail(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Phone Number</label>

                <input
                  type="text"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div>
            </>
          )}

          {requestedRole === 'pharmacy' && (
            <>
              <div className={styles.formGroup}>
                <label>Pharmacy Name</label>

                <input
                  type="text"
                  value={pharmacyName}
                  onChange={e => setPharmacyName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Pharmacy Address</label>

                <input
                  type="text"
                  value={pharmacyAddress}
                  onChange={e => setPharmacyAddress(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>License Number</label>

                <input
                  type="text"
                  value={licenseNumber}
                  onChange={e => setLicenseNumber(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Phone Number</label>

                <input
                  type="text"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div>
            </>
          )}

          <button className={styles.submitBtn} onClick={handleSubmit}>
            Submit Application
          </button>
        </>
      )}
    </div>
  )
}

export default RoleApplicationForm
