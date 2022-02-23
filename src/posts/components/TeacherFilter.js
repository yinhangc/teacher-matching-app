import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../../shared/components/ui/Button';

// prettier-ignore
const timeOption = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日','公眾假期'];
// prettier-ignore
const regionOption = ['中西區','灣仔區','東區','南區','九龍城區','深水埗區','油尖旺區','黃大仙區','觀塘區','北區','西貢區','沙田區','大埔區','離島區','葵青區','荃灣區','屯門區','元朗區']

const TeacherFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [expand, setExpand] = useState(true);
  const [regionFilter, setRegionFilter] = useState([]);
  const [timeFilter, setTimeFilter] = useState([]);

  useEffect(() => {
    if (searchParams.get('region')?.split(','))
      setRegionFilter(searchParams.get('region').split(','));
    if (searchParams.get('time')?.split(','))
      setTimeFilter(searchParams.get('time').split(','));
  }, [searchParams]);

  const regionClickHandler = (e) => {
    const input = e.target.innerText;
    let updatedArr, query;
    updatedArr = !regionFilter.includes(input)
      ? [...regionFilter, input]
      : regionFilter.filter((r) => r !== input);
    setRegionFilter(updatedArr);
    query = updatedArr.join(',');
    query ? searchParams.set('region', query) : searchParams.delete('region');
    setSearchParams(searchParams);
  };

  const timeClickHandler = (e) => {
    const input = e.target.innerText;
    let updatedArr, query;
    updatedArr = !timeFilter.includes(input)
      ? [...timeFilter, input]
      : timeFilter.filter((r) => r !== input);
    setTimeFilter(updatedArr);
    query = updatedArr.join(',');
    query ? searchParams.set('time', query) : searchParams.delete('time');
    setSearchParams(searchParams);
  };

  return (
    <div className={`grid p-4 bg-lightblue bg-opacity-80 rounded-xl`}>
      <div
        className="flex justify-between items-center text-sky-900 hover:cursor-pointer"
        onClick={() => setExpand(!expand)}
      >
        <h3>
          <i className="fa-solid fa-magnifying-glass mr-4"></i>快速搜索
        </h3>
        <button className={`px-3 transition${expand ? ' rotate-90' : ''}`}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
      <div
        className={`grid grid-cols-[max-content,1fr] gap-4 transition-all duration-700 ease-in-out overflow-hidden ${
          expand ? 'max-h-screen mt-5' : 'max-h-0'
        }`}
      >
        <h4 className="text-sky-900">
          <i className="fa-solid fa-location-dot"></i>地區:
        </h4>
        <div className="flex flex-wrap gap-2">
          {regionOption.map((region) => (
            <Button
              type="button"
              key={region}
              btnType={
                regionFilter.includes(region) ? 'active-filter' : 'small'
              }
              className="border-sky-800"
              onClick={regionClickHandler}
            >
              {region}
            </Button>
          ))}
        </div>
        <h4 className="text-sky-900">
          <i className="fa-solid fa-clock"></i>時間:
        </h4>
        <div className="flex flex-wrap gap-2">
          {timeOption.map((time) => (
            <Button
              type="button"
              key={time}
              btnType={timeFilter.includes(time) ? 'active-filter' : 'small'}
              className="border-sky-800"
              onClick={timeClickHandler}
            >
              {time}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherFilter;
