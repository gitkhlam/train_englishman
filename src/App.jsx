import { useState, useEffect } from "react";
import ModeButton from './components/ModeButton';


const CustomCard = ({ children }) => (
  <div className="p-4 text-center">
    {children}
  </div>
);

const CustomButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
  >
    {children}
  </button>
);

const CustomInput = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="border p-2 mb-4 rounded-lg w-full text-white placeholder-gray-500 outline-none"
  />
);

const wordsData = [
  { word: "apple", translation: "яблоко", example: "I eat an apple every day." },
  { word: "dog", translation: "собака", example: "The dog is barking loudly." },
  { word: "car", translation: "машина", example: "My car is red." },
  { word: "house", translation: "дом", example: "This is my house." }
];

export default function WordTrainer() {
  const [currentWord, setCurrentWord] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [mode, setMode] = useState(null);
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState(0);


  useEffect(() => {
    setCurrentWord(wordsData[number]);
  }, [number]);

  useEffect(() => {
    if (message) {
      function clearMessage() {
        //if (message === "✅ Правильно!") {
          setNumber(n => n + 1 > wordsData.length - 1 ? 0 : n + 1), setMessage("")
          setMessage("");
        //}
      }
      const timer = setTimeout(() => clearMessage(), 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);


  const handleCheckWord = () => {
    if (inputValue.toLowerCase().trim() === currentWord.word.toLowerCase()) {
      setMessage("Correct! ✅");
      //setNumber(n => n + 1 > wordsData.length - 1 ? 0 : n + 1);
      //setCurrentWord(w => w[number]);
    } else {
      setMessage(`❌ Неправильно. Правильный ответ: ${currentWord.word}`);
      //setNumber(n => n + 1 > wordsData.length - 1 ? 0 : n + 1);
    }
    setInputValue("");
  };

  const handleChooseWord = (word) => {
    if (word === currentWord.word) {
      setMessage("Correct! ✅");
      //setNumber(n => n + 1 > wordsData.length - 1 ? 0 : n + 1);
      setCurrentWord(wordsData[number]);
    } else {
      setMessage(`❌ Неправильно. Правильный ответ: ${currentWord.word}`);
      //setNumber(n => n + 1 > wordsData.length - 1 ? 0 : n + 1);
    }
  };

  const getRandomOptions = () => {
    if (!currentWord) return [];
    let options = [currentWord.word];
    while (options.length < 4) {
      const randomWord = wordsData[Math.floor(Math.random() * wordsData.length)].word;
      if (!options.includes(randomWord)) {
        options.push(randomWord);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  }; 

  return (
    <div className="min-h-screen container">
      <header className="flex justify-between items-center py-5 flex-wrap">
        <div>
          <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#d4d4d8] to-[#292828] bg-clip-text text-transparent cursor-pointer break-all inline-block transition-all duration-500 hover:translate-x-[1px] hover:translate-y-[1px] hover:[text-shadow:2px_2px_5px_rgba(255,160,160,0.3)]">
            EnglishMan
          </span>
        </div>
        <div className="border">
          some settings
        </div>
      </header>
      <section className=" mt-20">
        <div className="flex justify-center items-center gap-4 flex-wrap md:gap-12">
          <ModeButton onClick={() => setMode("input")} isActive={mode === "input"}>Manual input ⌨</ModeButton>
          <ModeButton onClick={() => setMode("choice")} isActive={mode === "choice"}>Choice Mode ✔️</ModeButton>
        </div>
        <div className="flex justify-center items-center mt-8">
          {mode && currentWord && (
            <CustomCard className="h-1">
              <p className="text-xl text-white mb-4">{currentWord.translation}</p>
              {mode === "input" ? (
                <div>
                  <CustomInput className="border p-2 placeholder-black text-black"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Введите слово"
                  />
                  <CustomButton onClick={handleCheckWord} className="mt-2">Проверить</CustomButton>
                </div>
              ) : (
                message === "" && (
                  <div className="grid grid-cols-2 gap-2">
                    {getRandomOptions().map((word) => (
                      <CustomButton key={word} onClick={() => handleChooseWord(word)}>
                        {word}
                      </CustomButton>
                    ))}
                  </div>)
              )}
              {message === "Correct! ✅" && (<p className="mt-2 text-2xl text-white">{currentWord.example}</p>)}
              <p className="mt-2 mb-3 text-4xl font-semibold text-white">{message}</p>
              <CustomButton className="mt-4" onClick={() => setMode(null)}>Назад</CustomButton>
            </CustomCard>  
          )}
        </div>
      </section>
    </div>
  );
}
