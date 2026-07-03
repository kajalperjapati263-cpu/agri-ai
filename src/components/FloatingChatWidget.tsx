"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, X, Send, Mic, Image as ImageIcon, 
  Globe, MoreHorizontal, Maximize2 
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const SUGGESTIONS = [
  "Which crop to grow?",
  "Tomato leaves turning yellow",
  "Weather this week",
];

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { role: "ai", text: "👋 Hi! I'm AgriAI. How can I help your farm today?" }
  ]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: "That's a great question! I'm analyzing the latest agricultural data to give you the best advice..." 
      }]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.92, originX: 1, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-3rem)] sm:w-[380px] h-[550px] bg-background/85 backdrop-blur-2xl border border-border rounded-3xl shadow-[0_32px_80px_-16px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border/50 bg-gradient-to-r from-green-500/10 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center text-white shadow-lg">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">AgriAI Assistant</h3>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Link href="/chat" className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 rounded-full">
                   <Maximize2 className="w-4 h-4" />
                </Link>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors hover:bg-destructive/10 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4 no-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex max-w-[85%] rounded-2xl p-3.5 text-sm shadow-sm",
                    msg.role === "ai" 
                      ? "bg-card border border-border/50 rounded-tl-sm mr-auto text-foreground" 
                      : "bg-gradient-to-br from-[#22C55E] to-[#16A34A] text-white rounded-tr-sm ml-auto"
                  )}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border/50 rounded-2xl rounded-tl-sm p-4 mr-auto w-fit shadow-sm"
                >
                  <div className="flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card/50 border-t border-border/50">
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {SUGGESTIONS.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(suggestion)}
                      className="text-[11px] font-medium px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 relative bg-background border border-border rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all shadow-sm">
                <button className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-xl">
                  <ImageIcon className="w-4 h-4" />
                </button>
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                  placeholder="Ask AgriAI..."
                  className="flex-grow bg-transparent text-sm focus:outline-none px-1"
                />
                <button className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-xl hidden sm:block">
                  <Globe className="w-4 h-4" />
                </button>
                <button className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-xl">
                  <Mic className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleSend(input)}
                  disabled={!input.trim()}
                  className="p-2 bg-gradient-to-br from-[#22C55E] to-[#16A34A] text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:hover:shadow-none transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] text-white shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] transition-shadow z-50 group"
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-primary/40 -z-10 blur-md"
        />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bot className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
