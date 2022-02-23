import { useQuill } from 'react-quilljs';
import { useEffect } from 'react';

const ViewEditor = ({ viewText }) => {
  const { quill, quillRef } = useQuill({
    modules: { toolbar: false },
    readOnly: true,
  });

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(viewText);
    }
  }, [quill, viewText]);

  return <div style={{ border: 'none' }} ref={quillRef} id="editor"></div>;
};

export default ViewEditor;
