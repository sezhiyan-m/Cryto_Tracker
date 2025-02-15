import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({ historicalData }) => {
    const [data, setData] = useState([["Date", "Prices"]])

    useEffect(() => {
        let dataCopy = [["Date", "Prices"]]
        if (historicalData.prices) {
            historicalData.prices.forEach((price) => {//used for line chart date saying
                dataCopy.push([new Date(price[0]), price[1]]) 
            })
            setData(dataCopy)
        }
    }, [historicalData])

    return (
        <div>
            <Chart
                chartType="LineChart"
                data={data}
                height='100%'
                legendToggle
            />
        </div>
    )
}

export default LineChart