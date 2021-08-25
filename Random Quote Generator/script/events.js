import { quotes, colors } from "./main.js";

// console.log(colors[7]);
function randomQuote(){
    return Math.floor(Math.random() * quotes.length)
}
function randomColor(){
    return Math.floor(Math.random() * colors.length)
}
function clickEvent(){
    let rc = randomColor();
    let rq = randomQuote();
    let tl = 'https://twitter.com/intent/tweet?hashtags=quotes&related=&text=' + '"' + quotes[rq].quote + '" ' + quotes[rq].autor;
    document.querySelector('#text').innerText = quotes[rq].quote;
    document.querySelector('#author').innerText = quotes[rq].autor;
    document.getElementsByTagName('body')[0].style.backgroundColor = colors[rc];
    document.querySelector('#new-quote').style.backgroundColor = colors[rc];
    document.querySelector('.fab').style.color = colors[rc];
    document.querySelector('.blockquote').style.color = colors[rc];
    document.querySelector('#tweet-quote').setAttribute("href", tl);
    document.querySelector('blockquote').classList.toggle(".click");
}

clickEvent()
document.getElementById('new-quote').addEventListener('click', clickEvent
)