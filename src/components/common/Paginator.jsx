import React, { useState } from 'react';
import s from '../../components/Users/Users.module.css';
import pagination from '../../pagination';


const Paginator = ({ totalUsersCount, pageSize, currentPage, onPageChanged }) => {
    let pages = Math.ceil(totalUsersCount / pageSize);
    let pagesArray = pagination(currentPage, pages);

    return (
        <div className={s.pagBlock}>
            {pagesArray.map((el, index) => {
                if (el !== '...') {
                    return <button className={currentPage === el ? s.pagSelected : s.button} onClick={() => { onPageChanged(el) }} value={el} key={index}>{el}</button>
                }
                return <button className={s.button} value={el} key={index}>{el}</button>
            })
            }
        </div>
    )
}
const PaginatorNew = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {
    
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];

    for (let i = 0; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(Math.ceil(currentPage/10));
    let leftPortionpageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionpageNumber = portionNumber * portionSize;
    
    
    const prevPortion = () => {
        setPortionNumber(portionNumber - 1);
    }
    const nextPortion = () => {
        setPortionNumber(portionNumber + 1);
    }

    return (
        <div className={s.pagBlock}>
            {portionNumber > 1 &&
                <a className= {s.prev} onClick={prevPortion}></a>
            }
            { pages
                .filter((p) => p >= leftPortionpageNumber && p <= rightPortionpageNumber)
                .map(p => {
                    return <button className={currentPage === p ? s.button + ' ' + s.pagSelected : s.button} onClick={(e)=>{onPageChanged(p)}} value={p} key={p}>{p}</button>
                })
            }
            {portionCount > portionNumber &&
                <a className= {s.next} onClick={nextPortion}></a>
            }

        </div>
    )
}
export default Paginator;
export { PaginatorNew }