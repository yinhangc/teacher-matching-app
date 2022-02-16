import TeacherItem from './TeacherItem';

const TeachersList = (props) => {
  return (
    <ul className="grid gap-4">
      {props.items.map((teacher) => (
        <TeacherItem key={teacher._id} teacher={teacher} />
      ))}
    </ul>
  );
};

export default TeachersList;
