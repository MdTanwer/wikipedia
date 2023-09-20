const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

  const form = document.querySelector('.form')
  const formInput = document.querySelector('.form-input')
  const results = document.querySelector('.results')


 form.addEventListener('submit', (e)=>{
    e.preventDefault();
     const value = formInput.value;
     

     if(!value){
        results.innerHTML = `<div class= "error"> please enter your query</div>`;
        return;
     }
     fetchpages(value);
 });
 const fetchpages =  async (searchvalue)=>{
    results.innerHTML = `<div class= "Loading"></div>`;
    try {
        const response = await fetch(`${url}${searchvalue}`);
        const data = await response.json();
        const result = data.query.search;
        RenderResult(result);
        if(result.length<1){
            results.innerHTML = `<div class= "error"> something is wrong</div>`;
            return;
        }
         
    } catch (error) {
        console.log(error)
        results.innerHTML = `<div class= "error"> please enter your query</div>`;
    }    

 }

 const RenderResult = (list) => {
    const cardsList = list
      .map((item) => {
        console.log(item)
        const { title, snippet, pageid } = item;
        return `<a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
              <h4>${title}</h4>
              <p>
                ${snippet}
              </p>
            </a>`;
      })
      .join('');
    results.innerHTML = `<div class="articles">
            ${cardsList}
          </div>`;
  };
