import { useEffect, useState } from "react"

export const HeroBar = () => {

    const [img, setImg] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setImg((img + 1) % 4)
        }, 2000)

        return () => { clearInterval(intervalId) }
    })


    const arr = ['hero_one', 'hero_two', 'hero_three', 'hero_four']

    return (
        <div className="my-2 flex">
            <img src={`${arr[img]}.webp`} alt="" />
        </div>
    )
}