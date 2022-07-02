const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateElement = document.getElementById('date-picker');
const countdownElement = document.getElementById('countdown');
const countdownTitleElement = document.getElementById('countdown-title');
const countdownButton = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const completeElement = document.getElementById('complete');
const completeInfo = document.getElementById('complete-info');
const completeButton = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let savedCountdown ;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
let countdownActive;

//set today as the min value for the date picker
const today = new Date().toISOString().split('T')[0];
dateElement.setAttribute('min', today);

//calculate days, hours,

//populate UI

const updateDom = () => {
  //get the number of current date
  countdownValue = new Date(countdownDate).getTime();
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    //hide input form
    inputContainer.hidden = true;
    //check if countdown ended
    if (distance < 0) {
      countdownElement.hidden = true;
      clearInterval(countdownActive);
      completeInfo.textContent = `${countdownTitle} Finished on ${countdownDate}`;
      completeElement.hidden = false;
    } else {
      //populate countdown
      countdownTitleElement.textContent = countdownTitle;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;

      //show countdown
      countdownElement.hidden = false;
    }
  }, second);
};

//take values from form input
const updateCountdown = (e) => {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  savedCountdown = {
    date: countdownDate, 
    title: countdownTitle
  }
  localStorage.setItem('countdown', JSON.stringify(savedCountdown))
  //check if there is a valid date
  if (countdownDate === '') {
    alert('Please Enter a Valid Date');
  } else {
    
    updateDom();
  }
};

//reset the countdown
const reset = () => {
  //hide complete
  completeElement.hidden = true;
  //hide countdown
  countdownElement.hidden = true;
  //show input
  inputContainer.hidden = false;
  //stop countdown
  clearInterval(countdownActive);
  //reset count down values
  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
};

const restorePreviousCountdown = ()=>{
  //get the count down from localStorage
  if(localStorage.getItem('countdown')){
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    
    updateDom();
  }
}

restorePreviousCountdown()

//event listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownButton.addEventListener('click', reset);
completeButton.addEventListener('click', reset);
