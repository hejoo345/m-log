class NaverSearch{
     axios = require('axios');

     config = {
      method: 'get',
      url: 'https://openapi.naver.com/v1/search/movie.json?query=소울&display=5',
      headers: { 
        'X-Naver-Client-Id': process.env.REACT_APP_CLIENT_ID, 
        'X-Naver-Client-Secret': process.env.REACT_APP_CLIENT_SECRET
      }
    };
    
     movieSearch=()=>{
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
}


export default NaverSearch;