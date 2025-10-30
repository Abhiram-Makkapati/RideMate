import React, { useState } from 'react';
import type { Driver, Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { Send, ArrowLeft } from 'lucide-react';

const mockMessages: Message[] = [
    { id: 'm1', text: 'Hey, I see you requested a ride. Just confirming the pickup at UNT Campus.', sender: 'partner', timestamp: '8:35 AM' },
    { id: 'm2', text: 'Yep, that\'s me! See you at 8:30.', sender: 'user', timestamp: '8:36 AM' },
    { id: 'm3', text: 'Sounds good, thanks!', sender: 'partner', timestamp: '8:41 AM' },
];

interface ChatViewProps {
    partner: Driver;
    onNavigateBack: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ partner, onNavigateBack }) => {
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        const msg: Message = {
            id: `m${Date.now()}`,
            text: newMessage,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
        };
        setMessages([...messages, msg]);
        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-[calc(100vh-12rem)] md:h-auto bg-white rounded-xl shadow-lg animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 border-b">
                <button onClick={onNavigateBack} className="text-gray-600 hover:text-gray-800 md:hidden">
                    <ArrowLeft size={24} />
                </button>
                <img src={partner.avatar} alt={partner.name} className="w-10 h-10 rounded-full" />
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{partner.name}</h3>
                    <p className="text-sm text-gray-500">Online</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.map(msg => (
                    <MessageBubble key={msg.id} message={msg} partnerAvatar={partner.avatar} />
                ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-gray-50">
                <form onSubmit={handleSend} className="flex items-center gap-2">
                    <input 
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    />
                    <button type="submit" className="bg-primary text-white p-3 rounded-full hover:bg-primary-dark transition-colors">
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};
