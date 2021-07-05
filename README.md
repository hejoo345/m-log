# m-log

감상한 영화를 기록하는 웹

이메일 형식으로 회원가입이 가능하고 구글, 카카오, 이메일로 로그인 할 수 있다.

영화를 기록할 때 영화 제목을 검색해서 찾을 수 있다.

등록한 영화는 편집, 삭제가 가능하다.

## Build With
- HTML
- CSS Module
- React.js / React Hooks / React Router
- Firebase API (Authentication, Realtime Database)
- Naver 검색 API 
- 카카오 로그인 API
- Axios

## Screen Shots
<img width="500" alt="_2021-05-04__11 48 26" src="https://user-images.githubusercontent.com/67685741/117139888-b4f5f280-ade7-11eb-9cdb-e4af153384f0.png">
<img width="500" alt="_2021-05-04__11 46 47" src="https://user-images.githubusercontent.com/67685741/117139904-b9221000-ade7-11eb-9bf8-1805827bd68e.png">
<img width="500" alt="_2021-05-04__11 47 57" src="https://user-images.githubusercontent.com/67685741/117139911-baebd380-ade7-11eb-8835-38837a1d8e90.png">
<img width="500" alt="_2021-05-04__11 47 22" src="https://user-images.githubusercontent.com/67685741/117139921-bcb59700-ade7-11eb-8d62-d369b4dc1ef5.png">

## What I Learned
- Firebase Realtime DB를 사용해서 데이터를 읽고 쓰는 법

    쿼리를 사용하는게 조금 불편했다. 검색 기능을 쓸 때 일부 단어만 포함한 결과를 얻고 싶었지만 불가능했다.

- 커스텀 훅으로 드롭다운 메뉴 구현

    사용자 아이콘을 누를 때마다 메뉴가 나타났다가 사라지게 하는 건 간단했지만, 메뉴 밖의 부분을 클릭했을 때 사라지게 만들기 위해 커스텀 훅을 만들었다.

- 무한 스크롤 구현

    스크롤의 값을 계산해서 스크롤이 끝에 다다랐을 때, 한 번 더 API를 호출하도록 했다.

    ```jsx
    const handleScroll = e =>{
        const { scrollHeight, scrollTop, clientHeight} = e.target;
        if(scrollTop+clientHeight >= scrollHeight){
            moreMovie();
        }
    }
    ```
