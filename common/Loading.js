import ScaleLoader from "react-spinners/ScaleLoader";
const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <ScaleLoader color="#8bc34a" width="10px" height="60px" />
    </div>
  );
};

export default Loading;
