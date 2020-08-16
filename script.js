const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('newquote');
const loader=document.getElementById('loader');

//show loading
 function loading()
 {
     loader.hidden=false;
     quoteContainer.hidden=true;  
 }

 //Hide loading
 function complete()
 {
     if(!loader.hidden)
     {
         quoteContainer.hidden=false;
         loader.hidden=true;
     }
 }

//Get Quote From API
async function getQuote(){
    loading();
    const proxyUrl='https://cors-anywhere.herokuapp.com/';
    const apiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response=await fetch(proxyUrl + apiUrl);
        const data=await response.json();
        if(data.quoteAuthor==='')
        {
            authorText.innerHTML='Unknown';
        }
        else{
            authorText.innerHTML=data.quoteAuthor;
        }
        //Reduce font Size for long quote
        if(data.quoteText.length>50)
        {
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove ('long-quote');
        }
        quoteText.innerHTML=data.quoteText;
        //stop Loader,show Quote
        complete();

    }catch(error){
        getQuote();
       
    }

}
//Tweet Quote
function tweetQuote()
{
    const quote=quoteText.innerText;
    const author=authorText.innerText;
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}
//Event Listener
twitterBtn.addEventListener('click',tweetQuote);
newQuoteBtn.addEventListener('click', getQuote);
//On Load
getQuote();