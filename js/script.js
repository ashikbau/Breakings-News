const loadNews = async()=>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    displayNews(data.data.news_category);
    // console.log(data.data.news_category)
    
   
}

const displayNews = news =>{
 const newscontainer = document.getElementById('catagory-field')
 
    news.forEach(x => {
        const {category_id,category_name}=x;
       
        // console.log(x)
        const newsList = document.createElement('li');

        newsList.innerHTML = `
        <li onclick = "loadNewsDetail('${category_id}')"  class="nav-item">
        <a onclick = "toggleSpinner(true)"class="nav-link fw-bold" href="#">${category_name}</a>
      </li>
        `
newscontainer.appendChild(newsList);
 });
}
 
const loadNewsDetail = async(id) =>{
const url = `https://openapi.programming-hero.com/api/news/category/${id}`
// console.log(url);
const res = await fetch(url);
const data = await res.json();
// console.log(data.data.length);
displayNewsDetail(data.data);
// console.log(data.data.category_id);

}
const displayNewsDetail =(details) =>{
const detaiContainer = document.getElementById('detail-field');
detaiContainer.textContent ="";
toggleSpinner(true);
const newsAmountFelid = document.getElementById('news-numberField');
const newsVlaue = details.length;


details.forEach((x)=>{
  

  const {title,details,thumbnail_url,author,total_view}=x
  const{name,img,published_date}=author

  // console.log(autho
  const detailDiv = document.createElement('div');
  detailDiv.innerHTML = `
  <div class="row g-0 border p-2 m-2">
  <div class="col-md-4">
    <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">
      ${details.slice(0,200)}
      </p>
      <button onclick="modalDetail (${x.rating.number})" 
       type="button" class="btn btn-primary" data-bs-toggle="modal"
       data-bs-target="#exampleModal">
  Modal News
 </button>
      
      
    </div>
    <div class="col-sm-4 d-flex justify">
    <img src="${ img}" class="h-25 w-25 rounded-start" alt="...">
    <p class="card-text">
    ${name ? name : 'Author not found'}
     
    </p>
    // <div><h6>${total_view ? total_view : 'Total view Missing here'}</h6></div>

    <div><button class="btn-p"></button></div>
  </div>
    
    
  </div>
</div>
  `
detaiContainer.appendChild(detailDiv);
})
toggleSpinner(false);
}

const modalDetail = (data)=>{
  console.log(data);
  const modalTitle=document.getElementById('exampleModalLabel')
  
  modalTitle.textContent=`rating:${data}`

  
}

// toggle Spinner part
const toggleSpinner = isLoading => {
  console.log(isLoading)
  const loaderSection = document.getElementById('loadder');
  if(isLoading){
      loaderSection.classList.remove('d-none');
  }
  else{
      loaderSection.classList.add('d-none');
  }


}






loadNews();
