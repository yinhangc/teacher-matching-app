import { Link } from 'react-router-dom';

const TeacherItem = (props) => {
  const { _id: id, imageCover, creator, title } = props.teacher;

  return (
    <Link to={`/${id}`}>
      <li className="grid sm:grid-cols-[1fr,2fr] gap-3 items-center rounded-xl border border-slate-300 p-3 shadow-md">
        <div>
          <img
            src={`http://localhost:8000/public/img/posts/${imageCover}`}
            alt={creator.name}
            className="rounded-lg"
          />
        </div>
        <div className="grid gap-y-2 justify-between items-center">
          <h4 className="border-b-2 pb-2">{title}</h4>
          <div className="flex items-center gap-2 pt-1">
            <span className="w-12 rounded-full overflow-hidden">
              <img
                src={`http://localhost:8000/public/img/users/${creator.icon}`}
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
