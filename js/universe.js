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
    .then(data=>displayApi(data.data.tools))

})

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

    // Get the features object from the API
   const features = api.features;

   // Extract the feature names from the features object and store them in an array
   const featureNames = Object.values(features).map(feature => feature.feature_name);
  
    modalDetailOne.innerHTML=`

    <p class="text-black fw-bold">${api.description}  <p>
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
    <li>${api.integrations[0]}</li>
    <li>${api.integrations[1]}</li>
    <li>${api.integrations[2]}</li>
  </ul></p>
    </div>
    </div>
    `


    
    const modalDetailTwo=document.getElementById('modal-details-two');
    modalDetailTwo.innerHTML=`
    <div style="position: relative;">
    <img src="${api.image_link[0]}" class="rounded mx-auto d-block" style="max-width: 100%;" alt="...">
    <button class="btn btn-danger" style="position: absolute; top: 0; right: 0;">${api.accuracy.score*100}% accuracy</button>
  </div>
  
    <h3>${api.input_output_examples[0].input?api.input_output_examples[0].input:api.input_output_examples[1].input}</h3>
    <p>${ api.input_output_examples[0].output?api.input_output_examples[0].output:api.input_output_examples[1].output}</p>
    `
    


}





//function to hide spinner
const hideSpinner=()=>{
    const spinner=document.getElementById('loader');
    spinner.style.display='none';
}


loadApi();