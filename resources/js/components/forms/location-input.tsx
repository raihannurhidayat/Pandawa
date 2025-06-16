import { useState } from "react";
import LocationInput from "./location-utils";
import { Button } from "@/components/ui/button";

export interface Coordinates {
    lat: number;
    lng: number;
}

type LocationINputDemoProps = {
    formData: {
        location: Coordinates | null;
    };

    setFormData: React.Dispatch<
        React.SetStateAction<{
            location: Coordinates | null;
        }>
    >;
};

export default function LocationInputDemo({
    formData,
    setFormData,
}: LocationINputDemoProps) {
    // Default location (Jakarta, Indonesia)
    const defaultLocation = { lat: -6.2, lng: 106.8166 };

    // const handleSubmit = () => {
    //     console.log("Form submitted:", formData);
    //     alert(
    //         `Form submitted with location: ${
    //             formData.location
    //                 ? `${formData.location.lat.toFixed(
    //                       6
    //                   )}, ${formData.location.lng.toFixed(6)}`
    //                 : "No location selected"
    //         }`
    //     );
    // };

    return (
        <div className="w-full space-y-6">
            {/* Input  */}
            <div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Koordinat Lokasi * {JSON.stringify(formData?.location)}
                        </label>
                        <LocationInput
                            value={formData?.location}
                            onChange={(coords) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    location: coords,
                                }))
                            }
                            isEditable={true}
                            defaultLocation={defaultLocation}
                            placeholder="Click to select your location"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
