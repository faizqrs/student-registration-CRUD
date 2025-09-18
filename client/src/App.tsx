import React, { useState } from 'react';
import RegisterStudent from './components/RegisterStudent';
import StudentsList from './components/StudentList';
import UpdateStudent from './components/UpdateStudents';

function App() {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [refreshListFlag, setRefreshListFlag] = useState(false);

  const onEdit = (id: string) => {
    setSelectedStudentId(id);
  };

  const onUpdateSuccess = () => {
    setSelectedStudentId(null);
    setRefreshListFlag(flag => !flag);
  };

  const onCancelUpdate = () => {
    setSelectedStudentId(null);
  };

  const onRegisterSuccess = () => {
    setRefreshListFlag(flag => !flag);
  };

  return (
    <div>
      <h1>Student Registration</h1>
      {!selectedStudentId && <RegisterStudent onRegisterSuccess={onRegisterSuccess} />}
      {selectedStudentId ? (
        <UpdateStudent id={selectedStudentId} onClose={onCancelUpdate} onUpdated={onUpdateSuccess} />
      ) : (
        <StudentsList key={refreshListFlag.toString()} onEdit={onEdit} />
      )}
    </div>
  );
}

export default App;
