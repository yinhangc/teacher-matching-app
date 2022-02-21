import Button from './Button';
import { useRef, useState, useEffect } from 'react';
import Modal from './Modal';

const ImageUpload = ({
  name,
  label,
  setFieldValue,
  defaultValue,
  ...props
}) => {
  const [fileArr, setFileArr] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(false);
  const fileRef = useRef();

  // show image if there's file
  useEffect(() => {
    if (defaultValue?.length > 0 && name === 'images') {
      setPreview(
        defaultValue.map((name) => `http://localhost:8000/image/posts/${name}`)
      );
    } else if (defaultValue && name === 'imageCover') {
      setPreview([`http://localhost:8000/image/posts/${defaultValue}`]);
    }
  }, [defaultValue]);

  // when file change
  useEffect(() => {
    if (
      (!fileArr || fileArr.length === 0) &&
      (!defaultValue || defaultValue.length === 0)
    ) {
      setPreview(null);
      return;
    }
    if (fileArr) {
      const objUrls = fileArr.map((file) => URL.createObjectURL(file));
      setPreview(objUrls);
      return () => objUrls.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [fileArr, defaultValue]);

  const fileChangeHandler = (e) => {
    const files = Object.values(e.target.files).map((file) => file);
    if (files.length > 4) {
      setError('不能上載超過4張照片');
      return;
    }
    if (!files) return;
    setFileArr(files);
    setFieldValue(name, files);
  };

  const removeFile = (url) => {
    setFieldValue(name, null);
    setFileArr(null);
    setPreview(null);
  };

  return (
    <>
      <Modal
        onCancel={() => setError(false)}
        errorMsg={error}
        show={!!error}
        content="上載失敗"
      />
      <div className="grid gap-2">
        <label className="text-sky-900" htmlFor={props.name}>
          {label} {props.multiple && '(最多4張)'}
        </label>
        {preview && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
            {preview.map((url) => (
              <div className="mb-3 mx-auto relative" key={url}>
                {!url.includes('default-cover.jpeg') && name === 'imageCover' && (
                  <Button
                    btnType="delete"
                    type="button"
                    className="absolute top-2 right-2 py-1 px-2 "
                    onClick={removeFile}
                  >
                    x 移除
                  </Button>
                )}
                <img src={url} className="object-contain max-h-96 rounded-md" />
              </div>
            ))}
          </div>
        )}
        <input
          ref={fileRef}
          onChange={fileChangeHandler}
          id={props.name}
          type="file"
          accept="image/*"
          className="hidden"
          {...props}
        ></input>
        <div className="flex gap-4 mx-auto">
          <Button
            className="px-10"
            onClick={() => fileRef.current.click()}
            type="button"
          >
            上載{label}
          </Button>
          {name === 'images' && preview && (
            <Button
              btnType="delete"
              className="px-10"
              onClick={removeFile}
              type="button"
            >
              清除{label}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
