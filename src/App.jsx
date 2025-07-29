import React, { useState, useEffect, useRef } from 'react';
import { DollarSign, BookOpen, CheckCircle, XCircle, ArrowRight, Award, UtensilsCrossed, Plus, Loader2 } from 'lucide-react';

// --- MOCK DATA ---
const mockArticles = [
  {
    id: 1,
    title: "The Power of Protein: Building Blocks for a Better You",
    content: `Protein is a macronutrient that is essential to building muscle mass. It is commonly found in animal products, though is also present in other sources, such as nuts and legumes... (Imagine a full article here). It helps repair cells and make new ones. Protein is also important for growth and development in children, teens, and pregnant women. After you eat protein, it is broken down into amino acids, which are the building blocks of protein. Your body needs 20 different types of amino acids to grow and function properly. Though there are 20 amino acids, only 9 are essential, which means your body can't make them and you must get them from food. A food that contains all 9 essential amino acids is called a complete protein. Animal-based foods like meat, poultry, fish, eggs, and dairy are complete proteins. There are also a few plant-based sources of complete protein, including quinoa and soy. Most plant-based proteins are incomplete, meaning they are missing at least one of the essential amino acids. However, you can combine different plant-based proteins to get all 9 essential amino acids. For example, rice and beans together make a complete protein. It's important to eat a variety of protein sources to ensure you're getting all the amino acids your body needs. The amount of protein you need depends on your age, sex, and activity level. A general rule of thumb is to aim for 0.8 grams of protein per kilogram of body weight.`,
    coreQuiz: [
      { question: "Which of the following is a 'complete protein' from a plant-based source?", options: ["Rice", "Beans", "Quinoa", "Almonds"], correctAnswer: "Quinoa" },
      { question: "How many essential amino acids must you get from food?", options: ["5", "9", "15", "20"], correctAnswer: "9" },
      { question: "What are the building blocks of protein called?", options: ["Fatty Acids", "Monosaccharides", "Amino Acids", "Nucleotides"], correctAnswer: "Amino Acids" },
      { question: "Combining rice and beans creates what?", options: ["An incomplete protein", "A complete protein", "A complex carbohydrate", "A simple sugar"], correctAnswer: "A complete protein" },
    ],
    bonusQuiz: [
      { question: "What is the general recommendation for daily protein intake?", options: ["0.5g per kg of body weight", "0.8g per kg of body weight", "1.2g per kg of body weight", "1.5g per kg of body weight"], correctAnswer: "0.8g per kg of body weight" },
      { question: "Which group does NOT have an increased need for protein?", options: ["Children", "Pregnant women", "Athletes", "Sedentary adults"], correctAnswer: "Sedentary adults" },
    ]
  },
  {
    id: 2,
    title: "Hydration Nation: Why Water is Your Best Friend",
    content: `Water is crucial for every single function in your body. From regulating temperature to lubricating joints, it's the unsung hero of our health... (Imagine a full article here). About 60% of your body weight is water. Dehydration can lead to fatigue, headaches, and poor concentration. It's recommended to drink about 8 glasses (2 liters) of water per day, but this can vary based on activity level and climate. Don't wait until you're thirsty to drink! Thirst is a sign that you're already slightly dehydrated. Fruits and vegetables with high water content, like watermelon and cucumber, can also contribute to your daily hydration goals.`,
    coreQuiz: [
      { question: "Approximately what percentage of your body weight is water?", options: ["20%", "40%", "60%", "80%"], correctAnswer: "60%" },
      { question: "Which of these is a sign you are already slightly dehydrated?", options: ["Feeling energetic", "Clear urine", "Feeling thirsty", "Feeling cold"], correctAnswer: "Feeling thirsty" },
      { question: "Which food has a high water content?", options: ["Bread", "Watermelon", "Peanuts", "Cheese"], correctAnswer: "Watermelon" },
      { question: "What is the general daily recommendation for water intake?", options: ["2 glasses", "4 glasses", "6 glasses", "8 glasses"], correctAnswer: "8 glasses" },
    ],
    bonusQuiz: [
      { question: "Besides water, what is another good source of hydration?", options: ["Coffee", "Soda", "Herbal Tea", "Energy Drinks"], correctAnswer: "Herbal Tea" },
    ]
  }
];

// --- Components ---

const Header = ({ funds }) => (
  <header className="bg-white shadow-md sticky top-0 z-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <UtensilsCrossed className="h-8 w-8 text-green-600" />
          <span className="ml-3 text-2xl font-bold text-gray-800">FreshFunds</span>
        </div>
        <div className="flex items-center justify-center bg-green-100 border border-green-200 rounded-full px-4 py-2">
          <span className="text-sm font-medium text-green-700 mr-2">Your Balance:</span>
          <span className="text-lg font-bold text-green-800">${funds.toFixed(2)}</span>
        </div>
      </div>
    </div>
  </header>
);

const HomePage = ({ articles, onSelectArticle }) => (
  <div className="p-4 sm:p-6 lg:p-8">
    <div className="text-center bg-emerald-50 rounded-xl p-8 mb-8 border border-emerald-200 shadow-sm">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-800">
        Unlock up to <span className="text-emerald-500">$20 Fresh Funds!</span>
      </h1>
      <p className="mt-4 text-lg text-emerald-700 max-w-2xl mx-auto">
        Read our weekly articles, ace the quizzes, and earn purchasing dollars for healthy products.
      </p>
    </div>
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-700 border-b pb-2">Weekly Articles</h2>
      {articles.map(article => (
        <div key={article.id} onClick={() => onSelectArticle(article)} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0"><BookOpen className="h-8 w-8 text-green-500 mt-1" /></div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{article.title}</h3>
              <p className="text-gray-600 mt-2">{article.content.substring(0, 100)}...</p>
              <span className="mt-4 inline-flex items-center text-green-600 font-semibold">Read and Earn <ArrowRight className="ml-2 h-4 w-4" /></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ArticlePage = ({ article, onStartQuiz, onBack }) => {
  const [showQuizButton, setShowQuizButton] = useState(false);
  const articleEndRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShowQuizButton(true);
        observer.disconnect();
      }
    }, { threshold: 1.0 });
    if (articleEndRef.current) observer.observe(articleEndRef.current);
    return () => { if (observer) observer.disconnect(); };
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 text-green-600 hover:text-green-800 font-semibold flex items-center">&larr; Back to Articles</button>
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
        <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{article.content}</p>
        <div ref={articleEndRef} className="h-1" />
      </div>
      {showQuizButton && (
        <div className="mt-8 text-center animate-fade-in-up">
          <button onClick={onStartQuiz} className="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300">
            Answer quiz to earn your Fresh Funds!
          </button>
        </div>
      )}
    </div>
  );
};

// --- New, Sophisticated Spin Wheel Component ---
const SpinWheel = ({ segments, onSpinEnd }) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);

    const spin = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        const randomDegree = Math.floor(Math.random() * 360) + 360 * 8; // Spin more for effect
        setRotation(rotation + randomDegree);

        setTimeout(() => {
            const actualDegree = (rotation + randomDegree) % 360;
            const segmentAngle = 360 / segments.length;
            const winningIndex = Math.floor((360 - actualDegree + segmentAngle / 2) % 360 / segmentAngle);
            onSpinEnd(segments[winningIndex]);
        }, 5000); // Longer animation time
    };
    
    const segmentColors = ["#f87171", "#fb923c", "#facc15", "#4ade80", "#38bdf8", "#a78bfa"];
    const segmentAngle = 360 / segments.length;
    const conicGradient = segments.map((_, i) => `${segmentColors[i % segmentColors.length]} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`).join(', ');

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="wheel-container">
                <div className="wheel-pointer"></div>
                {Array.from({ length: 12 }).map((_, i) => (
                    <div className="wheel-light" key={i} style={{ transform: `rotate(${i * 30}deg)` }}></div>
                ))}
                <div 
                    className="wheel" 
                    style={{ 
                        transform: `rotate(${rotation}deg)`,
                        background: `conic-gradient(${conicGradient})`
                    }}
                >
                    {segments.map((segment, index) => (
                        <div 
                            key={index} 
                            className="segment-text"
                            style={{ transform: `rotate(${segmentAngle * index + segmentAngle / 2}deg)` }}
                        >
                            <span>${segment}</span>
                        </div>
                    ))}
                </div>
                <button onClick={spin} disabled={isSpinning} className="spin-button">
                    {isSpinning ? '...' : 'SPIN'}
                </button>
            </div>
        </div>
    );
};

const QuizPage = ({ article, addFunds, onComplete }) => {
    const [stage, setStage] = useState('core');
    const [questions, setQuestions] = useState(article.coreQuiz);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [feedback, setFeedback] = useState({});
    const [isRoundFinished, setIsRoundFinished] = useState(false);
    const [incorrectQuestions, setIncorrectQuestions] = useState([]);
    const [showReward, setShowReward] = useState(false);
    const [lastWinnings, setLastWinnings] = useState(0);
    const [isSpinComplete, setIsSpinComplete] = useState(false);

    const handleAnswer = (option) => {
        if (feedback[currentQuestionIndex]) return;
        const isCorrect = option === questions[currentQuestionIndex].correctAnswer;
        setUserAnswers({ ...userAnswers, [currentQuestionIndex]: option });
        setFeedback({ ...feedback, [currentQuestionIndex]: isCorrect ? 'correct' : 'incorrect' });
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsRoundFinished(true);
            const incorrect = questions.map((_, i) => i).filter(i => feedback[i] !== 'correct');
            setIncorrectQuestions(incorrect);
            if (incorrect.length === 0) {
                setShowReward(true);
            }
        }
    };
    
    const startNextRound = () => {
        const questionsToRevisit = incorrectQuestions.map(i => questions[i]);
        setQuestions(questionsToRevisit);
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setFeedback({});
        setIsRoundFinished(false);
        setIncorrectQuestions([]);
    };

    const handleSpinEnd = (prize) => {
        setLastWinnings(prize);
        addFunds(prize);
        setTimeout(() => setIsSpinComplete(true), 500); // Short delay before showing result
    };

    const advanceStage = () => {
        setShowReward(false);
        setLastWinnings(0);
        setIsSpinComplete(false);
        if (stage === 'core') {
            setStage('bonus');
            setQuestions(article.bonusQuiz);
            setCurrentQuestionIndex(0);
            setUserAnswers({});
            setFeedback({});
            setIsRoundFinished(false);
        } else if (stage === 'bonus') {
            setStage('mealPlanner');
        }
    };

    if (stage === 'mealPlanner') return <MealPlannerPage addFunds={addFunds} onComplete={onComplete} />;

    const currentQuestion = questions[currentQuestionIndex];
    const isAnswered = feedback[currentQuestionIndex] !== undefined;
    
    const coreSegments = [8, 10, 12, 15, 7, 10];
    const bonusSegments = [4, 5, 6, 7, 3, 5];

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200">
                {isRoundFinished ? (
                    <QuizResults incorrectCount={incorrectQuestions.length} onRetry={startNextRound} />
                ) : (
                    <>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">{stage === 'core' ? 'Core Quiz' : 'Bonus Round!'} - Question {currentQuestionIndex + 1}/{questions.length}</h2>
                        <p className="text-2xl text-gray-700 mb-6">{currentQuestion.question}</p>
                        <div className="space-y-3">
                            {currentQuestion.options.map((option) => {
                                const isSelected = userAnswers[currentQuestionIndex] === option;
                                let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200";
                                if (!isAnswered) buttonClass += " bg-gray-100 hover:bg-green-100 border-gray-200";
                                else {
                                    const isCorrectAnswer = option === currentQuestion.correctAnswer;
                                    if (isCorrectAnswer) buttonClass += " bg-green-100 border-green-500 text-green-800 font-bold";
                                    else if (isSelected) buttonClass += " bg-red-100 border-red-500 text-red-800";
                                    else buttonClass += " bg-gray-50 border-gray-200 opacity-60";
                                }
                                return (<button key={option} onClick={() => handleAnswer(option)} disabled={isAnswered} className={buttonClass}>{option}</button>);
                            })}
                        </div>
                        {isAnswered && (
                            <div className="mt-6 text-center animate-fade-in">
                                {feedback[currentQuestionIndex] === 'correct' ? (<p className="text-green-600 font-bold flex items-center justify-center"><CheckCircle className="mr-2"/> Correct!</p>) : (<p className="text-red-600 font-bold"><span className="flex items-center justify-center"><XCircle className="mr-2"/> Not quite.</span> <span className="text-sm text-gray-600 font-normal">Correct answer: {currentQuestion.correctAnswer}</span></p>)}
                                <button onClick={handleNext} className="mt-4 bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition-colors">{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Round'}</button>
                            </div>
                        )}
                    </>
                )}
            </div>
            {showReward && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30 animate-fade-in">
                    <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-lg w-full">
                        {isSpinComplete ? (
                             <>
                                <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                                <h3 className="text-4xl font-bold text-green-700">You won ${lastWinnings}!</h3>
                                <p className="text-gray-600 mt-2 text-lg">The funds have been added to your balance.</p>
                                <button onClick={advanceStage} className="mt-8 w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition-colors shadow-lg text-lg">
                                    {stage === 'core' ? "Go to Bonus Round!" : "Go to Meal Planner!"}
                                </button>
                            </>
                        ) : (
                            <>
                                <h3 className="text-3xl font-bold text-gray-800 mb-4">Spin to Win Your Prize!</h3>
                                <SpinWheel segments={stage === 'core' ? coreSegments : bonusSegments} onSpinEnd={handleSpinEnd} />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const QuizResults = ({ incorrectCount, onRetry }) => (
    <div className="text-center p-4 animate-fade-in">
        {incorrectCount === 0 ? (
            <>
                <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-700">Quiz Complete!</h3>
                <p className="text-gray-600 mt-2">You've earned a spin on the prize wheel!</p>
            </>
        ) : (
            <>
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-red-700">Almost there!</h3>
                <p className="text-gray-600 mt-2">You have {incorrectCount} question(s) to review.</p>
                <button onClick={onRetry} className="mt-6 w-full bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 transition-colors shadow-lg">
                    Revisit Incorrect Questions
                </button>
            </>
        )}
    </div>
);

// --- Meal Planner Page ---
const ALL_FOODS = {
    vegetable: ['Amaranth', 'Artichoke', 'Asparagus', 'Baby corn', 'Green Beans', 'Bean sprouts', 'Beets', 'Broccoli', 'Cabbage', 'Carrots', 'Cauliflower', 'Celery', 'Cucumber', 'Eggplant', 'Kale', 'Mushrooms', 'Onions', 'Peppers', 'Radishes', 'Spinach', 'Tomato', 'Zucchini'].map((name, i) => ({id: `v${i}`, name, category: 'vegetable'})),
    protein: ['Lean Turkey', 'Chicken', 'Eggs', 'Shrimp', 'Salmon', 'Cod'].map((name, i) => ({id: `p${i}`, name, category: 'protein'})),
    carbohydrate: ['Potatoes', 'Sweet Potatoes', 'Tortillas', 'Oatmeal', 'Milk', 'Yogurt', 'Apples', 'Berries'].map((name, i) => ({id: `c${i}`, name, category: 'carbohydrate'})),
};

const MealPlannerPage = ({ addFunds, onComplete }) => {
    const [availableFoods, setAvailableFoods] = useState(ALL_FOODS);
    const [plate, setPlate] = useState({ vegetable: [], protein: [], carbohydrate: [] });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [dropError, setDropError] = useState(null);
    const [newFoodName, setNewFoodName] = useState('');
    const [isCheckingFood, setIsCheckingFood] = useState(false);
    const [foodError, setFoodError] = useState('');

    const handleDragStart = (e, food) => {
        e.dataTransfer.setData('food', JSON.stringify(food));
    };

    const handleDragOver = (e) => { e.preventDefault(); };

    const handleDrop = (e, targetCategory) => {
        e.preventDefault();
        const food = JSON.parse(e.dataTransfer.getData('food'));
        if (food.category === targetCategory) {
            setPlate(prev => ({ ...prev, [targetCategory]: [...prev[targetCategory], food] }));
            setAvailableFoods(prev => ({ ...prev, [food.category]: prev[food.category].filter(f => f.id !== food.id) }));
            setDropError(null);
        } else {
            setDropError(targetCategory);
            setTimeout(() => setDropError(null), 500);
        }
    };

    const handleAddFood = async (e) => {
        e.preventDefault();
        if (!newFoodName.trim()) return;
        
        setIsCheckingFood(true);
        setFoodError('');

        const prompt = `Analyze the food "${newFoodName}". Is it generally considered a good choice for a diabetes-friendly diet? What is its primary food group? Respond in JSON.`;
        
        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        isDiabetesFriendly: { type: "BOOLEAN" },
                        category: { type: "STRING", enum: ["vegetable", "protein", "carbohydrate", "unknown"] }
                    },
                    required: ["isDiabetesFriendly", "category"]
                }
            }
        };
        const apiKey = ""; // API key will be injected by the environment
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
            
            const result = await response.json();
            const text = result.candidates[0].content.parts[0].text;
            const data = JSON.parse(text);

            if (!data.isDiabetesFriendly) {
                setFoodError(`"${newFoodName}" is not a good choice for a diabetes patient.`);
            } else if (data.category && data.category !== 'unknown') {
                const newFood = {
                    id: `custom-${Date.now()}`,
                    name: newFoodName,
                    category: data.category
                };
                setAvailableFoods(prev => ({
                    ...prev,
                    [data.category]: [newFood, ...prev[data.category]]
                }));
                setNewFoodName('');
            } else {
                setFoodError(`Could not categorize "${newFoodName}". Please try a different food.`);
            }
        } catch (error) {
            console.error("AI validation error:", error);
            setFoodError("Could not validate food. Please try again.");
        } finally {
            setIsCheckingFood(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addFunds(5);
        setIsSubmitted(true);
    };
    
    const plateIsFilled = plate.vegetable.length > 0 && plate.protein.length > 0 && plate.carbohydrate.length > 0;

    if (isSubmitted) {
        return (
             <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto text-center">
                <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-800">All Done! You earned $5!</h3>
                    <p className="text-gray-600 mt-2">Your healthy plate plan is saved. Great job!</p>
                    <button onClick={onComplete} className="mt-8 bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-colors">Back to Home</button>
                </div>
            </div>
        )
    }

    const FoodItem = ({ food }) => (
        <div draggable onDragStart={(e) => handleDragStart(e, food)} className="p-2 bg-white border rounded-md shadow-sm cursor-grab active:cursor-grabbing text-sm z-10 relative">
            {food.name}
        </div>
    );
    
    const DropZone = ({ category, color, label, children, className = '' }) => (
        <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, category)}
            className={`relative flex flex-col items-center justify-start p-2 text-center transition-all duration-300 ${className} ${dropError === category ? 'shake' : ''} ${color.bg} ${color.border}`}
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <span className={`font-bold text-2xl opacity-50 ${color.text}`}>{label}</span>
            </div>
            <div className="w-full h-full p-1 mt-2 space-y-1 overflow-y-auto">{children}</div>
        </div>
    );

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
                <h2 className="text-3xl font-bold text-purple-800 text-center">Final Bonus: Build Your Plate!</h2>
                <p className="text-center text-gray-600 mt-2 mb-8">Drag foods into the correct section of the plate. Add your own foods and our AI will check them!</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Food Lists */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                            <h3 className="font-bold text-gray-800 mb-2">Add a Custom Food</h3>
                            <form onSubmit={handleAddFood} className="flex items-center gap-2">
                                <input type="text" value={newFoodName} onChange={(e) => setNewFoodName(e.target.value)} placeholder="e.g., Avocado" className="flex-grow p-2 border rounded-md" disabled={isCheckingFood} />
                                <button type="submit" className="bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 disabled:bg-gray-400" disabled={isCheckingFood || !newFoodName.trim()}>
                                    {isCheckingFood ? <Loader2 className="animate-spin" /> : <Plus />}
                                </button>
                            </form>
                            {foodError && <p className="text-red-600 text-sm mt-2">{foodError}</p>}
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <h3 className="font-bold text-green-800 mb-2">Non-Starchy Vegetables</h3>
                            <div className="space-y-2 max-h-60 overflow-y-auto p-1">{availableFoods.vegetable.map(f => <FoodItem key={f.id} food={f} />)}</div>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg">
                            <h3 className="font-bold text-red-800 mb-2">Proteins</h3>
                            <div className="space-y-2 max-h-40 overflow-y-auto p-1">{availableFoods.protein.map(f => <FoodItem key={f.id} food={f} />)}</div>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg">
                            <h3 className="font-bold text-yellow-800 mb-2">Carbohydrates</h3>
                            <div className="space-y-2 max-h-40 overflow-y-auto p-1">{availableFoods.carbohydrate.map(f => <FoodItem key={f.id} food={f} />)}</div>
                        </div>
                    </div>

                    {/* Plate */}
                    <div className="lg:col-span-2 flex flex-col items-center">
                        <div className="relative w-80 h-80 sm:w-96 sm:h-96 mx-auto bg-gray-100 rounded-full flex overflow-hidden border-4 border-gray-300 shadow-lg">
                            <DropZone className="w-1/2" category="vegetable" label="½ Vegetables" color={{bg: 'bg-green-100', border: 'border-r-2 border-gray-300', text: 'text-green-800'}}>
                                {plate.vegetable.map(f => <FoodItem key={f.id} food={f} />)}
                            </DropZone>
                            <div className="w-1/2 flex flex-col">
                                <DropZone className="h-1/2" category="protein" label="¼ Protein" color={{bg: 'bg-red-100', border: 'border-b-2 border-gray-300', text: 'text-red-800'}}>
                                    {plate.protein.map(f => <FoodItem key={f.id} food={f} />)}
                                </DropZone>
                                <DropZone className="h-1/2" category="carbohydrate" label="¼ Carbs" color={{bg: 'bg-yellow-100', border: '', text: 'text-yellow-800'}}>
                                    {plate.carbohydrate.map(f => <FoodItem key={f.id} food={f} />)}
                                </DropZone>
                            </div>
                        </div>
                        <div className="mt-8 text-center w-full">
                            <button onClick={handleSubmit} disabled={!plateIsFilled} className="w-full max-w-md mx-auto bg-purple-600 text-white font-bold py-3 px-6 rounded-full hover:bg-purple-700 transition-colors shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed">
                                Submit Plate & Claim $5
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main App Component ---
export default function App() {
  const [page, setPage] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [freshFunds, setFreshFunds] = useState(0);
  const [articles, setArticles] = useState([]);

  useEffect(() => { setArticles(mockArticles); }, []);
  
  const handleSelectArticle = (article) => {
    setSelectedArticle(article);
    setPage('article');
  };

  const addFunds = (amount) => {
    setFreshFunds(prevFunds => prevFunds + amount);
  };
  
  const renderPage = () => {
    switch (page) {
      case 'article': return <ArticlePage article={selectedArticle} onStartQuiz={() => setPage('quiz')} onBack={() => setPage('home')} />;
      case 'quiz': return <QuizPage article={selectedArticle} addFunds={addFunds} onComplete={() => setPage('home')} />;
      case 'home': default: return <HomePage articles={articles} onSelectArticle={handleSelectArticle} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header funds={freshFunds} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}
