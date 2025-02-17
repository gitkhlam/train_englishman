import { useState, useEffect } from "react";

const CustomButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
  >
    {children}
  </button>
);

const CustomCard = ({ children }) => (
  <div className="p-4 border rounded-lg shadow-md w-96 bg-white text-center">
    {children}
  </div>
);

const CustomInput = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="border p-2 rounded-lg w-full text-black placeholder-gray-500 outline-none"
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
      const timer = setTimeout(() => clearMessage(), 1500);
      return () => clearTimeout(timer);
    }
  }, [message]);


  const handleCheckWord = () => {
    if (inputValue.toLowerCase().trim() === currentWord.word.toLowerCase()) {
      setMessage("✅ Правильно!");
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
      setMessage("✅ Правильно!");
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
    <div className="min-h-screen">
      <div className="border border-amber-200 text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#d4d4d8] to-[#292828] bg-clip-text text-transparent leading-right">EnglishMan</div>
      <h1 className="text-2xl font-bold">Тренажер слов</h1>
      {!mode && (
        <div className="flex gap-4">
          <CustomButton onClick={() => setMode("input")}>Ввод вручную</CustomButton>
          <CustomButton onClick={() => setMode("choice")}>Выбор из списка</CustomButton>
        </div>
      )}
      {mode && currentWord && (
        <CustomCard className="h-1">
          <p className="text-xl text-black mb-4">{currentWord.translation}</p>
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
            </div> )
          )}
          <p className="mt-2 text-sm text-gray-600">{currentWord.example}</p>
          <p className="mt-2 font-semibold text-black">{message}</p>
          <CustomButton className="mt-4" onClick={() => setMode(null)}>Назад</CustomButton>
        </CustomCard>
      )}
    </div>
  );
}
