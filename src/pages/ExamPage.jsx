import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import questionBank from '../data/question_bank_clean.json';

const ExamPage = () => {
    const navigate = useNavigate();

    // Debug: Check if questionBank is loaded
    useEffect(() => {
        console.log('QuestionBank loaded:', questionBank);
        console.log('Sections:', questionBank?.sections);
        if (!questionBank || !questionBank.sections) {
            console.error('QuestionBank data is missing or invalid!');
        }
    }, []);

    // Initialize dark mode from localStorage, default to true
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('examPageDarkMode');
        return saved !== null ? JSON.parse(saved) : true;
    });
    const [mode, setMode] = useState('exam'); // exam or practice
    const [examStatus, setExamStatus] = useState('intro'); // intro, in_progress, finished
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({}); // { questionId: { answer, isCorrect } }
    const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes in seconds
    const [score, setScore] = useState(0);
    const [showOverview, setShowOverview] = useState(false);

    // Persist dark mode to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('examPageDarkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    // Toggle theme handler
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Initialize Exam
    const startExam = () => {
        // Randomly select questions: 40 Judgment, 140 Single Choice, 10 Multiple Choice
        const judgmentQuestions = questionBank.sections.find(s => s.type === 'judgment')?.questions || [];
        const singleChoiceQuestions = questionBank.sections.find(s => s.type === 'single_choice')?.questions || [];
        const multipleChoiceQuestions = questionBank.sections.find(s => s.type === 'multiple_choice')?.questions || [];

        const getRandom = (arr, n) => arr.sort(() => 0.5 - Math.random()).slice(0, n);

        const selectedQuestions = [
            ...getRandom(judgmentQuestions, 40).map(q => ({ ...q, type: 'judgment', points: 0.5 })),
            ...getRandom(singleChoiceQuestions, 140).map(q => ({ ...q, type: 'single_choice', points: 0.5 })),
            ...getRandom(multipleChoiceQuestions, 10).map(q => ({ ...q, type: 'multiple_choice', points: 1 }))
        ];

        setMode('exam');
        setQuestions(selectedQuestions);
        setExamStatus('in_progress');
        setTimeLeft(90 * 60);
        setUserAnswers({});
        setCurrentQuestionIndex(0);
        setShowOverview(false);
    };

    // Initialize Practice Mode
    const startPractice = () => {
        // Get all questions for practice
        const judgmentQuestions = questionBank.sections.find(s => s.type === 'judgment')?.questions || [];
        const singleChoiceQuestions = questionBank.sections.find(s => s.type === 'single_choice')?.questions || [];
        const multipleChoiceQuestions = questionBank.sections.find(s => s.type === 'multiple_choice')?.questions || [];

        const allQuestions = [
            ...judgmentQuestions.map(q => ({ ...q, type: 'judgment' })),
            ...singleChoiceQuestions.map(q => ({ ...q, type: 'single_choice' })),
            ...multipleChoiceQuestions.map(q => ({ ...q, type: 'multiple_choice' }))
        ];

        setMode('practice');
        setQuestions(allQuestions);
        setExamStatus('in_progress');
        setUserAnswers({});
        setCurrentQuestionIndex(0);
        setShowOverview(false);
    };

    // Timer Logic (only for exam mode)
    useEffect(() => {
        let timer;
        if (mode === 'exam' && examStatus === 'in_progress') {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [mode, examStatus]);

    // Submit Exam
    const submitExam = useCallback(() => {
        let calculatedScore = 0;
        const updatedAnswers = { ...userAnswers };

        questions.forEach(q => {
            const userAnswerData = userAnswers[q.id];
            if (!userAnswerData || !userAnswerData.answer) return;

            let isCorrect = false;

            if (q.type === 'judgment' || q.type === 'single_choice') {
                // Already checked during answer selection
                isCorrect = userAnswerData.isCorrect;
            } else if (q.type === 'multiple_choice') {
                // Check multiple choice correctness
                const userAnswer = userAnswerData.answer;
                isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify(q.answer.sort());
                updatedAnswers[q.id] = { ...userAnswerData, isCorrect };
            }

            if (isCorrect) {
                calculatedScore += q.points;
            }
        });

        setUserAnswers(updatedAnswers);
        setScore(calculatedScore);
        setExamStatus('finished');
    }, [questions, userAnswers]);

    // Auto-submit when time runs out
    useEffect(() => {
        if (mode === 'exam' && timeLeft === 0 && examStatus === 'in_progress') {
            submitExam();
        }
    }, [timeLeft, mode, examStatus, submitExam]);

    // Format Time
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // Handle Answer Selection
    const handleAnswer = (answer) => {
        const currentQ = questions[currentQuestionIndex];
        let isCorrect = false;

        if (currentQ.type === 'multiple_choice') {
            // For multiple choice, toggle selection
            const currentAnswers = userAnswers[currentQ.id]?.answer || [];
            let newAnswers;
            if (currentAnswers.includes(answer)) {
                newAnswers = currentAnswers.filter(a => a !== answer);
            } else {
                newAnswers = [...currentAnswers, answer].sort();
            }
            setUserAnswers({ ...userAnswers, [currentQ.id]: { answer: newAnswers, isCorrect: null } });
        } else {
            // For single choice and judgment, check correctness immediately
            isCorrect = answer === currentQ.answer;
            setUserAnswers({ ...userAnswers, [currentQ.id]: { answer, isCorrect } });
        }
    };

    // Navigation
    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    // Early return with error message if data is invalid
    if (!questionBank || !questionBank.sections) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold mb-4">错误：无法加载题库数据</h1>
                    <p className="text-gray-400">请检查数据文件是否存在</p>
                </div>
            </div>
        );
    }

    // Theme-based styles
    const containerClasses = isDarkMode
        ? "bg-[#050505] text-gray-300 selection:bg-[#00ff9d] selection:text-black"
        : "bg-gray-50 text-gray-900 selection:bg-blue-500 selection:text-white";

    const bgPattern = isDarkMode
        ? "bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:40px_40px]"
        : "bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px]";

    const headerBorderClass = isDarkMode
        ? "border-[#27272a]/50 bg-[#050505]/80 backdrop-blur-md"
        : "border-gray-200 bg-white/80 backdrop-blur-md";

    const cardClasses = isDarkMode
        ? "bg-[#0f0f0f]/70 border-[#27272a] text-white shadow-[0_0_15px_rgba(0,255,157,0.05)]"
        : "bg-white/70 border-gray-200 text-gray-900 shadow-lg";

    const accentColor = isDarkMode ? "text-[#00ff9d]" : "text-blue-600";
    const buttonClasses = isDarkMode
        ? "bg-[#27272a] hover:bg-[#3f3f46] text-white border border-[#27272a] hover:border-[#00ff9d] transition-all duration-300"
        : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 hover:border-blue-500 shadow-sm transition-all duration-300";

    const activeOptionClass = isDarkMode
        ? "bg-[#00ff9d]/20 border-[#00ff9d] text-[#00ff9d]"
        : "bg-blue-50 border-blue-500 text-blue-700";

    return (
        <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${containerClasses} ${bgPattern}`}>
            {/* Header */}
            <header className={`fixed top-0 w-full px-6 py-4 border-b z-50 ${headerBorderClass}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className={`font-mono text-xl font-bold ${accentColor}`}>&gt;</span>
                        <h1
                            onClick={() => {
                                setExamStatus('intro');
                                setQuestions([]);
                                setCurrentQuestionIndex(0);
                            }}
                            className="text-xl md:text-2xl font-bold tracking-tight font-mono cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            AI Trainer <span className={`text-sm px-2 py-0.5 rounded border ${isDarkMode ? "border-[#bd93f9]/30 text-[#bd93f9]" : "border-purple-200 text-purple-600"}`}>Lvl.3</span>
                        </h1>
                        {examStatus === 'in_progress' && (
                            <span className={`text-sm px-2 py-0.5 rounded border ${mode === 'practice' ? (isDarkMode ? "border-[#bd93f9]/30 text-[#bd93f9]" : "border-purple-200 text-purple-600") : (isDarkMode ? "border-[#00ff9d]/30 text-[#00ff9d]" : "border-blue-200 text-blue-600")}`}>
                                {mode === 'practice' ? '📚 刷题模式' : '📝 考试模式'}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        {examStatus === 'in_progress' && (
                            <>
                                <button
                                    onClick={() => setShowOverview(!showOverview)}
                                    className={`px-4 py-2 rounded-lg text-sm font-mono flex items-center gap-2 ${buttonClasses}`}
                                >
                                    📋 答题卡
                                </button>
                                {mode === 'exam' && (
                                    <span className={`font-mono text-xl font-bold ${timeLeft < 300 ? "text-red-500 animate-pulse" : accentColor}`}>
                                        {formatTime(timeLeft)}
                                    </span>
                                )}
                            </>
                        )}
                        <button
                            onClick={toggleTheme}
                            className={`px-4 py-2 rounded-lg text-sm font-mono flex items-center gap-2 ${buttonClasses}`}
                        >
                            {isDarkMode ? "☀ Light" : "🌙 Dark"}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow w-full max-w-4xl mx-auto px-6 pt-32 pb-12 flex flex-col items-center justify-center min-h-screen">

                {examStatus === 'intro' && (
                    <div className={`w-full p-8 md:p-12 rounded-xl border backdrop-blur-xl transition-all duration-300 ${cardClasses}`}>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">人工智能训练师 <span className={accentColor}>3级在线测试</span></h2>
                            <p className={`font-mono text-lg max-w-2xl mx-auto mb-8 ${isDarkMode ? "text-[#71717a]" : "text-gray-500"}`}>
                                选择模式开始学习
                            </p>
                        </div>

                        {/* Mode Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                            {/* Exam Mode */}
                            <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'border-[#27272a] bg-[#0f0f0f]/50' : 'border-gray-200 bg-gray-50'}`}>
                                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                    <span>📝</span> 考试模式
                                </h3>
                                <p className={`text-sm mb-4 flex-1 ${isDarkMode ? 'text-[#71717a]' : 'text-gray-600'}`}>
                                    190题限时考试，包含判断题(40题×0.5分)、单选题(140题×0.5分)和多选题(10题×1分)。满分100分，80分及格。
                                </p>
                                <button
                                    onClick={startExam}
                                    className={`w-full px-6 py-3 rounded-lg font-bold transition-all duration-300 ${isDarkMode ? "bg-[#00ff9d] text-black hover:shadow-[0_0_20px_rgba(0,255,157,0.4)]" : "bg-blue-600 text-white hover:shadow-lg hover:bg-blue-700"}`}
                                >
                                    开始考试 →
                                </button>
                            </div>

                            {/* Practice Mode */}
                            <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'border-[#27272a] bg-[#0f0f0f]/50' : 'border-gray-200 bg-gray-50'}`}>
                                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                    <span>📚</span> 刷题模式
                                </h3>
                                <p className={`text-sm mb-4 flex-1 ${isDarkMode ? 'text-[#71717a]' : 'text-gray-600'}`}>
                                    浏览所有题目，直接显示正确答案（绿色高亮），无时间限制，适合学习和记忆。
                                </p>
                                <button
                                    onClick={startPractice}
                                    className={`w-full px-6 py-3 rounded-lg font-bold transition-all duration-300 ${isDarkMode ? "bg-[#bd93f9] text-black hover:shadow-[0_0_20px_rgba(189,147,249,0.4)]" : "bg-purple-600 text-white hover:shadow-lg hover:bg-purple-700"}`}
                                >
                                    开始刷题 →
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {examStatus === 'in_progress' && questions.length > 0 && (
                    <div className={`w-full p-8 rounded-xl border backdrop-blur-xl transition-all duration-300 ${cardClasses}`}>
                        <div className="flex justify-between items-center mb-6">
                            <span className={`text-sm font-mono px-2 py-1 rounded ${isDarkMode ? "bg-[#27272a] text-[#bd93f9]" : "bg-gray-100 text-purple-600"}`}>
                                Question {currentQuestionIndex + 1} / {questions.length}
                            </span>
                            <span className={`text-sm font-mono px-2 py-1 rounded ${isDarkMode ? "bg-[#27272a] text-[#71717a]" : "bg-gray-100 text-gray-500"}`}>
                                {questions[currentQuestionIndex].type === 'judgment' ? '判断题' : questions[currentQuestionIndex].type === 'single_choice' ? '单选题' : '多选题'}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold mb-8 leading-relaxed">
                            {questions[currentQuestionIndex].question}
                        </h3>

                        <div className="space-y-4 mb-8">
                            {questions[currentQuestionIndex].type === 'judgment' ? (
                                <>
                                    <button
                                        onClick={() => mode === 'exam' && handleAnswer(true)}
                                        className={`w-full p-4 rounded-lg border text-left transition-all ${mode === 'practice'
                                            ? questions[currentQuestionIndex].answer === true
                                                ? 'bg-green-500/20 border-green-500 text-green-400'
                                                : isDarkMode ? "border-[#27272a]" : "border-gray-200"
                                            : userAnswers[questions[currentQuestionIndex].id]?.answer === true
                                                ? userAnswers[questions[currentQuestionIndex].id]?.isCorrect
                                                    ? 'bg-green-500/20 border-green-500 text-green-400'
                                                    : 'bg-red-500/20 border-red-500 text-red-400'
                                                : isDarkMode ? "border-[#27272a] hover:border-[#71717a]" : "border-gray-200 hover:border-gray-400"
                                            } ${mode === 'practice' ? 'cursor-default' : 'cursor-pointer'}`}
                                    >
                                        ✓ 正确
                                    </button>
                                    <button
                                        onClick={() => mode === 'exam' && handleAnswer(false)}
                                        className={`w-full p-4 rounded-lg border text-left transition-all ${mode === 'practice'
                                            ? questions[currentQuestionIndex].answer === false
                                                ? 'bg-green-500/20 border-green-500 text-green-400'
                                                : isDarkMode ? "border-[#27272a]" : "border-gray-200"
                                            : userAnswers[questions[currentQuestionIndex].id]?.answer === false
                                                ? userAnswers[questions[currentQuestionIndex].id]?.isCorrect
                                                    ? 'bg-green-500/20 border-green-500 text-green-400'
                                                    : 'bg-red-500/20 border-red-500 text-red-400'
                                                : isDarkMode ? "border-[#27272a] hover:border-[#71717a]" : "border-gray-200 hover:border-gray-400"
                                            } ${mode === 'practice' ? 'cursor-default' : 'cursor-pointer'}`}
                                    >
                                        ✕ 错误
                                    </button>
                                </>
                            ) : (
                                questions[currentQuestionIndex].options.map((opt) => {
                                    const currentAnswer = userAnswers[questions[currentQuestionIndex].id];
                                    const isSelected = questions[currentQuestionIndex].type === 'multiple_choice'
                                        ? (currentAnswer?.answer || []).includes(opt.key)
                                        : currentAnswer?.answer === opt.key;

                                    // Check if this is the correct answer
                                    const isCorrectAnswer = mode === 'practice' && (
                                        questions[currentQuestionIndex].type === 'multiple_choice'
                                            ? questions[currentQuestionIndex].answer.includes(opt.key)
                                            : questions[currentQuestionIndex].answer === opt.key
                                    );

                                    let buttonClass = '';
                                    if (mode === 'practice') {
                                        // In practice mode, show correct answers in green
                                        buttonClass = isCorrectAnswer
                                            ? 'bg-green-500/20 border-green-500 text-green-400'
                                            : isDarkMode ? "border-[#27272a]" : "border-gray-200";
                                    } else {
                                        // In exam mode, show feedback after selection
                                        if (isSelected && questions[currentQuestionIndex].type === 'single_choice') {
                                            buttonClass = currentAnswer?.isCorrect
                                                ? 'bg-green-500/20 border-green-500 text-green-400'
                                                : 'bg-red-500/20 border-red-500 text-red-400';
                                        } else if (isSelected && questions[currentQuestionIndex].type === 'multiple_choice') {
                                            buttonClass = activeOptionClass;
                                        } else {
                                            buttonClass = isDarkMode ? "border-[#27272a] hover:border-[#71717a]" : "border-gray-200 hover:border-gray-400";
                                        }
                                    }

                                    return (
                                        <button
                                            key={opt.key}
                                            onClick={() => mode === 'exam' && handleAnswer(opt.key)}
                                            className={`w-full p-4 rounded-lg border text-left transition-all flex gap-4 ${buttonClass} ${mode === 'practice' ? 'cursor-default' : 'cursor-pointer'}`}
                                        >
                                            <span className="font-mono font-bold">{opt.key}.</span>
                                            <span>{opt.value}</span>
                                        </button>
                                    );
                                })
                            )}
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={prevQuestion}
                                disabled={currentQuestionIndex === 0}
                                className={`px-6 py-2 rounded-lg ${currentQuestionIndex === 0 ? "opacity-50 cursor-not-allowed" : ""} ${buttonClasses}`}
                            >
                                Previous
                            </button>
                            {mode === 'practice' ? (
                                // <button
                                //     onClick={() => {
                                //         setExamStatus('intro');
                                //         setQuestions([]);
                                //         setCurrentQuestionIndex(0);
                                //     }}
                                //     className={`px-6 py-2 rounded-lg font-bold ${isDarkMode ? "bg-[#bd93f9] text-black" : "bg-purple-600 text-white"}`}
                                // >
                                //     返回主页
                                // </button>
                                <button
                                    onClick={nextQuestion}
                                    className={`px-6 py-2 rounded-lg ${buttonClasses}`}
                                >
                                    Next
                                </button>
                            ) : currentQuestionIndex === questions.length - 1 ? (
                                <button
                                    onClick={submitExam}
                                    className={`px-6 py-2 rounded-lg font-bold ${isDarkMode ? "bg-[#00ff9d] text-black" : "bg-blue-600 text-white"}`}
                                >
                                    Submit Exam
                                </button>
                            ) : (
                                <button
                                    onClick={nextQuestion}
                                    className={`px-6 py-2 rounded-lg ${buttonClasses}`}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {examStatus === 'finished' && (
                    <div className={`w-full p-8 md:p-12 rounded-xl border backdrop-blur-xl transition-all duration-300 text-center ${cardClasses}`}>
                        <h2 className="text-3xl font-bold mb-4">Exam Completed!</h2>
                        <div className="text-6xl font-bold mb-4 font-mono">
                            <span className={score >= 80 ? "text-[#00ff9d]" : "text-red-500"}>{score}</span>
                            <span className="text-2xl text-[#71717a]">/100</span>
                        </div>
                        <p className="mb-8 text-[#71717a]">
                            {score >= 80 ? "Congratulations! You passed." : "Keep practicing. You can do better!"}
                        </p>
                        <button
                            onClick={startExam}
                            className={`px-8 py-4 rounded-lg font-bold text-lg ${isDarkMode ? "bg-[#00ff9d] text-black" : "bg-blue-600 text-white"}`}
                        >
                            Retake Exam
                        </button>
                    </div>
                )}

                {/* Floating Answer Overview Panel */}
                {examStatus === 'in_progress' && showOverview && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4" onClick={() => setShowOverview(false)}>
                        <div
                            className={`max-w-4xl w-full max-h-[80vh] overflow-y-auto p-6 rounded-xl border backdrop-blur-xl ${cardClasses}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold">答题概览</h3>
                                <button
                                    onClick={() => setShowOverview(false)}
                                    className={`px-4 py-2 rounded-lg ${buttonClasses}`}
                                >
                                    ✕ 关闭
                                </button>
                            </div>

                            {/* Statistics */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-[#27272a] bg-[#0f0f0f]' : 'border-gray-200 bg-gray-50'}`}>
                                    <div className="text-sm text-gray-500 mb-1">已答题</div>
                                    <div className="text-2xl font-bold">{Object.keys(userAnswers).length}</div>
                                </div>
                                <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-[#27272a] bg-[#0f0f0f]' : 'border-gray-200 bg-gray-50'}`}>
                                    <div className="text-sm text-gray-500 mb-1">未答题</div>
                                    <div className="text-2xl font-bold">{questions.length - Object.keys(userAnswers).length}</div>
                                </div>
                                <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-[#27272a] bg-[#0f0f0f]' : 'border-gray-200 bg-gray-50'}`}>
                                    <div className="text-sm text-gray-500 mb-1">总题数</div>
                                    <div className="text-2xl font-bold">{questions.length}</div>
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex gap-4 mb-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-gray-500"></div>
                                    <span>未答</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-green-500"></div>
                                    <span>正确</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-red-500"></div>
                                    <span>错误</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-blue-500"></div>
                                    <span>多选题</span>
                                </div>
                            </div>

                            {/* Question Grid */}
                            <div className="grid grid-cols-10 gap-2">
                                {questions.map((q, idx) => {
                                    const answer = userAnswers[q.id];
                                    let bgColor = 'bg-gray-500'; // Unanswered

                                    if (answer && answer.answer !== undefined && answer.answer !== null) {
                                        if (q.type === 'multiple_choice') {
                                            // Multiple choice - check if array has items
                                            const hasAnswer = Array.isArray(answer.answer) && answer.answer.length > 0;
                                            if (hasAnswer) {
                                                bgColor = answer.isCorrect === null ? 'bg-blue-500' :
                                                    answer.isCorrect ? 'bg-green-500' : 'bg-red-500';
                                            }
                                        } else {
                                            // Judgment and single choice - show immediate feedback
                                            bgColor = answer.isCorrect ? 'bg-green-500' : 'bg-red-500';
                                        }
                                    }

                                    return (
                                        <button
                                            key={q.id}
                                            onClick={() => {
                                                setCurrentQuestionIndex(idx);
                                                setShowOverview(false);
                                            }}
                                            className={`${bgColor} ${idx === currentQuestionIndex ? 'ring-2 ring-white' : ''} w-full aspect-square rounded-lg font-mono text-sm font-bold hover:opacity-80 transition-all`}
                                        >
                                            {idx + 1}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default ExamPage;
