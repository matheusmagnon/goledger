interface ArtistItemProps {
    name: string;
    country: string;
  }
  

export default function ArtistItem({ name, country }: ArtistItemProps){
    return (
        <div
            className="w-full h-auto bg-white rounded-lg p-5 px-10 flex items-center hover:bg-gray-100 transition-colors"
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col items-center">
                <p className="text-customBg text-2xl font-bold">
                  {name}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-customBg text-2xl font-bold">
                {country}
                </p>
              </div>
            </div>
            <div className="flex flex-col ml-10">
            </div>
          </div>
    )
}