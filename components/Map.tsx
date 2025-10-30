import React, { useState, useEffect } from 'react';
import type { Ride } from '../types';
import { Car } from 'lucide-react';

interface MapProps {
    ride: Ride;
    onEtaChange: (eta: string) => void;
}

// Linear interpolation function
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const Map: React.FC<MapProps> = ({ ride, onEtaChange }) => {
    const { startCoords, endCoords } = ride;
    const [progress, setProgress] = useState(0); // 0 to 1

    useEffect(() => {
        const totalDurationSeconds = 15 * 60; // Simulate a 15-minute ride for demo
        const intervalTime = 100; // update every 100ms
        const totalSteps = totalDurationSeconds * 1000 / intervalTime;
        
        let step = 0;

        const interval = setInterval(() => {
            step++;
            const currentProgress = Math.min(step / totalSteps, 1);
            setProgress(currentProgress);
            
            const remainingSeconds = totalDurationSeconds * (1 - currentProgress);
            const remainingMinutes = Math.ceil(remainingSeconds / 60);

            if (remainingMinutes > 1) {
                 onEtaChange(`in ${remainingMinutes} mins`);
            } else if (remainingMinutes === 1) {
                 onEtaChange(`in 1 min`);
            } else {
                 onEtaChange(`arriving now`);
            }

            if (currentProgress >= 1) {
                clearInterval(interval);
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, [ride, onEtaChange]);

    const currentLat = lerp(startCoords.latitude, endCoords.latitude, progress);
    const currentLng = lerp(startCoords.longitude, endCoords.longitude, progress);

    // Calculate map bounds and center for Static API
    const centerLat = (startCoords.latitude + endCoords.latitude) / 2;
    const centerLng = (startCoords.longitude + endCoords.longitude) / 2;
    
    // Construct Google Maps Static API URL
    const apiKey = process.env.API_KEY;
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${centerLat},${centerLng}&size=600x400&maptype=roadmap&markers=color:green%7Clabel:A%7C${startCoords.latitude},${startCoords.longitude}&markers=color:red%7Clabel:B%7C${endCoords.latitude},${endCoords.longitude}&path=color:0x4F46E5FF%7Cweight:5%7C${startCoords.latitude},${startCoords.longitude}%7C${endCoords.latitude},${endCoords.longitude}&key=${apiKey}`;

    // Function to convert lat/lng to percentage for positioning the car icon
    // This is a simplified projection for this specific view.
    const getPositionStyle = (lat: number, lng: number) => {
        const latPercent = ((lat - endCoords.latitude) / (startCoords.latitude - endCoords.latitude)) * 100;
        const lngPercent = ((lng - startCoords.longitude) / (endCoords.longitude - startCoords.longitude)) * 100;
        return {
            top: `${latPercent}%`,
            left: `${lngPercent}%`,
        };
    };
    
    const carStyle = getPositionStyle(currentLat, currentLng);

    return (
        <div 
            className="w-full h-full bg-cover bg-center relative" 
            style={{ backgroundImage: `url(${mapUrl})` }}
            aria-label="Map showing ride route"
        >
           {/* Car Icon */}
           <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-linear"
            style={carStyle}
           >
                <div className="p-1.5 bg-primary rounded-full shadow-lg">
                    <Car className="h-5 w-5 text-white" />
                </div>
           </div>
        </div>
    );
};
