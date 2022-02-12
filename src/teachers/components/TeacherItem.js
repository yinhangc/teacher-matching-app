import { Link } from 'react-router-dom';

const TeacherItem = (props) => {
  const { id, image, name, title } = props.teacher;

  return (
    <Link to={`/${id}`}>
      <li className="grid sm:grid-cols-[1fr,2fr] gap-3 items-center rounded-xl border border-slate-300 p-3">
        <div>
          <img src={image} alt={name} className="rounded-lg" />
        </div>
        <div className="grid gap-y-2 justify-between items-center divide-y">
          <h4>{title}</h4>
          <span className="pt-2 text-sky-900">{name}</span>
        </div>
      </li>
    </Link>
  );
};

export default TeacherItem;
