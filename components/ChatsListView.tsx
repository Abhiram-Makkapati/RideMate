import React from 'react';
import type { ChatSummary, Driver } from '../types';
import { ChatListItem } from './ChatListItem';

const mockChats: ChatSummary[] = [
    {
        id: 'c1',
        partner: { name: 'Jane D.', avatar: 'https://picsum.photos/seed/Jane/100/100', rating: 4.9 },
        lastMessage: 'Sounds good, thanks!',
        timestamp: '8:41 AM',
        unreadCount: 0,
    },
    {
        id: 'c2',
        partner: { name: 'John K.', avatar: 'https://picsum.photos/seed/john/100/100', rating: 4.7 },
        lastMessage: 'Are you still coming?',
        timestamp: 'Yesterday',
        unreadCount: 2,
    },
    {
        id: 'c3',
        partner: { name: 'David C.', avatar: 'https://picsum.photos/seed/david/100/100', rating: 4.8 },
        lastMessage: 'Great, thanks for the ride!',
        timestamp: '2 days ago',
        unreadCount: 0,
    },
];

interface ChatsListViewProps {
    onSelectChat: (partner: Driver) => void;
}

export const ChatsListView: React.FC<ChatsListViewProps> = ({ onSelectChat }) => {
    return (
        <div className="animate-fade-in">
            <div className="p-6 bg-white rounded-xl shadow-lg">
                 <h2 className="text-3xl font-bold text-gray-800 mb-4">Chats</h2>
                 <div className="space-y-2">
                    {mockChats.length > 0 ? (
                        mockChats.map(chat => (
                            <ChatListItem 
                                key={chat.id} 
                                chat={chat} 
                                onClick={() => onSelectChat(chat.partner)} 
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-8">You have no active chats.</p>
                    )}
                 </div>
            </div>
        </div>
    );
};
