import { useEffect, useState } from "react"
import type { TestsType } from "../@types"
import axios from "axios"
import { API } from "../hooks/getEnv"
import TestsCard from "../components/TestsCard"

const Tests = () => {
    const [tests, setTests] = useState<TestsType[]>([])

    useEffect(() => {
        const fetchTests = async () => {
            const res = await axios.get(`${API}/tests`)
            setTests(res.data)
        }
        fetchTests()
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <div className="p-[10px] bg-[#00257a]">
                <h2 className="font-semibold flex justify-center items-center gap-[5px] text-white text-center text-[25px]">
                    IELTS mock exam <p className="font-semibold text-[#ffbc41] text-center text-[25px]">free</p>
                </h2>
            </div>

            <div className="flex-1  w-[80%] p-3 flex flex-col gap-[20px] bg-[#f7f7f7] rounded-md mt-[20px] mx-auto">
                {[...tests]
                    .sort((a, b) => b.questionsCount - a.questionsCount)
                    .map((item) => (
                        <TestsCard item={item} key={item.id} />
                    ))}
            </div>

            <div className="p-[10px] bg-[#00257a]">
                <h2 className="font-semibold flex justify-center items-center gap-[5px] text-white text-center text-[25px]">
                    IELTS mock exam <p className="font-semibold text-[#ffbc41] text-center text-[25px]">free</p>
                </h2>
            </div>
        </div>
    )
}

export default Tests
