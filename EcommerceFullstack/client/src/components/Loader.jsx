export const Loader = () => {
    return (
        <div className="absolute z-10 bg-gray-200 bg-opacity-20 top-0 left-0 w-full h-[100vh] flex justify-center items-center">
            <div className="w-16 h-16">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"><path fill="none" stroke="#FF156D" stroke-width="5" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"><animate attributeName="stroke-dashoffset" calcMode="spline" dur="1" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate></path></svg>
            </div>
        </div>
    )
}

