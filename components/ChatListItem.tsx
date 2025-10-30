import React from 'react';
import type { ChatSummary } from '../types';

interface ChatListItemProps {
    chat: ChatSummary;
    onClick: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat, onClick }) => {
    return (
        <button 
            onClick={onClick} 
            className="w-full flex items-center gap-4 p-3 text-left rounded-lg hover:bg-gray-100 transition-colors"
        >
            <div className="relative">
                <img src={chat.partner.avatar} alt={chat.partner.name} className="w-12 h-12 rounded-full" />
                {chat.unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                        {chat.unreadCount}
                    </span>
                )}
            </div>
            <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-800 truncate">{chat.partner.name}</p>
                    <p className="text-xs text-gray-500 flex-shrink-0">{chat.timestamp}</p>
                </div>
                <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'text-gray-800 font-semibold' : 'text-gray-500'}`}>
                    {chat.lastMessage}
                </p>
            </div>
        </button>
    );
};