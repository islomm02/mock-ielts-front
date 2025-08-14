export interface TestsType {
    id: string;
    title: string;
    createdAt: string;
    questionsCount: number;
}

export interface QuestionsType {
    id: string;
    question: string;
    a: string;
    b: string;
    c: string;
    d: string;
    answer: string;
    testId: string;
}
