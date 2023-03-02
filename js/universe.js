const loadApi=()=>{
    const url=`https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayApi(data.data.tools))
    if(res){
        hideSpinner();
    }
}
//display all api

const displayApi=(apis)=>{
    const apisContainer=document.getElementById('apis-container');
    //display 6 api only
    const showAll=document.getElementById('see-more');
    if(apis.length>6){
        apis=apis.slice(0,6);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    
    //apisContainer.textContent='';
   if(Array.isArray(apis)){
    apis.forEach(api => {
        const apiDiv=document.createElement('div');
        apiDiv.classList.add('col');
        apiDiv.innerHTML= `
        <div class="col">
        <div class="card h-100">
          <img src="${api.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Features</h5>
            
            <p class="card-text"><ol class="list-group list-group-numbered">
            <li class="list-group-item">${api.features[0]}</li>
            <li class="list-group-item">${api.features[1]}</li>
            <li class="list-group-item">${api.features[2]}</li>
          </ol></p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <div>
            <h6>${api.name}</h6>
            <div class="d-flex">
            <div>
            <i class="fa-solid fa-calendar-days"></i>
            </div>
            <div>
            <p>${api.published_in}</p>
            </div>
            </div>

            <div>
            <i onclick="isplayApiDetails(' ')" class="fa-solid fa-arrow-right data-bs-toggle="modal" data-bs-target="#apiDetailModal"></i>
            </div>
           
          </div>
         
         
        </div>
      </div>


        `
        apisContainer.appendChild(apiDiv);
        
    });
    //stop loader
    hideSpinner(false);
   }
}
//see more
document.getElementById('btn-see-more').addEventListener('click',function(){
    const url=`https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayApi(data.data.tools))

})

//display api details

const displayApiDetails=api=>{
    const apiModalDetai=document.getElementById('apiDetailModal');
    apiModalDetai.classList.add('d-flex')
    const apiModalDetail1=document.createElement('div');
    apiModalDetai.innerHTML=`


    `
    const apiModalDetail2=document.createElement('div');
    apiModalDetail2.innerHTML=`
    `

    apiModalDetai.appendChild(apiModalDetail1);
    apiModalDetai.appendChild(apiModalDetail2);


}
//function to hide spinner
const hideSpinner=()=>{
    const spinner=document.getElementById('loader');
    spinner.style.display='none';
}


loadApi();