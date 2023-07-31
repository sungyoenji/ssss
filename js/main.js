//현재 내 위치정보 알아내기 (위도,경도)
//내 위치 위도,경도 찾기
let weather = []


const getCurrentLocation = () =>{
    console.log("위치정보")
    navigator.geolocation.getCurrentPosition((position) =>{
        let lati = position.coords.latitude  //위도 위치
        let longi = position.coords.longitude  //경도 위치
        console.log(lati,longi)
        //api 서버 통신
        // getCurrentApi(lati,longi)
        getCurrentCity()
    });
 
}
//도시별 api서버 호출
const getCurrentCity = async() =>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=81b8f70e60b9b4dc51d1c656140dba75&units=metric`
    let response = await fetch(url)
    let data = await response.json()
    weather = data
    rander()
}


//키워드 검색
const getcityKey = async () =>{
    console.log('클릭')

//1. 검색어 읽어오기
let keyword = document.getElementById('search_input').value
console.log(keyword)

//2. url에 검색키워드붙이기
let url = new URL(`https://api.openweathermap.org/data/2.5/weather?q=${keyword}&appid=81b8f70e60b9b4dc51d1c656140dba75&units=metric`)
console.log(url)

//43 데이터 가져오기
let response = await fetch(url)
//4. 데이터 화면 보이기
let data = await response.json()
weather = data
rander()

}

// getCurrentCity()
let btnSearch = document.getElementById('btn_search');
btnSearch.addEventListener('click',getcityKey);


//api서버 호출
const getCurrentApi = async(lati,longi) =>{
    let url =`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=81b8f70e60b9b4dc51d1c656140dba75&units=metric
    `
    console.log(url)

    let response = await fetch(url)
    console.log(response)
    let data = await response.json()
    console.log(data)

    weather = data
    console.log("내 배열은",weather)

    //ui화면에 보이게 하기
    rander()

}

// function showPosition(position){
//     let lati = position.coords.latitude  //위도 위치
//     let longi = position.coords.longitude  //경도 위치
//     console.log(lati,longi)
// }
getCurrentLocation()


const rander = () => {
    let weatherHtml = ''
    weatherHtml = `

        <div class="inner">
            <h2>${weather.name}</h2>
            <ul>
                <li><span>섭씨</span>&nbsp;${Math.floor(weather.main.temp)}˚ </li>
                <li><span>화씨 </span>&nbsp;${Math.floor((weather.main.temp * 9/5) +32)}˚</li>
            </ul>
            <p>현재 날씨는 &nbsp;&nbsp;<span>${weather.weather[0].main}</span>&nbsp;&nbsp; 가 예상됩니다.</p>
        </div>

    `
    document.getElementById("wrap").innerHTML = weatherHtml
}
