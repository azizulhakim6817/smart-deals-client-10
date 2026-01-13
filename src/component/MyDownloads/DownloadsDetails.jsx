import { useLoaderData } from "react-router";

const DownloadsDetails = () => {
  const downloadsData = useLoaderData();
  console.log(downloadsData);

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-base-100 rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="flex justify-center items-center">
          <img
            src={downloadsData.image}
            alt={downloadsData.title}
            className="rounded-xl w-full h-72 object-cover shadow-md"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#001931] mb-2">
              {downloadsData.title}
            </h1>

            <p className="text-sm text-gray-500 mb-4">
              Seller:{" "}
              <span className="font-semibold">{downloadsData.seller_name}</span>
            </p>

            <div className="flex gap-4 items-center mb-4">
              <span className="badge badge-success badge-lg">
                Min: ${downloadsData.price_min}
              </span>
              <span className="badge badge-warning badge-lg">
                Max: ${downloadsData.price_max}
              </span>
            </div>

            <p className="text-gray-600">
              Description :
              <span className="font-medium">{downloadsData.description}</span>
            </p>
            <p className="text-gray-600">
              Downloaded by:
              <span className="font-medium">{downloadsData.download_by}</span>
            </p>
          </div>

          {/* Actions */}
          {/*   <div className="flex gap-3 mt-6">
            <button className="btn btn-primary w-full">Download File</button>
            <button className="btn btn-outline btn-error w-full">Delete</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DownloadsDetails;
