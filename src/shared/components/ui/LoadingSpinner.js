import spinner from '../../../assets/spinner.svg';

const LoadingSpinner = (props) => {
  return (
    <div className="grid place-items-center">
      <img src={spinner} alt="Loading..." />
    </div>
  );
};

export default LoadingSpinner;
