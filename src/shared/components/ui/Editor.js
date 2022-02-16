import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useRef, useState } from 'react';
import Button from './Button';

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
const formats = [
  'header', 
  'bold', 'italic', 'underline', 'strike', 'color', 'blockquote', 
  'list', 'bullet', 'indent', 'align',
  'link'
]

// let quillRef = React.createRef<ReactQuill>();

const Editor = (props) => {
  const [preview, setPreview] = useState(false);
  let quillRef = useRef();

  const handleChange = () => {
    props.onChange(quillRef.current.state.value);
  };

  return (
    <>
      {props.viewText ? (
        <div className="max-w-full overflow-y-auto">
          <ReactQuill
            id="editor"
            readOnly={true}
            value={props.viewText}
            modules={{ toolbar: false }}
          />
        </div>
      ) : (
        <div className="grid gap-2">
          <div className="flex gap-2 items-center">
            <label className="text-sky-900">詳細描述</label>
            <Button
              type="button"
              btnType="small"
              className="border-sky-800 text-sky-800 hover:bg-sky-50"
              onClick={() => setPreview(!preview)}
            >
              {preview ? '編輯' : '預覽'}
            </Button>
          </div>
          <div className="max-w-full overflow-y-auto">
            <ReactQuill
              id="editor"
              ref={quillRef}
              readOnly={preview}
              value={props.value}
              theme="snow"
              modules={preview ? { toolbar: false } : modules}
              formats={formats}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Editor;
