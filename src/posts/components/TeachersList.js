import TeacherItem from './TeacherItem';
import React from 'react';

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
