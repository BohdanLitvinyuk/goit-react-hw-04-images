import PropTypes from 'prop-types'; 

export const getFetch= async(newQuery, nextPage )=>{
  const API_KEY=`37825452-fa376d31b47a01c9c70144d21`
const response = await fetch(
          `https://pixabay.com/api/?q=${newQuery}&page=${nextPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
        if(!response.ok){
          throw new Error(`No results found for your query ${newQuery}`);
    } 
    const data = await response.json();
    return data;
        
}

getFetch.PropTypes={
  newQuery:PropTypes.string,
  nextPage:PropTypes.number
}