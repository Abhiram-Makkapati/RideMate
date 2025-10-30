import React from 'react';
import type { Message } from '../types';

interface MessageBubbleProps {
    message: Message;
    partnerAvatar: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, partnerAvatar }) => {
    const isUser = message.sender === 'user';
    
    return (
        <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
             {!isUser && (
                <img src={partnerAvatar} alt="Driver" className="w-6 h-6 rounded-full" />
            )}
            <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
                isUser 
                ? 'bg-primary text-white rounded-br-lg' 
                : 'bg-gray-200 text-gray-800 rounded-bl-lg'
            }`}>
                <p className="text-sm">{message.text}</p>
            </div>
        </div>
    );
};