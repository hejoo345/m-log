import React, {  useEffect, useRef, useState } from 'react';
import styles from './movieAdd.module.css';
import {AiOutlineSearch} from 'react-icons/ai';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import MovieSearchList from '../movie_search_list/movie_search_list';
import DatePicker,{registerLocale} from 'react-datepicker';
import ko from 'date-fns/locale/ko';

registerLocale("ko",ko);

const MovieAdd = ({naverSearch, onMovieAdd, imgUpload, selectedMovie}) => {
    const searchRef = useRef();
    const [searchList, setSearchList] = useState({});
    const [listActive, setListActive] = useState(false);

    const [movie, setMovie] = useState({}); // 검색해서 나온 리스트 중 선택한 영화 담음
    const [scroll, setScroll] = useState({
        limit: 5,
        offset: 1,
    })
    const [date, setDate] = useState(new Date());
    const [subtitle, setSubtitle] = useState('');
    const [file, setFile] = useState();
    const [mvId, setmvId] = useState();
    const [searchText , setSearchText]= useState();

    const titleRef = useRef();
    const subTitleRef = useRef();
    const actorRef = useRef();
    const directorRef = useRef();
    const comRef = useRef();
    const imgRef = useRef();
    const fileRef = useRef();

    useEffect(()=>{
        if(!selectedMovie) return;
        setMovie({
            title: selectedMovie.title,
            director: selectedMovie.director,
            actor: selectedMovie.actor,
            comment: selectedMovie.comment,
        });
        setFile(selectedMovie.imgURL);
        setmvId(selectedMovie.id);
        setSubtitle(selectedMovie.subTitle);
        setDate(new Date(selectedMovie.date));
    },[])

    const dateToString = (date)=>{
        return date.getFullYear()+'-'+(date.getMonth()+1).toString().padStart(2,'0')+'-'+date.getDate().toString().padStart(2,'0');
    }

    const searchMovie=(e)=>{
        e.preventDefault();
        if(searchRef.current.value==='') return;

        setSearchText(searchRef.current.value);
        setScroll(pre=>({
            ...pre,
            offset: 1,
        })); 

        naverSearch.movieSearch(searchRef.current.value, scroll.limit)
        .then(movies=>{
            setSearchList(Object.assign({},movies) );
            setListActive(true);
        })
    }

    const moreMovie = ()=>{  // scroll했을 때 영화 더 불러오기
        setScroll(pre=>({
            ...pre,
            offset: pre.offset+1,
        })); 

        const len = scroll.limit*(scroll.offset+1);
        naverSearch.movieSearch(searchText, len)
        .then(movies=>{
            const newM = Object.assign({},movies);
            setSearchList(pre=>({
                ...pre,
                ...newM,
            }))
        });
    }

    const setMovieHandler=(movie)=>{
        setMovie(movie);
        setFile(movie.image);
        setSubtitle(`${movie.subtitle}, ${movie.pubDate}`);
        setListActive(false);
        searchRef.current.value='';
    }
    
    const saveHandler=(e)=>{
        e.preventDefault();
        if(titleRef.current.value===''){
            titleRef.current.focus();
            return;
        }

        const newMovie = {
            id: mvId || Date.now(),
            title: titleRef.current.value || '',
            subTitle: subTitleRef.current.value || '',
            director: directorRef.current.value || '',
            actor: actorRef.current.value || '',
            date: dateToString(date) || '',
            comment: comRef.current.value || '',
            imgURL: file || ''

        }
        onMovieAdd(newMovie);
    }

    const imgClick = (e)=>{
        e.preventDefault();
        fileRef.current.click();
    }
    const imgChange = async (e)=>{
        const uploaded = await imgUpload.upload(e.target.files[0]);
        setFile(uploaded.url);
        console.log(uploaded);
        
    }

    return(
            <section className={styles.movieAddSection}>
                <div className={styles.container}>
                    <div className={styles.saveDiv}> 
                        <button className={styles.save} onClick={saveHandler}>저장</button>
                    </div>
                    <form className={styles.movieSearch} onSubmit={searchMovie}>
                        <input ref={searchRef} type="text" placeholder="감상한 영화를 검색"></input>
                        <AiOutlineSearch onClick={searchMovie} size="1.5rem"/>
                        
                    </form>

                    {
                        listActive &&(
                            <div className={styles.list}>
                                <MovieSearchList
                                searchList={searchList}
                                setMovieHandler={setMovieHandler}
                                moreMovie={moreMovie}/>
                            </div>
                        )
                    }
                    <form className={styles.movie}>
                        <div className={styles.img} >
                            <input ref={fileRef} className={styles.fileBtn} 
                            type='file'
                            accept='image/jpg, image/png, image/jpeg'
                            onChange={imgChange}></input>
                            {
                                file && (
                                    <img ref={imgRef}
                                    alt="포스터" src={file} width="100%" height="100%"
                                    onClick={imgClick}></img>
                                )
                            }
                            {
                                !file &&(

                                    <p className={styles.plusIcon} onClick={imgClick}><AiOutlinePlusCircle size='1.7rem'/></p>
                                )

                            }
                        </div>
                        <div className={styles.info}>
                            <div className={styles.infoDiv}>
                                <div className={styles.infoTitle}><span>제목</span></div>
                                <input ref={titleRef}
                                className={styles.movieTitle}
                                 defaultValue={movie.title && movie.title.replace(/<b>/gi,"").replace(/<\/b>/gi,"")}></input>
                            </div>
                            <div className={styles.infoDiv}>
                                <div className={styles.infoTitle}><span></span></div>
                                <input ref={subTitleRef}
                                defaultValue={subtitle.replace(/<b>/gi,"").replace(/<\/b>/gi,"")} placeholder='(영어제목, 개봉일)'></input>
                            </div>
                            <div className={styles.infoDiv}>
                                <div className={styles.infoTitle}><span>감독</span></div>
                                <input ref={directorRef}
                                defaultValue={movie.director}></input>
                            </div>
                            <div className={styles.infoDiv}>
                                <div className={styles.infoTitle}><span>배우</span></div>
                                <input ref={actorRef}
                                 defaultValue={movie.actor}></input>
                            </div>
                            <div className={styles.infoDiv}>
                                <div className={styles.infoTitle}><span>감상일</span></div>
                                <DatePicker
                                    selected={date}
                                    onChange={date=>setDate(date)}
                                    locale='ko'
                                    dateFormat='yyyy-MM-dd'/>
                                
                            </div>
                            <div className={styles.infoDiv}>
                                <div className={styles.comment} className={styles.infoTitle}><span>감상평</span></div>
                                <textarea ref={comRef} defaultValue={movie.comment}></textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
    )};

export default MovieAdd;