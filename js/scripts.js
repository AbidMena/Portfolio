//Setting Theme
//Getting elements from the index.html using their id
const toggleTheme = document.getElementById('toggle-theme');
const toggleText = document.getElementById('toggle-text');
const toggleIcon = document.getElementById('toggle-icon');

const toggleColors = document.getElementById('toggle-colors');

const rootStyle = document.documentElement.style; //contains all the css styles

const flagsElement = document.getElementById('flags');

const textsToChange = document.querySelectorAll("[data-section]");

document.addEventListener("DOMContentLoaded", (event) => {
    changeLanguage("en");
});

const changeLanguage = async language => {
    const requestJson = await fetch(`./languages/${language}.json`)
    const texts = await requestJson.json();
    
    for(const textToChange of textsToChange){
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;
        textToChange.innerHTML = texts[section][value];
    }
}

flagsElement.addEventListener('click', (e) => {
    changeLanguage(e.target.parentElement.dataset.language);
});

//Listen click event to change the theme, toggle is a property of classlist
//and this creates a switch to know if the class exists or not
//if the class does not exist, toggles creates it, otherwise removes it
toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if(toggleIcon.src.includes('moon.svg')){
        toggleIcon.src ='assets/icons/sun.svg';
        toggleText.textContent = 'Light Mode';
    } else {
        toggleIcon.src ='assets/icons/moon.svg';
        toggleText.textContent = 'Dark Mode';
    }
});

//when clicking, it is going to get the clicked element, in this case the color
toggleColors.addEventListener('click', (e) => {
    rootStyle.setProperty('--primary-color', e.target.dataset.color);
});