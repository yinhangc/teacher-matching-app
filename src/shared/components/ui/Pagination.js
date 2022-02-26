import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const minPageRange = 2;
const maxPageRange = 2;

const Pagination = ({ totalPageNum, currPageNum }) => {
  const [btnArr, setBtnArr] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let startIndex = currPageNum - minPageRange;
    if (startIndex < 1) startIndex = 1;
    let endIndex = currPageNum + maxPageRange;
    if (endIndex > totalPageNum) endIndex = totalPageNum;
    let arr = [];
    for (let i = startIndex; i <= endIndex; i++) {
      arr.push(
        <button
          key={`btn${i}`}
          className={
            currPageNum === i
              ? 'bg-sky-800 text-white border-none px-3 py-1 rounded-lg font-bold'
              : 'bg-white text-black border-none px-3 py-1 rounded-lg'
          }
          onClick={() => {
            i === 1 ? searchParams.delete('page') : searchParams.set('page', i);
            setSearchParams(searchParams);
          }}
        >
          {i}
        </button>
      );
      setBtnArr(arr);
    }
  }, [totalPageNum, currPageNum, searchParams, setSearchParams]);

  return (
    <div className="flex gap-2 items-center justify-self-end p-1 rounded-lg">
      {currPageNum > 1 + minPageRange ? (
        <button
          className="text-lg pl-1"
          onClick={() => setSearchParams(searchParams.delete('page'))}
        >
          <i className="fa-solid fa-angles-left text-sky-800"></i>
        </button>
      ) : null}
      {btnArr}
      {currPageNum < totalPageNum - maxPageRange ? (
        <button
          className="text-lg pl-1"
          onClick={() => {
            searchParams.set('page', totalPageNum);
            setSearchParams(searchParams);
          }}
        >
          <i className="fa-solid fa-angles-right text-sky-800"></i>
        </button>
      ) : null}
    </div>
  );
};

export default Pagination;
