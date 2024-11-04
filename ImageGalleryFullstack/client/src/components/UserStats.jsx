export const UserStats = (props) => {

    return (
        <div className=" overflow-hidden bg-blue-500 rounded-lg">
            <div className="mt-2 w-full h-full bg-blue-900 py-4 flex flex-col justify-between items-center">
                <h1 className="text-gray-400">{props.data.email}</h1>
                <div className="flex flex-col items-center">
                    <h1 className="text-7xl text-white">{props.data.totalPosts}</h1>
                    <p className="text-gray-400">posts</p>
                </div>
                <p className="text-green-500">{props.data.totalLikes} likes</p>
            </div>
        </div>
    )
}