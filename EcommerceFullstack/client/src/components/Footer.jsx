export const Footer = () => {
   
    return (
        <div className="w-full bg-[#172337]">
            <div className="grid grid-cols-2 sm:grid-cols-4 p-10 font-serif">
                <div>
                    <h2 className="capitalize text-[#878787] my-3">About</h2>
                    <li className="text-white list-none">Contact Us</li>
                    <li className="text-white list-none">About Us</li>
                    <li className="text-white list-none">Careers</li>
                    <li className="text-white list-none">Stories</li>
                    <li className="text-white list-none">Press</li>
                    <li className="text-white list-none">Information</li>
                </div>

                <div>
                    <h2 className="capitalize text-[#878787] my-3">Help</h2>
                    <li className="text-white list-none">Payment</li>
                    <li className="text-white list-none">Shipping</li>
                    <li className="text-white list-none">Cancellation</li>
                    <li className="text-white list-none">FAQ</li>
                    <li className="text-white list-none">Report</li>
                </div>

                <div>
                    <h2 className="capitalize text-[#878787] my-3">Consumer Policy</h2>
                    <li className="text-white list-none">Return</li>
                    <li className="text-white list-none">Security</li>
                    <li className="text-white list-none">Privacy</li>
                    <li className="text-white list-none">Sitemap</li>
                    <li className="text-white list-none">Press</li>
                    <li className="text-white list-none">Information</li>
                </div>

                <div>
                    <h2 className="capitalize text-[#878787] my-3">Social</h2>
                    <li className="text-white list-none">Facebook</li>
                    <li className="text-white list-none">Twitter</li>
                    <li className="text-white list-none">Youtube</li>
                </div>

            </div>
            <div className=" flex sm:flex-row flex-col gap-2 justify-between items-centern border-t border-t-gray-500 py-3 sm:px-4 px-2 ">

                <div className="flex sm:flex-row flex-col items-start gap-4 text-white text-xs">

                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 overflow-hidden">
                            <img className="object-cover" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/sell-image-9de8ef.svg" alt="" />
                        </div>
                        <p>Become a Seller</p>
                    </div>

                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 overflow-hidden">
                            <img className="object-cover" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/advertise-image-866c0b.svg" alt="" />
                        </div>
                        <p>Advertise</p>
                    </div>

                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 overflow-hidden">
                            <img className="object-cover" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/gift-cards-image-d7ff24.svg" alt="" />
                        </div>
                        <p>Gift Cards</p>
                    </div>

                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 overflow-hidden">
                            <img className="object-cover" src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/help-centre-image-c4ace8.svg" alt="" />
                        </div>
                        <p>Help Center</p>
                    </div>


                </div>
                <div className="self-start sm:self-end">
                    <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg" alt="" />
                </div>
            </div>


            <h2 className="text-center text-white text-xs">Developed By - Debasish Kisan</h2>



           


        </div>
    )
}