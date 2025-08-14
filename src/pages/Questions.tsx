import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../hooks/getEnv";
import type { QuestionsType } from "../@types";
import { CustomCircle, EmtyIcon } from "../assets/icons";

const Questions = () => {
    const { id } = useParams();
    const [time, setTime] = useState<number>(599);
    const [questions, setQuestions] = useState<QuestionsType[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [answers, setAnswers] = useState<
        { questionId: string; choosed: string }[]
    >([]);
    const [isFinish, setIsFinish] = useState(false);
    const [score, setScore] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API}/questions?testId=${id}`).then((res) => {
            const shuffled = [...res.data].sort(() => Math.random() - 0.5);
            setQuestions(shuffled);
        });

        const interval = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    handleFinish();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [id]);

    useEffect(() => {
        if (questions.length > 0) {
            setCurrentQuestion(0);
        }
    }, [questions]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const choosed = e.target.value;
        const qId = questions[currentQuestion].id;

        setAnswers((prev) => {
            const exists = prev.find((a) => a.questionId === qId);
            if (exists) {
                return prev.map((a) =>
                    a.questionId === qId ? { ...a, choosed } : a
                );
            }
            return [...prev, { questionId: qId, choosed }];
        });
    };

    const handleNext = () => {
        setCurrentQuestion((prev) => prev + 1);
    };

    const handleFinish = () => {
        let correctCount = 0;
        answers.forEach((ans) => {
            const question = questions.find((q) => q.id === ans.questionId);
            if (question && question.answer === ans.choosed) {
                correctCount++;
            }
        });
        setScore(correctCount);
        setIsFinish(true);
    };

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    if (questions.length === 0) {
        return (
            <>
                <div className="text-center flex justify-end p-[10px] bg-[#00257a] text-white relative">
                    <button
                        onClick={() => navigate("/tests")}
                        className="bg-white text-black right-3 rounded-md px-2 cursor-pointer hover:bg-[#efefef] duration-300"
                    >
                        Exit
                    </button>
                </div>
                <div className="max-w-[70%] mx-auto">
                    <div className="flex flex-col items-center gap-[10px] justify-center mt-[150px]">
                        <EmtyIcon />
                        No questions for this test
                    </div>
                </div>
            </>
        );
    }

    if (isFinish) {
        return (
            <div className="text-center mt-[100px] flex flex-col items-center">
                <h1 className="text-2xl font-bold">Congratulations!</h1>
                <p className="mt-4">
                    You answered correctly to <b>{score}</b> question from{" "}
                    {questions.length}.
                </p>

                {(() => {
                    const percent = Math.round(
                        (score / questions.length) * 100
                    );
                    const circumference = 2 * Math.PI * 45;
                    const offset =
                        circumference - (percent / 100) * circumference;

                    return (
                        <div className="relative w-[120px] h-[120px] mt-6">
                            <CustomCircle
                                circumference={circumference}
                                offset={offset}
                            />

                            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                                {percent}%
                            </div>
                        </div>
                    );
                })()}

                <button
                    onClick={() => navigate("/tests")}
                    className="mt-6 px-4 py-2 bg-[#00257a] text-white rounded-md"
                >
                    Back to tests
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="text-center p-[10px] bg-[#00257a] text-white relative">
                {minutes}:{seconds.toString().padStart(2, "0")}
                <button
                    onClick={() => navigate("/tests")}
                    className="bg-white text-black absolute right-3 rounded-md px-2 cursor-pointer hover:bg-[#efefef] duration-300"
                >
                    Exit
                </button>
            </div>
            <div className="w-[70%] mx-auto mt-[80px]">
                <div className="border-[1px] p-2 border-[#ECECEC] rounded-md">
                    <p className="text-center">
                        {questions[currentQuestion]?.question}
                    </p>
                    <p className="text-end pr-2">
                        {currentQuestion + 1}/{questions.length}
                    </p>
                    <form className="pl-[40px]">
                        <div className="flex gap-1 items-center">
                            <input
                                onChange={handleChange}
                                value="a"
                                checked={
                                    answers.find(
                                        (a) =>
                                            a.questionId ===
                                            questions[currentQuestion].id
                                    )?.choosed === "a"
                                }
                                name="variant"
                                type="radio"
                            />
                            <p>{questions[currentQuestion]?.a}</p>
                        </div>
                        <div className="flex gap-1 items-center mt-[20px]">
                            <input
                                onChange={handleChange}
                                value="b"
                                checked={
                                    answers.find(
                                        (a) =>
                                            a.questionId ===
                                            questions[currentQuestion].id
                                    )?.choosed === "b"
                                }
                                name="variant"
                                type="radio"
                            />
                            <p>{questions[currentQuestion]?.b}</p>
                        </div>
                        <div className="flex gap-1 items-center mt-[20px]">
                            <input
                                onChange={handleChange}
                                value="c"
                                checked={
                                    answers.find(
                                        (a) =>
                                            a.questionId ===
                                            questions[currentQuestion].id
                                    )?.choosed === "c"
                                }
                                name="variant"
                                type="radio"
                            />
                            <p>{questions[currentQuestion]?.c}</p>
                        </div>
                        <div className="flex gap-1 items-center mt-[20px]">
                            <input
                                onChange={handleChange}
                                value="d"
                                checked={
                                    answers.find(
                                        (a) =>
                                            a.questionId ===
                                            questions[currentQuestion].id
                                    )?.choosed === "d"
                                }
                                name="variant"
                                type="radio"
                            />
                            <p>{questions[currentQuestion]?.d}</p>
                        </div>
                    </form>
                    <div
                        className={`flex pt-[10px] mt-[20px] border-t-[1px] border-[#ECECEC] ${
                            currentQuestion === 0
                                ? "justify-end"
                                : "justify-between"
                        } pr-2`}
                    >
                        <button
                            onClick={() =>
                                setCurrentQuestion((prev) => prev - 1)
                            }
                            className={`${
                                currentQuestion > 0 ? "" : "hidden"
                            } text-[20px] cursor-pointer pl-[20px]`}
                        >
                            {"<"}
                        </button>
                        {currentQuestion + 1 < questions.length ? (
                            <button
                                onClick={handleNext}
                                className="px-3 cursor-pointer hover:bg-[#0339b6] duration-200 text-[15px] py-1 bg-[#00257a] text-white rounded-xl"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleFinish}
                                className="px-3 cursor-pointer hover:bg-[#0339b6] duration-200 text-[15px] py-1 bg-green-600 text-white rounded-xl"
                            >
                                Finish
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Questions;
