export const setOptedInCompleted = (value) => {
    localStorage.setItem('optedInCompleted', value);
};

export const getOptedInCompleted = () => localStorage.getItem('optedInCompleted');

export const setCorrect = (value) => {
    localStorage.setItem('amountCorrect', value);
};

export const setQuizComplete = (value) => {
    localStorage.setItem('quizComplete', value);
};

export const getQuizComplete = () => localStorage.getItem('quizComplete');

export const getCorrect = () => {
    let val = localStorage.getItem('amountCorrect');
    return val;
};
export const setTryAgain = (value) => {
    localStorage.setItem('tryingAgain', value);
};

export const getTryAgain = () => localStorage.getItem('tryingAgain');

export const clearStorage = () => {
    setOptedInCompleted('false');
    setQuizComplete('false');
    setTryAgain('false');
};