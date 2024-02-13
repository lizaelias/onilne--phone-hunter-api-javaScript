

const loadPhone = async(searchValue ='samsung',isShowAll)=>{

    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
    const data =await res.json()
    const phones = data.data;
    
    handelShowPhones(phones,isShowAll)
}


// card 

const handelShowPhones = (phones,isShowAll) => {
    const ShowsPhonesContainer = document.getElementById('ShowsPhones-container');

    ShowsPhonesContainer.textContent='';

   
   const showAllContainer =document.getElementById('showAllContainer')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    if(!isShowAll){
      phones =phones.slice(0,12)
    }

    phones.forEach(phone => {
        const cardDiv = document.createElement('div');
        cardDiv.classList = 'card w-96 bg-base-100 shadow-xl';

        cardDiv.innerHTML = `
            <figure class="px-10 pt-10">
                <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">Brand: ${phone.brand}</h2>
                <p>Name: ${phone.phone_name}</p>
                <div class="card-actions">
                    <button onclick="handleDetailsShow('${phone.slug
                    }')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;
        ShowsPhonesContainer.appendChild(cardDiv);
        
    });
    toggleLoadingSpinners(false);
    
}

//load data id

const handleDetailsShow = async(id)=>{
    
  
    const res =await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data;
    

    handleModal(phone)
}






// showModal 
 const handleModal =async(phone)=>{
    console.log(phone)
   
    show_details_modal.showModal()
    const showDetailsContaiter = document.getElementById('show-details-container')
       showDetailsContaiter.innerHTML=`
       
       <div class="modal-box w-96 h-96">
                           <h3 class="font-bold text-lg mb-4">${phone.brand
                           }</h3>
                           <img class="text-center" src="${phone.image}" alt="Shoes" class="rounded-xl" />
                            <p class="py-4 font-bold">Name: ${phone.name
                            }</p>
                            <p class="py-4 font-bold">Name: ${phone.slug
                            }</p>
                            <p class="py-4 font-bold">Name: ${phone.releaseDate
                            }</p>
                                  <div class="modal-action">
                                                  <form method="dialog">
                                    <!-- if there is a button in form, it will close the modal -->
                                                  <button class="btn btn-error">Close</button>
                                                     </form> 
                                   </div>
                        </div>
       
       
       `
       
 
 }
    
   
 

const handleSearch = (isShowAll)=>{
    toggleLoadingSpinners(true)
    const inputFieldValue = document.getElementById('inputField');
    const searchValue=inputFieldValue.value;
    
    loadPhone(searchValue,isShowAll)
  
  

}


// handle showallData

const  handleShowAll =()=>{
 handleSearch(true)
}



// loading sppiner

const toggleLoadingSpinners =(isLoading) =>{

    const toggleLoading = document.getElementById('loading-spinners');
    if(isLoading){
        toggleLoading.classList.remove('hidden');

    }else{
        toggleLoading.classList.add('hidden');
    }

}


 
loadPhone()