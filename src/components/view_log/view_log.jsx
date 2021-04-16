import React from 'react';
import styles from './view_log.module.css';

const ViewLog = ({selectedMovie, editHandler, movieDelete}) => {
    
    return(
        <div className={styles.container}>

            <h1 className={styles.title}>{selectedMovie.title}</h1>
            <p className={styles.subtitle}>({`${selectedMovie.subTitle}`})</p>
            <p><strong>감독 </strong><span>{selectedMovie.director}</span></p>
            <p><strong>출연 </strong><span>{selectedMovie.actor}</span></p>
            <p><strong>감상일 </strong><span>{selectedMovie.date}</span></p>
            <p><strong>감상평</strong></p>
            <div className={styles.comment}>{selectedMovie.comment}</div>
            <div className={styles.edit}>
                <button className={styles.delBtn} onClick={()=>movieDelete(selectedMovie)}>삭제</button>
                <button className={styles.editBtn} onClick={()=>editHandler()}>편집</button>
            </div>
        </div>
    )};

export default ViewLog;