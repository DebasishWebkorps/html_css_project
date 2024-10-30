export const Loader = () => {
    return (
        <div className="fixed flex justify-center items-center z-10 top-0 left-0 w-[100vw] h-[100vh] overflow-hidden bg-opacity-30 bg-gray-500">

            <div className="w-52 h-32 flex items-center">
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><circle fill='#FF156D' stroke='#FF156D' strokeWidth='20' r='15' cx='40' cy='100'>
                    <animate attributeName='opacity' calcMode='spline' dur='2' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.4'>
                    </animate></circle><circle fill='#FF156D' stroke='#FF156D' strokeWidth='20' r='15' cx='100' cy='100'>
                        <animate attributeName='opacity' calcMode='spline' dur='2' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.2'>
                        </animate></circle><circle fill='#FF156D' stroke='#FF156D' strokeWidth='20' r='15' cx='160' cy='100'>
                        <animate attributeName='opacity' calcMode='spline' dur='2' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='0'>
                        </animate></circle></svg>
            </div>
        </div>
    )
}