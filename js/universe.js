const loadApi=(res)=>{
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
            <i onclick="loadApiDetails('${api.id}')" class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#apiDetailModal"></i>
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
    .then(data=>displayAllApi(data.data.tools))

})
//this is the function for showing all api cards

const displayAllApi=(apis)=>{
  const apisContainer=document.getElementById('apis-container');
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
            <i class="fa-solid fa-calendar-days mx-2"></i>
            </div>
            <div class="mx-2">
            <p>${api.published_in}</p>
            </div>
            </div>

            <div>
            <i onclick="loadApiDetails('${api.id}')" class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#apiDetailModal"></i>
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
   const btnSeeMore=document.getElementById('btn-see-more');
   btnSeeMore.style.visibility='hidden';

}

//api detail fetching
const loadApiDetails=(id)=>{
    const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayApiDetails(data.data))

}
//display api details
const displayApiDetails=api=>{
    console.log(api);
    const apiModalDetal=document.getElementById('apiDetailModal');
    const apiCardDetal=document.getElementById('modal-details')
    const modalDetailOne=document.getElementById('modal-details-one');

   const features = api.features;

   
   const featureNames = Object.values(features).map(feature => feature.feature_name);
  
    modalDetailOne.innerHTML=`

    <p class="text-black fw-bold mt-3">${api.description}  <p>
     <div class="d-flex juatify-content-between">

     <div class="mx-3 text-success">
     <p>${api.pricing[0].price?api.pricing[0].price: "Free Of Cost"}</p>
     <p>${api.pricing[0].plan}</p>
     </div>
     <div class="mx-3 text-warning">
     <p>${api.pricing[1].price? api.pricing[1].price: "Free of Cost"}</p>
     <p>${api.pricing[1].plan}</p>
     </div>
     <div class="mx-3 text-danger">
     <p>${api.pricing[2].price? api.pricing[2].price: "Free of Cost"}</p>
     <p>${api.pricing[2].plan}</p>
     </div>


     </div>

    <div class="d-flex">
    <div>
    <h5 class="card-title">Features</h5>   
    <ul>
    <li>${featureNames[0]}</li>
    <li>${featureNames[1]}</li>
    <li>${featureNames[2]}</li>
   </ul>
    
    
    </div>
    <div>
    <h5 class="card-title">Intregations</h5>
          
    <ul>
    <li>${api.integrations[0]?api.integrations[0]: "No data Found"}</li>
    <li>${api.integrations[1]?api.integrations[1]: "No data Found"}</li>
    <li>${api.integrations[2]?api.integrations[2]: "No data Found"}</li>
  </ul>
    </div>
    </div>
    `


    
    const modalDetailTwo=document.getElementById('modal-details-two');
    modalDetailTwo.innerHTML=`
    <div style="position: relative;">
    <img src="${api.image_link[0]}" class="rounded mx-auto d-block mt-3" style="max-width: 100%;" alt="...">
    <button class="btn btn-danger" style="position: absolute; top: 0; right: 0;">${api.accuracy.score ? api.accuracy.score*100 + "% accuracy" : ""}</button>
  </div>
  
    <h3 class="text-center">${api.input_output_examples[0].input?api.input_output_examples[0].input:api.input_output_examples[1].input}</h3>
    <p class="text-center">${ api.input_output_examples[0].output?api.input_output_examples[0].output:api.input_output_examples[1].output}</p>
    `
    


}



//function to hide spinner
const hideSpinner=()=>{
    const spinner=document.getElementById('loader');
    spinner.style.display='none';
}


loadApi();