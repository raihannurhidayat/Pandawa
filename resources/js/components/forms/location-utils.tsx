import type React from "react";

import { useState, useEffect, useRef } from "react";
import { MapPin, X, Navigation, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Coordinates {
    lat: number;
    lng: number;
}

interface LocationInputProps {
    value?: Coordinates | null;
    onChange?: (coordinates: Coordinates | null) => void;
    placeholder?: string;
    defaultLocation?: Coordinates;
    className?: string;
    isEditable: boolean;
}

interface MapOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onLocationSelect: (coordinates: Coordinates) => void;
    initialLocation?: Coordinates;
    defaultLocation?: Coordinates;
    isEditable: boolean;
}

// Leaflet Map component
function MapOverlay({
    isOpen,
    onClose,
    onLocationSelect,
    initialLocation,
    defaultLocation,
    isEditable,
}: MapOverlayProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const [selectedCoords, setSelectedCoords] = useState<Coordinates | null>(
        initialLocation || null
    );
    const [locationName, setLocationName] = useState<string>("");
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    useEffect(() => {
        if (!isOpen || !mapRef.current) return;

        // Load Leaflet CSS and JS
        const loadLeaflet = async () => {
            // Load CSS
            if (!document.querySelector('link[href*="leaflet"]')) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                document.head.appendChild(link);
            }

            // Load JS
            if (!(window as any).L) {
                return new Promise((resolve) => {
                    const script = document.createElement("script");
                    script.src =
                        "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
                    script.onload = resolve;
                    document.head.appendChild(script);
                });
            }
        };

        const initMap = async () => {
            await loadLeaflet();

            const L = (window as any).L;
            const center = initialLocation ||
                defaultLocation || { lat: -6.2, lng: 106.8166 };

            // Initialize map
            const map = L.map(mapRef.current!).setView(
                [center.lat, center.lng],
                15
            );

            // Add OpenStreetMap tiles
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap contributors",
            }).addTo(map);

            mapInstanceRef.current = map;

            // Create marker if there's an initial location
            if (initialLocation) {
                const marker = L.marker(
                    [initialLocation.lat, initialLocation.lng],
                    {
                        draggable: true,
                    }
                ).addTo(map);
                markerRef.current = marker;

                // Handle marker drag
                marker.on("dragend", () => {
                    const position = marker.getLatLng();
                    const coords = {
                        lat: position.lat,
                        lng: position.lng,
                    };
                    setSelectedCoords(coords);
                    reverseGeocode(coords);
                });

                // Initial reverse geocoding
                reverseGeocode(initialLocation);
            }

            // Handle map clicks
            map.on("click", (e: any) => {
                const coords = {
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                };

                // Remove existing marker
                if (markerRef.current) {
                    map.removeLayer(markerRef.current);
                }

                // Create new marker
                const marker = L.marker([coords.lat, coords.lng], {
                    draggable: true,
                }).addTo(map);
                markerRef.current = marker;

                // Handle marker drag
                marker.on("dragend", () => {
                    const position = marker.getLatLng();
                    const newCoords = {
                        lat: position.lat,
                        lng: position.lng,
                    };
                    setSelectedCoords(newCoords);
                    reverseGeocode(newCoords);
                });

                setSelectedCoords(coords);
                reverseGeocode(coords);
            });
        };

        initMap();

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [isOpen, initialLocation, defaultLocation]);

    const reverseGeocode = async (coords: Coordinates) => {
        try {
            setIsLoadingLocation(true);
            // Using Nominatim (OpenStreetMap's geocoding service)
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}&zoom=18&addressdetails=1`
            );

            if (response.ok) {
                const data = await response.json();
                if (data.display_name) {
                    setLocationName(data.display_name);
                } else {
                    setLocationName("");
                }
            } else {
                setLocationName("");
            }
        } catch (error) {
            console.error("Reverse geocoding error:", error);
            setLocationName("");
        } finally {
            setIsLoadingLocation(false);
        }
    };

    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
            setIsLoadingLocation(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    if (mapInstanceRef.current) {
                        mapInstanceRef.current.setView(
                            [coords.lat, coords.lng],
                            15
                        );
                    }

                    // Remove existing marker
                    if (markerRef.current && mapInstanceRef.current) {
                        mapInstanceRef.current.removeLayer(markerRef.current);
                    }

                    // Create new marker
                    const L = (window as any).L;
                    const marker = L.marker([coords.lat, coords.lng], {
                        draggable: true,
                    }).addTo(mapInstanceRef.current);
                    markerRef.current = marker;

                    // Handle marker drag
                    marker.on("dragend", () => {
                        const position = marker.getLatLng();
                        const newCoords = {
                            lat: position.lat,
                            lng: position.lng,
                        };
                        setSelectedCoords(newCoords);
                        reverseGeocode(newCoords);
                    });

                    setSelectedCoords(coords);
                    reverseGeocode(coords);
                    setIsLoadingLocation(false);
                },
                (error) => {
                    console.error("Error getting current location:", error);
                    setIsLoadingLocation(false);
                }
            );
        }
    };

    const handleConfirm = () => {
        if (selectedCoords) {
            onLocationSelect(selectedCoords);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="bg-background -z-10">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-background">
                <h2 className="text-lg font-semibold">Select Location</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-5 w-5" />
                </Button>
            </div>

            {/* Map Container */}
            <div className="relative flex-1 h-[calc(100vh-140px)]">
                <div ref={mapRef} className="w-full h-full" />

                {/* Current Location Button */}
                <Button
                    onClick={handleUseCurrentLocation}
                    className="absolute top-4 right-4 shadow-lg"
                    size="icon"
                    disabled={isLoadingLocation}
                >
                    <Navigation
                        className={`h-4 w-4 ${
                            isLoadingLocation ? "animate-spin" : ""
                        }`}
                    />
                </Button>

                {/* Loading indicator */}
                {isLoadingLocation && (
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-md text-sm">
                        Loading location...
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-background">
                {selectedCoords && (
                    <div className="mb-3 text-sm text-muted-foreground">
                        {locationName && (
                            <div className="font-medium text-foreground mb-1 text-xs leading-relaxed">
                                {locationName}
                            </div>
                        )}
                        <div>
                            Coordinates: {selectedCoords.lat.toFixed(6)},{" "}
                            {selectedCoords.lng.toFixed(6)}
                        </div>
                    </div>
                )}
                {isEditable && (
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            disabled={!selectedCoords}
                            className="flex-1"
                        >
                            Use this location
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function LocationInput({
    value,
    onChange,
    placeholder = "Click to select location",
    defaultLocation,
    isEditable,
    className = "",
}: LocationInputProps) {
    const [isMapOpen, setIsMapOpen] = useState(false);

    const handleLocationSelect = (coordinates: Coordinates) => {
        onChange?.(coordinates);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange?.(null);
    };

    const formatCoordinates = (coords: Coordinates) => {
        return `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`;
    };

    return (
        <>
            <div className={`relative ${className}`}>
                <div
                    onClick={() => setIsMapOpen(true)}
                    className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors min-h-[44px]"
                >
                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />

                    {value ? (
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                                Selected Location
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {formatCoordinates(value)}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 text-muted-foreground">
                            {placeholder}
                        </div>
                    )}

                    {value && isEditable && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 flex-shrink-0"
                            onClick={handleClear}
                        >
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    )}
                </div>

                {/* Small map preview */}
                {value && (
                    <div className="mt-2 h-20 bg-muted rounded border overflow-hidden relative">
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground bg-gradient-to-br from-green-50 to-blue-50">
                            <div className="text-center">
                                <MapPin className="h-4 w-4 mx-auto mb-1 text-green-600" />
                                <div className="font-mono">
                                    {formatCoordinates(value)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <MapOverlay
                isOpen={isMapOpen}
                onClose={() => setIsMapOpen(false)}
                onLocationSelect={handleLocationSelect}
                initialLocation={value || undefined}
                defaultLocation={defaultLocation}
                isEditable={isEditable}
            />
        </>
    );
}
