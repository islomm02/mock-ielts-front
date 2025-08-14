import Answers from "../pages/Answers"
import NotFoundPage from "../pages/NotFoundPage"
import Questions from "../pages/Questions"
import Tests from "../pages/Tests"
export const paths = {
    questions: "/tests/:id",
    tests: "/tests",
    answer:"/answer",
    notFound: "*"    
}


export const pagesList = [
    {
        id: 1,
        path: paths.questions,
        element: <Questions/>
    },
    {
        id: 2,
        path: paths.answer,
        element: <Answers/>
    },
    {
        id: 3,
        path: paths.tests,
        element: <Tests/>
    },
    {
        id: 3,
        path: paths.notFound,
        element: <NotFoundPage/>
    },
]