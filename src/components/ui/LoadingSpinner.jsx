const LoadingSpinner = ({ size = "md", text = "Processing..." }) => {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <div className={`${sizeClasses[size]} border-gray-200 border-t-primary-500 rounded-full animate-spin`} />
      {text && (
        <p className="text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;