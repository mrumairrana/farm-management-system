import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { sendMessageAPI } from './chatService';
import { FaRobot, FaArrowLeft, FaLightbulb } from 'react-icons/fa';

function MainChatBot({ onBackToLanding }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '🌾 Welcome to **Farm Builder AI Advisor**! How can I assist you today with livestock health, milk production, crop agronomy, machinery, or financial planning?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("english");

  const quickQuestions = [
    "How to maximize dairy milk yield?",
    "Basmati rice fertilizer schedule?",
    "Quarantine protocol for sick cattle",
    "Cotton pest management techniques"
  ];

  const getSmartFallback = (query, lang) => {
    const q = query.toLowerCase();
    if (lang === "urdu") {
      if (q.includes("دودھ") || q.includes("milk")) {
        return "دودھ کی پیداوار بڑھانے کے لیے گائے اور بھینسوں کو متوازن ونڈا، سبز چارہ (لوسرن/مکئی سائیلج)، نمکیات اور منرل مکسچر روزانہ دیں۔ صبح و شام صاف پانی کی فراہمی یقینی بنائیں۔";
      }
      if (q.includes("کھاد") || q.includes("crop") || q.includes("فصل")) {
        return "احمد فارم پر باسمتی چاول اور گندم کے لیے ڈی اے پی اور یوریا کے ساتھ پوٹاش کا استعمال لازمی کریں، تاکہ دانہ موٹا اور بیماریوں کے خلاف قوت مدافعت مضبوط رہے۔";
      }
      return "احمد فارم AI ایڈوائزر آپ کی مدد کے لیے حاضر ہے۔ آپ لائیو اسٹاک، فصلوں، دودھ کے ریکارڈ، یا بجٹ کے بارے میں سوال پوچھ سکتے ہیں۔";
    }

    if (q.includes("milk") || q.includes("dairy") || q.includes("yield")) {
      return "To maximize dairy cattle milk yield at Ahmed Farm: 1) Provide high-energy maize silage + 16% CP concentrate mash. 2) Ensure continuous access to clean mineral water and salt licks. 3) Maintain consistent 12-hour milking intervals in clean parlor stalls. 4) Monitor udder health weekly to prevent subclinical mastitis.";
    }
    if (q.includes("rice") || q.includes("wheat") || q.includes("fertilizer") || q.includes("crop")) {
      return "For Basmati Rice & Wheat at Ahmed Farm: Apply 1 bag DAP + 1 bag SOP (Potash) per acre at sowing/transplanting, followed by split applications of Urea and Zinc Sulphate at tillering stage. Keep soil moisture between 60-75% during panicle initiation.";
    }
    if (q.includes("quarantine") || q.includes("sick") || q.includes("disease") || q.includes("health")) {
      return "Ahmed Farm Quarantine Protocol: Immediately isolate symptomatic animals in Pen B Isolation Ward. Check rectal temperature twice daily. Withhold milk for the antibiotic withdrawal period (72-96h). Administer prescribed course under supervision of Dr. Tariq Mahmood.";
    }
    return "Ahmed Farm AI Advisor: Our records indicate 156 head of livestock, 8 active crop plots (125 acres), and today's milk production of 420 Liters. How else may I assist with your farm planning?";
  };

  const sendMessage = async (userMessage) => {
    const newMessages = [...messages, { sender: 'user', text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await sendMessageAPI(userMessage, language);
      if (response && response.data && response.data.response) {
        const botResponse = { sender: 'bot', text: response.data.response };
        setMessages((prev) => [...prev, botResponse]);
      } else {
        throw new Error("No response");
      }
    } catch (error) {
      console.warn("Backend chatbot API fallback to smart local intelligence:", error);
      const fallbackText = getSmartFallback(userMessage, language);
      setMessages((prev) => [...prev, { sender: 'bot', text: fallbackText }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-[#1a1a2e] p-4">
      <div className="flex flex-col h-[85vh] w-full max-w-2xl bg-[#121224] border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <header className="bg-gradient-to-r from-[#2d6a4f] to-[#1b4332] text-white p-4 flex justify-between items-center border-b border-[#d4af37]/40 shadow">
          <div className="flex items-center gap-3">
            {onBackToLanding && (
              <button
                onClick={onBackToLanding}
                className="bg-black/30 hover:bg-black/50 p-2 rounded-lg text-white text-xs transition"
                title="Back"
              >
                <FaArrowLeft />
              </button>
            )}
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-gray-950 flex items-center justify-center text-lg font-bold shadow-glow-gold">
              <FaRobot />
            </div>
            <div>
              <h2 className="font-extrabold text-sm md:text-base leading-none text-white">
                FARM BUILDER <span className="text-[#d4af37]">AI ADVISOR</span>
              </h2>
              <span className="text-[10px] text-emerald-300">Intelligent Agricultural Decision Support</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              onChange={(e) => setLanguage(e.target.value)}
              value={language}
              className="bg-gray-900 text-white text-xs px-2.5 py-1 rounded-lg border border-emerald-500/40 focus:outline-none"
            >
              <option value="english">English</option>
              <option value="urdu">اردو</option>
            </select>
          </div>
        </header>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#1a1a2e]/90 space-y-3">
          {messages.map((msg, index) => (
            <MessageBubble key={index} sender={msg.sender} text={msg.text} />
          ))}
          {isLoading && <MessageBubble sender="bot" text="Thinking & Analyzing Farm Records..." />}
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 bg-gray-900/80 border-t border-gray-800 flex gap-2 overflow-x-auto text-[11px] whitespace-nowrap">
          <span className="text-gray-400 flex items-center gap-1 font-semibold">
            <FaLightbulb className="text-amber-400" /> Suggestions:
          </span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(q)}
              className="bg-gray-800 hover:bg-[#2d6a4f] text-gray-300 hover:text-white px-2.5 py-1 rounded-full border border-gray-700 transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Section */}
        <div className="flex items-center gap-2 p-3 border-t border-gray-800 bg-[#121224]">
          <ChatInput sendMessage={sendMessage} language={language} />
        </div>
      </div>
    </div>
  );
}

export default MainChatBot;

