import type { Location } from '../types';

// Expanded list of locations covering the DFW metroplex
const MOCK_LOCATIONS: Location[] = [
    { name: 'Downtown Dallas', coords: { latitude: 32.779167, longitude: -96.808891 } },
    { name: 'DFW Airport', coords: { latitude: 32.8998, longitude: -97.0423 } },
    { name: 'Dallas Love Field Airport', coords: { latitude: 32.8471, longitude: -96.8518 } },
    { name: 'Uptown Dallas', coords: { latitude: 32.803, longitude: -96.804 } },
    { name: 'Klyde Warren Park', coords: { latitude: 32.7892, longitude: -96.8023 } },
    { name: 'American Airlines Center', coords: { latitude: 32.7904, longitude: -96.8103 } },
    { name: 'Deep Ellum', coords: { latitude: 32.7816, longitude: -96.7821 } },
    { name: 'Bishop Arts District', coords: { latitude: 32.748, longitude: -96.831 } },
    { name: 'NorthPark Center', coords: { latitude: 32.868, longitude: -96.777 } },
    { name: 'Galleria Dallas', coords: { latitude: 32.932, longitude: -96.819 } },
    { name: 'AT&T Stadium (Arlington)', coords: { latitude: 32.747, longitude: -97.094 } },
    { name: 'Six Flags Over Texas (Arlington)', coords: { latitude: 32.755, longitude: -97.072 } },
    { name: 'Sundance Square (Fort Worth)', coords: { latitude: 32.754, longitude: -97.333 } },
    { name: 'Fort Worth Stockyards', coords: { latitude: 32.789, longitude: -97.348 } },
    { name: 'The Star (Frisco)', coords: { latitude: 33.095, longitude: -96.831 } },
    { name: 'Legacy West (Plano)', coords: { latitude: 33.078, longitude: -96.825 } },
    { name: 'Arbor Hills Nature Preserve (Plano)', coords: { latitude: 33.084, longitude: -96.853 } },
    { name: 'UNT Campus (Denton)', coords: { latitude: 33.211, longitude: -97.148 } },
    { name: 'Denton Square', coords: { latitude: 33.214, longitude: -97.132 } },
    { name: 'Southlake Town Square', coords: { latitude: 32.946, longitude: -97.135 } },
    { name: 'Grapevine Mills', coords: { latitude: 32.969, longitude: -97.041 } },
    { name: 'The Shops at Highland Village', coords: { latitude: 33.085, longitude: -97.054 } },
    { name: 'Texas Motor Speedway (Northlake)', coords: { latitude: 33.036, longitude: -97.283 } },
    { name: 'Grandscape (The Colony)', coords: { latitude: 33.093, longitude: -96.862 } },
    
    // User-provided list of cities
    { name: 'Argyle', coords: { latitude: 33.116, longitude: -97.177 } },
    { name: 'Aubrey', coords: { latitude: 33.303, longitude: -96.982 } },
    { name: 'Bartonville', coords: { latitude: 33.072, longitude: -97.143 } },
    { name: 'Carrollton', coords: { latitude: 32.975, longitude: -96.889 } },
    { name: 'Celina', coords: { latitude: 33.321, longitude: -96.781 } },
    { name: 'Coppell', coords: { latitude: 32.956, longitude: -96.987 } },
    { name: 'Copper Canyon', coords: { latitude: 33.088, longitude: -97.090 } },
    { name: 'Corinth', coords: { latitude: 33.146, longitude: -97.069 } },
    { name: 'Dallas', coords: { latitude: 32.7767, longitude: -96.7970 } },
    { name: 'Double Oak', coords: { latitude: 33.075, longitude: -97.075 } },
    { name: 'Dish', coords: { latitude: 33.064, longitude: -97.282 } },
    { name: 'Flower Mound', coords: { latitude: 33.015, longitude: -97.096 } },
    { name: 'Fort Worth', coords: { latitude: 32.7555, longitude: -97.3308 } },
    { name: 'Frisco', coords: { latitude: 33.1507, longitude: -96.8236 } },
    { name: 'Grapevine', coords: { latitude: 32.934, longitude: -97.078 } },
    { name: 'Hackberry', coords: { latitude: 33.099, longitude: -96.937 } },
    { name: 'Hickory Creek', coords: { latitude: 33.111, longitude: -97.027 } },
    { name: 'Highland Village', coords: { latitude: 33.088, longitude: -97.054 } },
    { name: 'Justin', coords: { latitude: 33.085, longitude: -97.295 } },
    { name: 'Krum', coords: { latitude: 33.262, longitude: -97.235 } },
    { name: 'Krugerville', coords: { latitude: 33.275, longitude: -96.986 } },
    { name: 'Lake Dallas', coords: { latitude: 33.120, longitude: -97.014 } },
    { name: 'Lewisville', coords: { latitude: 33.045, longitude: -96.998 } },
    { name: 'Little Elm', coords: { latitude: 33.164, longitude: -96.932 } },
    { name: 'Northlake', coords: { latitude: 33.056, longitude: -97.262 } },
    { name: 'Oak Point', coords: { latitude: 33.166, longitude: -96.993 } },
    { name: 'Pilot Point', coords: { latitude: 33.395, longitude: -96.960 } },
    { name: 'Plano', coords: { latitude: 33.0198, longitude: -96.6989 } },
    { name: 'Ponder', coords: { latitude: 33.181, longitude: -97.287 } },
    { name: 'Prosper', coords: { latitude: 33.236, longitude: -96.804 } },
    { name: 'Roanoke', coords: { latitude: 32.999, longitude: -97.227 } },
    { name: 'Sanger', coords: { latitude: 33.363, longitude: -97.175 } },
    { name: 'Shady Shores', coords: { latitude: 33.136, longitude: -97.037 } },
    { name: 'Southlake', coords: { latitude: 32.942, longitude: -97.127 } },
    { name: 'The Colony', coords: { latitude: 33.088, longitude: -96.885 } },
];

export const getAutocompleteSuggestions = async (query: string): Promise<Location[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 150));
    
    if (!query) {
        return [];
    }
    
    const lowerCaseQuery = query.toLowerCase();
    
    return MOCK_LOCATIONS.filter(location => 
        location.name.toLowerCase().includes(lowerCaseQuery)
    ).slice(0, 7); // Return a max of 7 suggestions
};