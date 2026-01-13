const LoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-base-200">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-lg font-semibold">Loading, please wait...</p>
    </div>
  );
};

export default LoadingPage;
