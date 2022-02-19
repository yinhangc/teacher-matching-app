import { useQuill } from 'react-quilljs';
import 'react-quill/dist/quill.snow.css';
import React, { useState, useEffect } from 'react';
import { useField } from 'formik';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', { color: [] }, 'blockquote'],
    [
      { align: [] },
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link'],
  ],
};

// prettier-ignore
const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'color', 'blockquote', 'list', 'bullet', 'indent', 'align', 'link']

const Editor = (props) => {
  const [field, meta] = useField(props);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState(false);
  const { quill, quillRef } = useQuill({
    formats,
    modules,
  });

  const { defaultValue, onChange, setFieldValue } = props;
  useEffect(() => {
    if (quill) {
      if (defaultValue) {
        quill.clipboard.dangerouslyPasteHTML(defaultValue);
      }
      quill.on('text-change', () => {
        onChange(quillRef.current.firstChild.innerHTML, setFieldValue);
        const text = quill.getText();
        if (text.trim() === '') setError(true);
        else setError(false);
      });
    }
  }, [quill, defaultValue, quillRef, onChange, setFieldValue]);

  return (
    <>
      <div className="grid gap-2">
        <div className="flex gap-2 items-center">
          <label className="text-sky-900">詳細描述</label>
        </div>
        <div className="max-w-full mb-14 sm:mb-10">
          <div ref={quillRef} onBlur={() => setTouched(true)} />
        </div>
        {((touched && error) || (touched && meta.error)) && (
          <p className="text-red-600">描述為必填</p>
        )}
      </div>
    </>
  );
};

export default Editor;
