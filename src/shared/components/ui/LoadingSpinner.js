import spinner from '../../../assets/spinner.svg';

const LoadingSpinner = (props) => {
  return (
    <div className="grid place-items-center">
      <img src={spinner} alt="Loading..." className="w-24" />
    </div>
  );
};

export default LoadingSpinner;
