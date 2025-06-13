import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Attachment } from "@/types/issue";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function ImageGallery({
    images = [],
    isOpen = false,
    onClose = () => {},
    initialIndex = 0,
}: {
    images: Attachment[];
    isOpen?: boolean;
    onClose?: () => void;
    initialIndex?: number;
}) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "ArrowLeft") {
                goToPrevious();
            } else if (e.key === "ArrowRight") {
                goToNext();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, currentIndex]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToImage = (index: number) => {
        setCurrentIndex(index);
    };

    if (!isOpen || images.length === 0) return null;

    const currentImage = images[currentIndex];

    console.log(currentImage);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm">
            {/* Overlay - click to close */}
            <div
                className="absolute inset-0 cursor-pointer"
                onClick={onClose}
            />

            <Card className="w-[80%] h-[80%]">
                <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold truncate">
                        {currentImage.filename}
                    </h3>
                    <Button
                        onClick={onClose}
                        className="p-3 transition-colors rounded-full bg-muted hover:bg-muted-foreground"
                    >
                        <X className="w-5 h-5 text-secondary-foreground" />
                    </Button>
                </CardHeader>
                <CardContent className="relative flex items-center justify-between w-full max-h-full p-4 bg-gray-100">
                    <Button
                        onClick={goToPrevious}
                        className={cn(
                            "z-10 p-3 transition-all ease-in-out rounded-full bg-secondary hover:bg-secondary/90 hover:scale-105",
                            images.length === 1 && "invisible"
                        )}
                    >
                        <ChevronLeft className="w-6 h-6 text-black" />
                    </Button>

                    <div className="h-[505px]">
                        <img
                            src={currentImage.url}
                            alt={currentImage.filename}
                            className="object-contain w-auto h-full"
                        />
                    </div>

                    <Button
                        onClick={goToNext}
                        className={cn(
                            "z-10 p-3 transition-all ease-in-out rounded-full bg-secondary hover:bg-secondary/90 hover:scale-105",
                            images.length === 1 && "invisible"
                        )}
                    >
                        <ChevronRight className="w-6 h-6 text-black" />
                    </Button>

                    {/* Image Counter */}
                    <Badge className="absolute px-3 py-1 text-sm select-none top-4 right-4">
                        {currentIndex + 1} of {images.length}
                    </Badge>
                </CardContent>

                {images.length > 1 && (
                    <CardFooter className="flex gap-2 p-4 overflow-x-auto border-t">
                        {images.map((image, index) => (
                            <button
                                key={image.id}
                                onClick={() => goToImage(index)}
                                className={`flex-shrink-0 relative overflow-hidden rounded-lg transition-all m-1 ${
                                    index === currentIndex
                                        ? "ring-2 ring-blue-500 shadow-lg"
                                        : "hover:shadow-md hover:scale-105"
                                }`}
                            >
                                <img
                                    src={image.url}
                                    alt={image.filename}
                                    className="object-cover w-16 h-12"
                                />
                                {index === currentIndex && (
                                    <div className="absolute inset-0 bg-blue-500/20" />
                                )}
                            </button>
                        ))}
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}

export default ImageGallery;
