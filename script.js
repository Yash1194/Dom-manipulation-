function openFeatures() {
    var allelems = document.querySelectorAll('.elem')
    var allFullElems = document.querySelectorAll('.fullElem')
    var allFullElemsBackBtn = document.querySelectorAll('.fullElem .back')

    // save local storage 
    let activePage = localStorage.getItem("activePage");

    if (activePage !== null) {
        allFullElems[activePage].style.display = "block";
    }

    allelems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            allFullElems[elem.id].style.display = 'block'
            localStorage.setItem("activePage", elem.id);
        })
    })

    allFullElemsBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            allFullElems[back.id].style.display = 'none'
            localStorage.removeItem("activePage");
        })
    })
}
openFeatures()


// To Do List
function todoList() {


    let form = document.querySelector('.addtask form')
    let taskinput = document.querySelector('.addtask form input')
    let taskdescription = document.querySelector('.addtask form textarea')
    let taskcheckbox = document.querySelector('.addtask form #check')


    var currentTask = []

    if (localStorage.getItem('currentTask')) {

        currentTask = JSON.parse(localStorage.getItem('currentTask'))

    } else {
        console.log('Task list is empty');



    }
    function renderTask() {
        localStorage.setItem('currentTask', JSON.stringify(currentTask))
        var alltask = document.querySelector('.alltask')
        var sum = ''
        currentTask.forEach(function (elem) {

            sum = sum + `<div class="task">
            <div class="top">
                <h5>${elem.task} <span class=${elem.imp}>Imp</span></h5>
                <button>Mark As Completed</button>
            </div>
            <p class="details hidden">${elem.details}</p>
        </div>`
        })

        alltask.innerHTML = sum

        document.querySelectorAll('.task h5').forEach((elem) => {
            elem.addEventListener('click', function () {
                let details = this.parentElement.nextElementSibling
                details.classList.toggle('hidden')
            })
        })
        var markCompletedBtn = document.querySelectorAll('.task button')
        markCompletedBtn.forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1)  // splice is use to delete a particular array object in form (0,2){id = 0 k baad 1 element delete with 0 total 2 element delete}
                renderTask()

            })
        })
    }

    renderTask();




    form.addEventListener('submit', function (e) {
        e.preventDefault()  //It stops the default behaviour like reload
        currentTask.push({
            task: taskinput.value,
            details: taskdescription.value,
            imp: taskcheckbox.checked
        }
        )
        localStorage.setItem('currentTask', JSON.stringify(currentTask))
        taskinput.value = ''
        taskdescription.value = ''
        taskcheckbox.checked = false
        renderTask()



    })

}
todoList()
// To Do List finished 

// Daily planner 
function Dailyplanner() {
    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}
    var dayPlanner = document.querySelector('.day-planner')

    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)



    var wholeDaySum = ''

    hours.forEach((elem, idx) => {
        var savedData = dayPlanData[idx] || '';

        wholeDaySum += `<div class="day-planner-time">
                            <p>${elem}</p>
                            <input id="${idx}"type="text" placeholder="...  " value ="${savedData}">
                        </div>`
    })
    dayPlanner.innerHTML = wholeDaySum

    var dayPlannerInput = document.querySelectorAll('.day-planner input')
    dayPlannerInput.forEach((elem) => {
        elem.addEventListener('input', function () {

            dayPlanData[elem.id] = elem.value

            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })

}

Dailyplanner()

//Motivation
function MotivationQuate() {

    var motivationQuate = document.querySelector(".motivation2 p")
    var motivationAuthor = document.querySelector(".motivation3 h1")
    async function fetchQuote() {
        const response = await fetch("https://dummyjson.com/quotes/random");
        const data = await response.json();

        console.log(data);

        motivationQuate.innerHTML = data.quote;
        motivationAuthor.innerHTML = data.author;
    }

    fetchQuote();
}
MotivationQuate();


    // Pompdoro 
function Pompdoro(){

    let timer = document.querySelector('.pomo-timer h1')
    var startBtn = document.querySelector('.pomo-timer .start-timer')
    var pauseBtn = document.querySelector('.pause-timer')
    var resetBtn = document.querySelector('.reset-timer')
    var session = document.querySelector('.session')
    var isWorkSession = true;
    var isPause = false;
    let timerInterval = null
    let totalSecond = 25 * 60;

    function updateTimer() {
        let minutes = Math.floor(totalSecond / 60)
        let seconds = totalSecond % 60
        timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")}`
    }



    function startTimer() {
        clearInterval(timerInterval)
        if(isWorkSession){
        timerInterval = setInterval(() => {
            if(totalSecond > 0){
            totalSecond--
            updateTimer()
            }else{
            isWorkSession = false
            clearInterval(timerInterval)
            timer.innerHTML = '05:00'
            session.innerHTML = 'Take a break'
            session.style.backgroundColor = 'var(--blue)'
            totalSecond = 5*60
            }
        }, 1000)
    }else{
        totalSecond = 5 * 60
        timerInterval = setInterval(() => {
            if(totalSecond > 0){
            totalSecond--
            updateTimer()
            }else{
            isWorkSession = true
            clearInterval(timerInterval)
            timer.innerHTML = '25:00'
            session.innerHTML = 'Work Session'
            session.style.backgroundColor = 'var(--green)'
            totalSecond = 25*60
            }
        }, 1000)
    

    }
    }
    function pauseTimer() {
        
    if(!isPause){
        clearInterval(timerInterval)
        pauseBtn.innerHTML = 'Resume';
        isPause = true;
    }else{
        startTimer()
        pauseBtn.innerHTML = 'Pause'
        isPause = false
    }
        
    }
    function resetTimer() {
        totalSecond = 25 * 60
        clearInterval(timerInterval)
        updateTimer()
    }
    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)
}
Pompdoro();

//Daily Goals 
function DailyGoals() {
    let form = document.querySelector('.addgoal form');
    let goalinput = document.querySelector('.addgoal form input');

    var currentGoals = [];

    if (localStorage.getItem('currentGoals')) {
        currentGoals = JSON.parse(localStorage.getItem('currentGoals'));
    }

    function renderGoals() {
        localStorage.setItem('currentGoals', JSON.stringify(currentGoals));
        var allgoals = document.querySelector('.allgoals');
        var sum = '';
        currentGoals.forEach(function (elem, index) {
            sum += `<div class="goal">
                <h5>${elem.goal}</h5>
                <button id="${index}">Mark As Completed</button>
            </div>`;
        });

        allgoals.innerHTML = sum;

        var markCompletedBtn = document.querySelectorAll('.goal button');
        markCompletedBtn.forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentGoals.splice(btn.id, 1);
                renderGoals();
            });
        });
    }

    renderGoals();

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (goalinput.value.trim() !== '') {
            currentGoals.push({
                goal: goalinput.value
            });
            localStorage.setItem('currentGoals', JSON.stringify(currentGoals));
            goalinput.value = '';
            renderGoals();
        }
    });
}
DailyGoals();



// Weather Complete App 
var header1Time = document.querySelector('.time-text');
var header1Date = document.querySelector('.header1 h2');
var header1City = document.querySelector('.header1 h4');
var header2Temp = document.querySelector('.temp-text');
var header2FeelsLike = document.querySelector('.feels-like');
var header2Humidity = document.querySelector('.humidity');
var header2Wind = document.querySelector('.wind');
var header2Cloud = document.querySelector('.cloud-text');
var header2Uv = document.querySelector('.uv-index');
var headerIcon = document.querySelector('.weather-icon');
var headerBg = document.querySelector('.header');

// Animation elements
var animStars = document.querySelector('.stars');
var animClouds = document.querySelector('.clouds');
var animRays = document.querySelector('.rays');
var animLeaves = document.querySelector('.leaves');

var city = "Jaipur";
var apiKey = 'db3f9513944c4516a0793450262106'

function getTemperatureColor(temp) {
    if(temp > 40) return 'red';
    if(temp > 30) return 'orange';
    if(temp < 15) return 'var(--blue)';
    return 'white'; // normal
}

function updateHeaderBackground(conditionText, hour) {
    const text = conditionText.toLowerCase();
    let bgUrl = '';
    
    // Reset animations
    animStars.style.display = 'none';
    animClouds.innerHTML = '';
    animRays.innerHTML = '';
    animLeaves.innerHTML = '';

    // Weather Based
    if (text.includes('rain')) {
        bgUrl = 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2000&auto=format&fit=crop';
    } else if (text.includes('mist') || text.includes('fog')) {
        bgUrl = 'https://images.unsplash.com/photo-1485550409059-9afb054cada4?q=80&w=2000&auto=format&fit=crop';
    } else if (text.includes('snow')) {
        bgUrl = 'https://images.unsplash.com/photo-1518335437637-7711f5d601b5?q=80&w=2000&auto=format&fit=crop';
    } else if (text.includes('cloud')) {
        bgUrl = 'https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?q=80&w=2000&auto=format&fit=crop';
    } else {
        // Time Based Fallback
        if (hour >= 5 && hour < 12) {
            // Morning
            bgUrl = 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2000&auto=format&fit=crop';
            animClouds.innerHTML = '<div class="clouds-anim" style="display:block"></div>';
        } else if (hour >= 12 && hour < 16) {
            // Afternoon
            bgUrl = 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=2000&auto=format&fit=crop';
            animRays.innerHTML = '<div class="rays-anim" style="display:block"></div>';
        } else if (hour >= 16 && hour < 19) {
            // Evening
            bgUrl = 'https://images.unsplash.com/photo-1472552944129-b035e9ea3744?q=80&w=2000&auto=format&fit=crop';
            animLeaves.innerHTML = '<div class="leaves-anim" style="display:block"></div><div class="leaves-anim" style="display:block"></div><div class="leaves-anim" style="display:block"></div><div class="leaves-anim" style="display:block"></div>';
        } else {
            // Night
            bgUrl = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2000&auto=format&fit=crop';
            animStars.style.display = 'block';
        }
    }
    
    headerBg.style.backgroundImage = `url('${bgUrl}')`;
}

async function weatherApiCall(){
    try {
        var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        var data = await response.json()
        
        console.log(data);
        
        if (data.current) {
            let temp = data.current.temp_c;
            header2Temp.innerHTML = `${temp}°C`;
            header2Temp.style.color = getTemperatureColor(temp);
            
            header2FeelsLike.innerHTML = `Feels Like: ${data.current.feelslike_c}°C`;
            header2Humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
            header2Wind.innerHTML = `Wind: ${data.current.wind_kph}km/h`;
            if(header2Uv) header2Uv.innerHTML = `UV: ${data.current.uv}`;
            header2Cloud.innerHTML = `${data.current.condition.text}`;
            header1City.innerHTML = `${data.location.name}, ${data.location.region}`;
            
            if(data.current.condition.icon) {
                headerIcon.src = "https:" + data.current.condition.icon;
                headerIcon.style.display = "block";
            }
            
            let currentHour = new Date().getHours();
            updateHeaderBackground(data.current.condition.text, currentHour);
            
        } else {
            console.error('Weather API error:', data.error);
        }
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
    }
}
weatherApiCall();

function timeDate(){
    const totalDaysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const monthsName = ['January','February','March','April','May','June','July','August','September','October','November','December']
    var date = new Date()
    var dayOfWeek = totalDaysOfWeek[date.getDay()]
    var hour = date.getHours()
    var minute = date.getMinutes()
    var seconds = date.getSeconds()
    var tarik =    date.getDate()
    var monthsOfYear = monthsName[date.getMonth()]
    var years = date.getFullYear()
    
    header1Date.innerHTML = `${tarik} ${monthsOfYear} ${years}`

    if(hour>12){
        header1Time.innerHTML = `${dayOfWeek} ${String(hour - 12).padStart(2,"0")}:${String(minute).padStart(2,"0")}:${String(seconds).padStart(2,"0")} PM`
    }else{
        header1Time.innerHTML = `${dayOfWeek} ${String(hour).padStart(2,"0")}:${String(minute).padStart(2,"0")}:${String(seconds).padStart(2,"0")} AM`
    }
}
setInterval(() =>{
    timeDate()
},1000)

// --- NEW FEATURES: Mouse Glow, Theme Switcher ---

// 1. Mouse Glow
const mouseGlow = document.getElementById('mouse-glow');
if(mouseGlow) {
    document.addEventListener('mousemove', (e) => {
        mouseGlow.style.opacity = '1';
        mouseGlow.style.left = e.clientX + 'px';
        mouseGlow.style.top = e.clientY + 'px';
    });
    document.addEventListener('mouseleave', () => {
        mouseGlow.style.opacity = '0';
    });
}

// 2. Theme Switcher
const themeToggleBtn = document.getElementById('theme-toggle');
const themeAudio = document.getElementById('theme-audio');
const allImages = document.querySelectorAll('.elem img');

const themeImages = {
    dark: [
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1170&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=1170&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1506452305024-9d3f02d1c9b5?q=80&w=1170&auto=format&fit=crop'
    ],
    light: [
        'https://plus.unsplash.com/premium_photo-1666739087569-eec71efac750?q=80&w=1038&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1653070863221-6b700d26884d?q=80&w=2070&auto=format&fit=crop',
        'https://plus.unsplash.com/premium_vector-1770811628841-2591db724237?q=80&w=3272&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1635181951397-ffca503f9e6d?q=80&w=3087&auto=format&fit=crop',
        'https://plus.unsplash.com/premium_photo-1684356819140-e82e7446b600?q=80&w=1384&auto=format&fit=crop'
    ]
};

if(themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        if (themeAudio) {
            themeAudio.currentTime = 0;
            themeAudio.play().catch(e => console.log('Audio play blocked/failed', e));
        }

        document.body.setAttribute('data-theme', newTheme);
        
        allImages.forEach((img, index) => {
            img.style.transition = 'opacity 0.3s ease';
            img.style.opacity = 0;
            setTimeout(() => {
                img.src = themeImages[newTheme][index] || themeImages[newTheme][0];
                img.style.opacity = 1;
            }, 300);
        });
    });
}

// Set default theme to Dark as requested
document.body.setAttribute('data-theme', 'dark');

