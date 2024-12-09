export default function Skeleton() {
    return(
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col gap-4 w-full sm:w-[220px] md:w-[250px] lg:w-[300px]">
        <div className="relative w-full h-40 overflow-hidden rounded-t-lg bg-gray-300 animate-pulse"></div>
            <div className="mt-2">
            <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse mt-2"></div>
            </div>
            <div className="flex items-center gap-2 mt-4">
            <div className="h-10 bg-gray-300 rounded w-1/2 animate-pulse"></div>
            <div className="h-10 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
    )
}