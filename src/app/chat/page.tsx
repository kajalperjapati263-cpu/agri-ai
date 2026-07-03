"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Bot, Mic, Send, Globe, WifiOff, Paperclip } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { cn } from "@/lib/utils";

const languages = [
  "English", "Hindi", "Punjabi", "Tamil", "Telugu", "Bengali", "Marathi", "Gujarati"
];

const mockMessages = [
  { role: "ai", text: "Hello! I am your AgriAI Assistant. How can I help you with your farming today?" },
  { role: "user", text: "What is the best time to sow wheat in Punjab?" },
  { role: "ai", text: "For Punjab, the best time to sow wheat is generally between the first and third week of November. Sowing during this period ensures optimal temperature for germination and early growth, leading to higher yields." },
];

export default function ChatPage() {
  const [messages, setMessages] = React.useState(mockMessages);
  const [input, setInput] = React.useState("");
  const [language, setLanguage] = React.useState("English");
  const [isOffline, setIsOffline] = React.useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: isOffline 
          ? "I am currently offline, but I can still answer basic questions from my local database. For the most accurate and up-to-date information, please connect to the internet."
          : "That's a great question! I am processing the best farming practices for your query..." 
      }]);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            AI Farming Assistant
          </h1>
          <p className="text-muted-foreground mt-1">Get expert advice, pest control solutions, and crop management tips.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-card p-2 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-2 px-3 border-r border-border">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-sm font-medium outline-none cursor-pointer"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <button 
            onClick={() => setIsOffline(!isOffline)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              isOffline ? "bg-amber-500/10 text-amber-600 dark:text-amber-500" : "bg-primary/10 text-primary"
            )}
          >
            {isOffline ? <WifiOff className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-primary relative"><div className="absolute inset-0 rounded-full bg-primary animate-ping" /></div>}
            {isOffline ? "Offline Mode" : "Online"}
          </button>
        </div>
      </div>

      <GlassCard className="flex-grow flex flex-col mb-4 overflow-hidden border-border/50">
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex max-w-[80%] rounded-2xl p-4",
                msg.role === "ai" 
                  ? "bg-muted/50 rounded-tl-sm mr-auto" 
                  : "bg-primary text-primary-foreground rounded-tr-sm ml-auto"
              )}
            >
              <p className="leading-relaxed">{msg.text}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="p-4 bg-card border-t border-border/50">
          <div className="flex items-center gap-2 relative">
            <button className="p-3 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 rounded-full">
              <Paperclip className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about crops, weather, diseases..."
              className="flex-grow bg-muted/50 border border-border rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <button className="p-3 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 rounded-full absolute right-16">
              <Mic className="w-5 h-5" />
            </button>
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary transition-colors shadow-md"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
