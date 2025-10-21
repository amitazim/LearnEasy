import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageCircle, X, Minimize2, Maximize2, Search, BookOpen, FileText, BarChart3 } from 'lucide-react';
import { faqData } from '@/data/mockData';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  options?: string[];
}

const stripEmojis = (s: string) =>
  s.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27FF}]/gu, '');

const normalize = (s: string) =>
  stripEmojis(s)
    .toLowerCase()
    .replace(/[^\w\s]|_/g, ' ') // remove punctuation
    .replace(/\s+/g, ' ')
    .trim();

/** ---- Intent Routing (minimal + robust) ---- */
type Intent =
  | 'nextClassSchedule'
  | 'leaveClass'
  | 'classes'
  | 'assignments'
  | 'grades'
  | 'announcements'
  | 'materials'
  | 'help';

const INTENT_SYNONYMS: Record<Intent, string[]> = {
  // Check specific intents first (ordering handled below)
  nextClassSchedule: [
    'next class schedule',
    'next class',
    'when is my next class',
    'upcoming class',
    'class time',
    'class timing'
  ],
  leaveClass: [
    'leave a class',
    'leave class',
    'drop class',
    'unenroll',
    'unenroll from class',
    'remove class'
  ],

  // General sections
  classes: [
    '📚 my classes',
    'my classes',
    'classes',
    'class info',
    'class information',
    'class schedule'
  ],
  assignments: ['📝 my assignments', 'my assignments', 'assignments', 'assignment'],
  grades: ['📊 my grades', 'my grades', 'grades', 'report', 'result'],
  announcements: ['📢 announcements', 'announcements', 'announcement'],
  materials: ['📁 class materials', 'materials', 'class materials', 'files', 'resources'],
  help: ['help', 'support', 'assist', 'how to use', 'guide']
};

// More specific first to prevent “classes” from stealing “next class schedule”
const INTENT_ORDER: Intent[] = [
  'nextClassSchedule',
  'leaveClass',
  'classes',
  'assignments',
  'grades',
  'announcements',
  'materials',
  'help'
];

const getIntentFromInput = (raw: string): Intent | null => {
  const input = normalize(raw);
  for (const intent of INTENT_ORDER) {
    const patterns = INTENT_SYNONYMS[intent];
    for (const p of patterns) {
      if (input.includes(normalize(p))) return intent;
    }
  }
  return null;
};

/** ---- Smarter FAQ match (tiny scoring) ---- */
const findBestMatch = (userInput: string): string => {
  const normInput = normalize(userInput);
  const inputTokens = normInput.split(' ').filter(Boolean);

  let bestAnswer = '';
  let bestScore = 0;

  const overlapScore = (question: string) => {
    const q = normalize(question);
    const qTokens = q.split(' ').filter(Boolean);
    let overlap = 0;
    for (const t of qTokens) if (inputTokens.includes(t)) overlap++;
    const phraseBoost = normInput.includes(q) ? 2 : 0;
    return overlap + phraseBoost;
  };

  // Traverse your nested faqData structure safely
  for (const category of Object.values(faqData as any)) {
    for (const subcategory of Object.values(category as any)) {
      for (const [question, answer] of Object.entries(subcategory as Record<string, string>)) {
        const score = overlapScore(question);
        if (score > bestScore) {
          bestScore = score;
          bestAnswer = answer as string;
        }
      }
    }
  }

  // require at least some confidence: 2+ overlapping words or phrase match
  return bestScore >= 2 ? bestAnswer : '';
};

const Chatbott = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text:
        "Hello! Welcome to your AI Classroom Assistant. I can help you with classes, assignments, grades, announcements, and materials. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
      options: ['📚 My Classes', '📝 Assignments', '📢 Announcements', '📊 Grades & Reports', '📁 Class Materials']
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [userName, setUserName] = useState('');
  const [isIdentified, setIsIdentified] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    let responseText = '';
    let options: string[] = [];

    // 1) Identification (kept original behavior)
    if (!isIdentified && (input.includes('i am') || input.includes('my name is'))) {
      const name = userInput.split(/i am |my name is /i)[1]?.trim();
      if (name) {
        setUserName(name);
        setIsIdentified(true);
        responseText = `Nice to meet you, ${name}! I'm your AI classroom assistant. I can help you with classes, assignments, grades, announcements, and materials. What would you like to explore?`;
        options = ['📚 My Classes', '📝 My Assignments', '📊 My Grades', '📢 Announcements', '📁 Class Materials'];
      }
    } else {
      // 2) Intent routing (new, minimal surface change)
      const intent = getIntentFromInput(userInput);

      if (intent === 'classes') {
        responseText =
          '**Your Classes:**\n\n• Math\n• English  \n• Science\n• History\n\nWhat would you like to know about your classes?';
        options = ['Next class schedule', 'Join a new class', 'Contact my teachers', 'View class details', 'Leave a class'];
      } else if (intent === 'assignments') {
        responseText =
          '**Upcoming Assignments:**\n\n• Math homework - Due Thursday\n• Science lab report - Due Friday\n\nHow can I help with your assignments?';
        options = ['Submit an assignment', 'Check assignment grades', 'View all assignments', 'Get assignment feedback', 'Upload multiple files'];
      } else if (intent === 'grades') {
        responseText =
          '**Your Current Grades:**\n\n• Math: A\n• English: B+\n• Science: A-\n• History: B\n\nGreat work! What would you like to do?';
        options = ['Download report card', 'View detailed grades', 'Compare with class average', 'Request grade review', 'Track my progress'];
      } else if (intent === 'announcements') {
        responseText = '**Announcements:**\n\nI can help you with class announcements. What would you like to do?';
        options = ['View all announcements', 'Post new announcement', 'Search announcements', 'Pin important announcement', 'Enable notifications'];
      } else if (intent === 'materials') {
        responseText = '**Class Materials:**\n\nI can help you access and manage your class materials. What do you need?';
        options = ['View English class files', 'Upload lecture notes', 'Download recordings', 'Search materials', 'Share study materials'];
      } else if (intent === 'nextClassSchedule') {
        // NEW: distinct response, no longer falls through to FAQ
        responseText = 'Your next class is Math at 10:00 AM tomorrow.';
      } else if (intent === 'leaveClass') {
        // NEW: distinct response
        responseText = 'Which class would you like to leave? Please provide the class name.';
      } else {
        // 3) If no intent found, try FAQ (now smarter)
        const faqMatch = findBestMatch(userInput);
        if (faqMatch) {
          responseText = faqMatch;

          // Contextual options (kept your idea)
          if (faqMatch.includes('Math homework') || faqMatch.includes('Science lab')) {
            options = ['Submit assignment', 'Check deadline', 'Get help'];
          } else if (faqMatch.toLowerCase().includes('grades')) {
            options = ['Download report', 'View details', 'Track progress'];
          } else if (faqMatch.toLowerCase().includes('class code') || faqMatch.toLowerCase().includes('join')) {
            options = ['Enter class code', 'View my classes', 'Contact teacher'];
          } else if (faqMatch.toLowerCase().includes('materials')) {
            options = ['Browse files', 'Upload materials', 'Search topics'];
          }
        } else if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
          responseText = `Hello${userName ? ` ${userName}` : ''}! Welcome back to your classroom assistant. I can help you with:`;
          options = ['📚 Classes & Schedule', '📝 Assignments & Homework', '📊 Grades & Reports', '📢 Announcements', '📁 Class Materials'];
        } else if (input.includes('help') || input.includes('support')) {
          responseText =
            "I'm here to help! I can assist you with:\n\n• **Classes:** Schedule, joining, teachers\n• **Assignments:** Submissions, grades, feedback\n• **Announcements:** View, create, search\n• **Grades:** Reports, analysis, tracking\n• **Materials:** Files, uploads, sharing\n\nWhat specific help do you need?";
          options = ['Assignment help', 'Grade questions', 'Technical support', 'How to use features', 'Contact teacher'];
        } else {
          responseText = `I understand you're asking about: "${userInput}"\n\nI can help you with classroom tasks. Here are some things I can assist with:`;
          options = ['📚 Class information', '📝 Assignment help', '📊 Grade checking', '📢 Announcements', '📁 File management', '❓ Ask something else'];
        }
      }
    }

    return {
      id: Date.now().toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
      options: options.length ? options : undefined
    };
  };

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputText.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  const handleOptionClick = (option: string) => handleSendMessage(option);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white rounded-full p-4 transition-all duration-300 hover:scale-110 relative cursor-pointer shadow-xl "
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'}`}>
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 h-full flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-4 rounded-t-lg flex items-center justify-between ">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bot className="w-6 h-6" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold">My Classroom Assistant</h3>
              <p className="text-xs text-blue-100">Powered by Learn Easy</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsMinimized(!isMinimized)} className="text-blue-100 hover:text-white transition-colors p-1">
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button onClick={() => setIsOpen(false)} className="text-blue-100 hover:text-white transition-colors p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map(message => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === 'user' ? 'bg-blue-600' : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                        }`}
                      >
                        {message.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                      </div>
                      <div
                        className={`rounded-2xl p-3 shadow-sm ${
                          message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-200'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                        {message.options && (
                          <div className="mt-3 space-y-2">
                            {message.options.map((option, index) => (
                              <button
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className="block w-full text-left px-3 py-2 text-xs bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-200"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className={`text-xs text-gray-400 mt-1 ${message.sender === 'user' ? 'text-right mr-11' : 'text-left ml-11'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-2 py-2 bg-white border-t border-gray-100">
              <div className="flex gap-2 overflow-x-auto">
                {[
                  { icon: BookOpen, label: 'Classes', action: '📚 My Classes' },
                  { icon: FileText, label: 'Assignments', action: '📝 My Assignments' },
                  { icon: BarChart3, label: 'Grades', action: '📊 My Grades' },
                  { icon: Search, label: 'Help', action: 'help' }
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(item.action)}
                    className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors whitespace-nowrap"
                  >
                    <item.icon className="w-3 h-3" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Ask me anything about your classroom...${!isIdentified ? ' (Tell me your name!)' : ''}`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbott;
