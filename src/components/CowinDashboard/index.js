import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationCoverage from '../VaccinationCoverage'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {vaccinationData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getVaccinationByAge()
  }

  getVaccinationByAge = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachItem => ({
          vaccineDate: eachItem.vaccine_date,
          dose1: eachItem.dose_1,
          dose2: eachItem.dose_2,
        })),

        vaccinationByGender: data.vaccination_by_gender.map(eachItem => ({
          gender: eachItem.gender,
          count: eachItem.count,
        })),

        vaccinationByAge: data.vaccination_by_age.map(eachItem => ({
          age: eachItem.age,
          count: eachItem.count,
        })),
      }
      this.setState({
        vaccinationData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="paragraph">Something went Wrong</p>
    </div>
  )

  renderVaccinationStatus = () => {
    const {vaccinationData} = this.state

    return (
      <>
        <VaccinationCoverage
          vaccineDosage={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender genderData={vaccinationData.vaccinationByGender} />
        <VaccinationByAge ageData={vaccinationData.vaccinationByAge} />
      </>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderViewBasedOnAPIStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVaccinationStatus()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div className="image-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo-image"
          />
          <h1 className="heading">Co-WIN</h1>
          <h1 className="heading">CoWIN Vaccination in India</h1>
        </div>
        {this.renderViewBasedOnAPIStatus()}
      </div>
    )
  }
}

export default CowinDashboard
