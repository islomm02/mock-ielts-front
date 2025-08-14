import { useNavigate } from "react-router-dom"
import type { TestsType } from "../@types"
import { formatDate } from "../hooks/formatterDate"


const TestsCard = ({item}: {item:TestsType}) => {
    const navigate = useNavigate()
  return (
    <div className="flex bg-white roudned-md  justify-between items-center p-5  ">
            <p>{item.title }</p>
            <div className="flex gap-[10px] items-center">
                <p>Questions: {item.questionsCount}</p>
                <p>{ formatDate(item.createdAt).dateOnly}</p>
                <button onClick={() => navigate(`${item.id}`)} className="px-3 cursor-pointer hover:bg-[#0339b6] duration-200 text-[15px] py-1 bg-[#00257a]    text-white rounded-xl ">Start</button>
            </div>
        </div>
  )
}

export default TestsCard