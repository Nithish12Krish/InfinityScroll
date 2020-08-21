
const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');
let ready=false;
let imageLoad=0;
let totalImages=0;
let photosArray=[];
let isInitialLoad = true;
//UnSplash API
let initialCount = 5
const apiKey='cQLCQjCSt3CFwW4ArG7XtM6KnGlykI6JshOAyIdlgfo';
let apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

//Update API url
function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
  }
//Check if all images were loaded
function imageLoaded()
{
    imageLoad++;
    if(imageLoad===totalImages)
    {
        ready=true;
        loader.hidden=true;
    }

}

//Helper Function to set Attributes on DOM Element
function setAttributes(element,attributes)
{
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}
//Create Elements for Links & Photos, Add to DOM
function displayPhotos()
{
    imageLoad=0;
    totalImages=photosArray.length;
    //Run function for each object in photoArray
    photosArray.forEach((photo)=>{
        const item=document.createElement('a');
        setAttributes(item,{
        href:photo.links.html,
        target:'_blank'});
        //<img> for photo
        const img=document.createElement('img');
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });
        //Event Listener when Each is finish Loading
        img.addEventListener('load',imageLoaded);
        //put img into <a>
        item.appendChild(img);
        imageContainer.appendChild(item);
    });

}

//Get photos from Unsplash API
async function getPhotos()
{
    try{
        const response=await fetch(apiUrl);
        photosArray=await response.json();
        displayPhotos(); 
        if (isInitialLoad) { 
            updateAPIURLWithNewCount(30);
            isInitialLoad = false;
          }

    }catch(error)
    {

    }
}
//Check to see if Scrolling near bottom of page, Load more photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 &&ready)
    {
        ready=false;
        getPhotos();
    }
    
});
//OnLoad
getPhotos();