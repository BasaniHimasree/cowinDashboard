import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  const {vaccineDosage} = props

  return (
    <>
      <h1 className="heading">Vaccination Coverage</h1>
      <ResponsiveContainer width={1000} height={300}>
        <BarChart
          data={vaccineDosage}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="group_name"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="dose1" name="Dose1" fill="#1f77b4" barSize="20%" />
          <Bar dataKey="dose2" name="Dose2" fill="#fd7f0e" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default VaccinationCoverage
