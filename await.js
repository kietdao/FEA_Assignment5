const axios = require('axios')

async function getCovidData() {
    try {
        const data = await axios.get('https://api.covid19api.com/summary')
        return data
    } catch {
        console.log('Không lấy được dữ liệu')
    }
}

async function alertPending() {
    console.log("Đã lấy dữ liệu thành công, đang xuất thống kê:")
}

async function displayData(totalDeath, newDeath) {
    console.log('Đang lấy dữ liệu, xin vui lòng chờ...')
    await alertPending()
    const result = await getCovidData()
    console.log('Dữ liệu Covid hôm nay:')
    console.log(`Nhiễm mới: ${result.data.Global.NewConfirmed} - Số người chết mới: ${result.data.Global.NewDeaths} - Tổng số người chết: ${result.data.Global.TotalDeaths}`)
    console.log(`Quốc Gia có số lượng tổng cộng người chết nhiều nhất là: ${totalDeath(result.data.Countries)}`)
    console.log(`Quốc Gia có số lượng người mắc mới trong ngày nhiều nhất là: ${newDeath(result.data.Countries)}`)
}

displayData(getCountryHaveHighestTotalDeath, getCountryHaveHighestNewConfirmed)

function getCountryHaveHighestTotalDeath(countries) {
    return getCountryHaveHighestPeople(countries, 'TotalDeaths')
}

function getCountryHaveHighestNewConfirmed(countries) {
    return getCountryHaveHighestPeople(countries, 'NewConfirmed')
}

function getCountryHaveHighestPeople(countries, option) {
    const numbers = countries.map(country => {
        return country[option]
    })
    const highestNumber = Math.max(...numbers)
    const result = countries.filter(country => {
        return country[option] === highestNumber
    })

    return `${result[0]['Country']} (${result[0][option]} người)`
}

