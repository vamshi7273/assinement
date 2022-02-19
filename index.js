async function getData(){
    const response = await fetch('http://api.nobelprize.org/v1/prize.json');
    const data = await response.json();
    return data;
}
const data = getData();
const content=document.querySelector('.card');
data.then(data=>{
    console.log(data);
    console.log(data.prizes);
    data.prizes.forEach(prize=>{
      const year=prize.year;
      const category=prize.category;
      const Motivation=prize.laureates[0].motivation;
      const laureates=prize.laureates;
      const card=document.createElement('div');
      card.classList.add('card');
      card.innerHTML=`
        <div class="card-header">
            <h3>Year: ${year}</h3>
            <h4>Category: ${category}</h4>
        </div>
        <div class="card-body">
            <p>Motivation: ${Motivation}</p>
            <ul>
               Names: ${laureates.map(laureate=>`<li>${laureate.firstname} ${laureate.surname}</li>`).join('')}
            </ul>
        </div>
        `;
        content.appendChild(card);
    });
  });
  const filter=document.querySelector('.filter');
  const year=document.createElement('select');
  year.className='col-auto';
  year.innerHTML=`<option value="">Select Year</option>`;
  for(let i=1900;i<=2018;i++){
      year.innerHTML+=`<option value="${i}">${i}</option>`;
  }
  const category=document.createElement('select');
  category.className='col-auto';
  category.innerHTML=`<option value="">Select Category</option>`;
  const Categorys=[];
  data.then(data=>{
      data.prizes.forEach(prize=>{
          if(!Categorys.includes(prize.category)){
              Categorys.push(prize.category);
              category.innerHTML+=`<option value="${prize.category}">${prize.category}</option>`;
          }
      });
  });   
  filter.appendChild(year);
  filter.appendChild(category);
  year.addEventListener('change',()=>{
      const selectedYear=year.value;
      content.innerHTML='';
      data.then(data=>{
          data.prizes.forEach(prize=>{
              if(prize.year==selectedYear||selectedYear==''){
                  const year=prize.year;
                  const category=prize.category;
                  const Motivation=prize.laureates[0].motivation;
                  const laureates=prize.laureates;
                  const card=document.createElement('div');
                  card.classList.add('card');
                    card.innerHTML=`
                    <div class="card-header">
                        <h3>Year: ${year}</h3>
                        <h4>category: ${category}</h4>
                    </div>
                    <div class="card-body">
                        <p>Motivation: ${Motivation}</p>
                        <ul>
                             Names: ${laureates.map(laureate=>`<li>${laureate.firstname} ${laureate.surname}</li>`).join('')}
                        </ul>
                    </div>
                    `;
                    content.appendChild(card);
              }
              
          });
      });
  });
  category.addEventListener('change',()=>{
      const selectedCategory=category.value;
      content.innerHTML='';
      data.then(data=>{
          data.prizes.forEach(prize=>{
              if(prize.category==selectedCategory||selectedCategory==''){
                  const year=prize.year;
                  const category=prize.category;
                  const Motivation=prize.laureates[0].motivation;
                  const laureates=prize.laureates;
                  const card=document.createElement('div');
                  card.classList.add('card');
                    card.innerHTML=`
                    <div class="card-header">
                        <h3>Year: ${year}</h3>
                        <h4>Category: ${category}</h4>
                    </div>
                    <div class="card-body">
                        <p>Motivation: ${Motivation}</p>
                        <ul>
                            Names: ${laureates.map(laureate=>`<li>${laureate.firstname} ${laureate.surname}</li>`).join('')}
                        </ul>
                    </div>
                    `;
                    content.appendChild(card);
              }
          });
      });
  });