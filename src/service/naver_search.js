import axios from 'axios';
class NaverSearch{
      
 
      async movieSearch(search){
       const response = await axios.get('/v1/search/movie.json',{
          params:{
            query: search,
            display: 5
          },
          headers:{
            'X-Naver-Client-Id' : process.env.REACT_APP_CLIENT_ID,
            'X-Naver-Client-Secret': process.env.REACT_APP_CLIENT_SECRET
          }
        });
        return response.data.items;
        
      }
      
}


export default NaverSearch;