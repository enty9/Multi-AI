import React, {useState, useEffect} from "react"
import {Context} from "./components/context";
import {Route, Routes, useNavigate} from "react-router-dom"
import Main from "./components/Main";
import ChatGPT from "./components/ChatGPT";
import Claude from "./components/Claude";
import Gemini from "./components/Gemini";
import DeepSeek from "./components/DeepSeek";
import Qwen from "./components/Qwen";
import Grok from "./components/Grok";

function App() {
  const [lang, setlang] = useState('ru')
  const rout = useNavigate()

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    setlang(savedLang)
  }, []);

  return (
    <Context.Provider value={{
      lang,
      setlang
    }}>
      <div>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="*" action={() => rout('/')}/>
            <Route path="/chatgpt" element={<ChatGPT/>}/>
            <Route path="/claude" element={<Claude/>}/>
            <Route path="/gemini" element={<Gemini/>}/>
            <Route path="/deepseek" element={<DeepSeek/>}/>
            <Route path="/qwen" element={<Qwen/>}/>
            <Route path="/grok" element={<Grok/>}/>
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
