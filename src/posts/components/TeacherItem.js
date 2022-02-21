import { Link } from 'react-router-dom';

const TeacherItem = (props) => {
  const { _id: id, imageCover, creator, title } = props.teacher;

  return (
    <Link to={`/post/${id}`}>
      <li className="grid sm:grid-cols-[1fr,2fr] gap-3 items-center rounded-xl border border-slate-300 p-3 shadow-md transition duration-150 ease-in-out hover:scale-105">
        <div>
          <img
            src={`http://localhost:8000/image/posts/${imageCover}`}
            alt={`${creator.name}'s cover`}
            className="rounded-lg"
          />
        </div>
        <div className="grid grid-cols-1 gap-y-2 justify-between items-center">
          <h4 className="">{title}</h4>
          <hr className="py-1" />
          <div className="flex items-center gap-2">
            <span className="w-12 rounded-full overflow-hidden">
              <img
                src={`http://localhost:8000/image/users/${creator.icon}`}
                alt={creator.name}
              />
            </span>
            <span className="pt-2 text-sky-900">{creator.name}</span>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default TeacherItem;
