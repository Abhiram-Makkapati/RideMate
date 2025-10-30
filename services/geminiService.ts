import { GoogleGenAI } from "@google/genai";
import type { Ride, LatLng } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export async function findRides(
    from: string,
    to: string,
    userLocation: LatLng
): Promise<{rides: Ride[], groundingChunks: any[]}> {
    const prompt = `
    You are a ride-sharing assistant for the Dallas-Fort Worth metroplex community.
    Find carpool rides from "${from}" to "${to}". The user is currently at latitude ${userLocation.latitude} and longitude ${userLocation.longitude}.
    Based on this, generate a realistic list of 3-5 available rides.
    
    For each ride, provide the following details in a JSON object:
    - id: A unique string identifier (e.g., "ride-123").
    - driver: An object with name (string), avatar (a URL string from picsum.photos), rating (number between 4.5 and 5.0 with one decimal place), and vehicle (object with make, model, color, licensePlate strings).
    - route: An object with 'from' and 'to' strings, matching the user's query.
    - startCoords: An object with latitude and longitude (number) near the 'from' location.
    - endCoords: An object with latitude and longitude (number) near the 'to' location.
    - departureTimestamp: An ISO 8601 string for a plausible time in the near future (e.g., within the next few hours).
    - arrivalTimestamp: An ISO 8601 string, a reasonable duration after the departure time.
    - availableSeats: An integer between 1 and 4.
    - price: A string representing the cost, e.g., "$5".
    - eta: A string describing the estimated time of arrival for pickup, e.g., "in 15 mins".
    
    Return ONLY a single JSON object in a markdown code block with the key "rides", which is an array of these ride objects.
    Do not include any other text or explanation.
    Example output format:
    \`\`\`json
    {
      "rides": [
        {
          "id": "ride-1",
          "driver": {
            "name": "Jane D.",
            "avatar": "https://picsum.photos/seed/jane/100/100",
            "rating": 4.9,
            "vehicle": {
              "make": "Toyota",
              "model": "Camry",
              "color": "Silver",
              "licensePlate": "DFW-123"
            }
          },
          "route": { "from": "Downtown Dallas", "to": "DFW Airport" },
          "startCoords": { "latitude": 32.7767, "longitude": -96.7970 },
          "endCoords": { "latitude": 32.8998, "longitude": -97.0423 },
          "departureTimestamp": "2024-07-28T17:30:00Z",
          "arrivalTimestamp": "2024-07-28T17:45:00Z",
          "availableSeats": 2,
          "price": "$15",
          "eta": "in 10 mins"
        }
      ]
    }
    \`\`\`
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleMaps: {} }],
                toolConfig: {
                    retrievalConfig: {
                        latLng: userLocation
                    }
                }
            },
        });

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        
        let text = response.text.trim();
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
        
        if (jsonMatch && jsonMatch[1]) {
            text = jsonMatch[1];
        }

        const result = JSON.parse(text);
        return { rides: result.rides || [], groundingChunks };

    } catch (e) {
        console.error("Failed to find rides with Gemini:", e);
        return { rides: [], groundingChunks: [] };
    }
}