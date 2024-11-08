import { useNavigate } from "react-router-dom"

export const MenuBar = () => {

    const navigate = useNavigate()

    return (
        <div className="flex justify-center gap-10 flex-wrap py-3 shadow-md bg-white">

            <div onClick={() => navigate('/jewelery')} className="flex flex-col justify-center items-center cursor-pointer">
                <div className="w-10 h-10 overflow-hidden">
                    <img className="object-cover" src="grocery.png" alt="Grocery" />
                </div>
                <p className="text-[#212121] font-semibold text-xs">Grocery</p>
            </div>

            <div onClick={() => navigate('/electronics')} className="flex flex-col justify-center items-center cursor-pointer">
                <div className="w-10 h-10 overflow-hidden">
                    <img className="object-cover" src="mobiles.png" alt="Grocery" />
                </div>
                <p className="text-[#212121] font-semibold text-xs">Mobiles</p>
            </div>

            <div onClick={() => navigate('/jewelery')} className="flex flex-col justify-center items-center cursor-pointer">
                <div className="w-10 h-10 overflow-hidden">
                    <img className="object-cover" src="fashion.png" alt="Grocery" />
                </div>
                <p className="text-[#212121] font-semibold text-xs">Fashion</p>
            </div>

            <div onClick={() => navigate('/electronics')} className="flex flex-col justify-center items-center cursor-pointer">
                <div className="w-10 h-10 overflow-hidden">
                    <img className="object-cover" src="electronics.png" alt="Grocery" />
                </div>
                <p className="text-[#212121] font-semibold text-xs">Electronics</p>
            </div>

            <div onClick={() => navigate('/jewelery')} className="flex flex-col justify-center items-center cursor-pointer">
                <div className="w-10 h-10 overflow-hidden">
                    <img className="object-cover" src="home.png" alt="Grocery" />
                </div>
                <p className="text-[#212121] font-semibold text-xs">Home</p>
            </div>

            <div onClick={() => navigate('/electronics')} className="flex flex-col justify-center items-center cursor-pointer">
                <div className="w-10 h-10 overflow-hidden">
                    <img className="object-cover" src="appliances.png" alt="Grocery" />
                </div>
                <p className="text-[#212121] font-semibold text-xs">Appliances</p>
            </div>

            <div onClick={() => navigate('/jewelery')} className="flex flex-col justify-center items-center cursor-pointer">
                <div className="w-10 h-10 overflow-hidden">
                    <img className="object-cover" src="travel.png" alt="Grocery" />
                </div>
                <p className="text-[#212121] font-semibold text-xs">Travel</p>
            </div>

            <div onClick={() => navigate('/electronics')} className="flex flex-col justify-center items-center cursor-pointer">
                <div className="w-10 h-10 overflow-hidden">
                    <img className="object-cover" src="topoffers.png" alt="Grocery" />
                </div>
                <p className="text-[#212121] font-semibold text-xs">Top Offers</p>
            </div>

            <div onClick={() => navigate('/jewelery')} className="flex flex-col justify-center items-center cursor-pointer">
                <div className="w-10 h-10 overflow-hidden">
                    <img className="object-cover" src="toys.png" alt="Grocery" />
                </div>
                <p className="text-[#212121] font-semibold text-xs">Toys</p>
            </div>

            <div onClick={() => navigate('/electronics')} className="flex flex-col justify-center items-center cursor-pointer">
                <div className="w-10 h-10 overflow-hidden">
                    <img className="object-cover" src="twowheelers.png" alt="Grocery" />
                </div>
                <p className="text-[#212121] font-semibold text-xs">Two Wheelers</p>
            </div>

        </div>
    )
}