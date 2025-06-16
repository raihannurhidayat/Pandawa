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
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

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
            if (e.key === "Escape") onClose();
            else if (e.key === "ArrowLeft") goToPrevious();
            else if (e.key === "ArrowRight") goToNext();
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

    const goToNext = () =>
        setCurrentIndex((prev) => (prev + 1) % images.length);
    const goToPrevious = () =>
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    const goToImage = (index: number) => setCurrentIndex(index);

    if (!isOpen || images.length === 0) return null;
    const currentImage = images[currentIndex];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 bg-black/70 backdrop-blur-sm sm:p-4">
            {/* Overlay-close binder */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Mobile view: center image + carousel */}
            <div className="flex flex-col items-center justify-between w-full h-screen sm:hidden">
                {/* Close */}
                <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={onClose}
                    className="z-10 self-end m-4"
                >
                    <X className="w-5 h-5" />
                </Button>

                {/* Main Image */}
                <img
                    src={currentImage.url}
                    alt={currentImage.filename}
                    className="max-h-[60vh] max-w-full px-4 object-contain"
                />

                {/* Carousel */}
                <ScrollArea className="absolute w-screen p-2 space-y-2 bottom-4">
                    {images.length > 1 && (
                        <div className="flex gap-2 px-2">
                            {images.map((image, idx) => (
                                <button
                                    key={image.id}
                                    onClick={() => goToImage(idx)}
                                    className={cn(
                                        "flex-shrink-0 rounded border-2 overflow-hidden",
                                        idx === currentIndex
                                            ? "border-blue-500"
                                            : "border-transparent hover:border-gray-300"
                                    )}
                                >
                                    <img
                                        src={image.url}
                                        alt={image.filename}
                                        className="object-cover w-16 h-12"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                    <ScrollBar className="px-2" orientation="horizontal" />
                </ScrollArea>
            </div>

            {/* Desktop view: Card layout */}
            <Card className="hidden z-10 sm:flex w-[80vw] h-[80vh] flex-col">
                <CardHeader className="p-0">
                    <div className="flex items-center justify-between p-4">
                        <h3 className="text-lg font-semibold truncate">
                            {currentImage.filename}
                        </h3>
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            onClick={onClose}
                        >
                            <X className="w-5 h-5 text-secondary-foreground" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="flex items-center justify-between flex-1 gap-4 p-4 py-2 overflow-auto bg-secondary">
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={goToPrevious}
                        className={cn(
                            "z-10 hover:scale-105",
                            images.length === 1 && "invisible"
                        )}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </Button>

                    <div className="flex flex-col items-center w-full h-full gap-2">
                        <div className="flex items-center justify-center flex-1 h-full max-h-full overflow-hidden">
                            <img
                                src={currentImage.url}
                                alt={currentImage.filename}
                                className="object-contain max-w-full max-h-full"
                            />
                        </div>

                        <Badge
                            variant={"secondary"}
                            className="w-fit"
                            size="md"
                        >
                            {currentIndex + 1} of {images.length}
                        </Badge>
                    </div>

                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={goToNext}
                        className={cn(
                            "z-10 hover:scale-105",
                            images.length === 1 && "invisible"
                        )}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </Button>
                </CardContent>

                <CardFooter className="p-0">
                    <ScrollArea className="w-full h-full p-2">
                        <div className="flex gap-2 p-2">
                            {images.map((image, index) => (
                                <button
                                    key={image.id}
                                    onClick={() => goToImage(index)}
                                    className={cn(
                                        "flex-shrink-0 relative overflow-hidden rounded-lg m-1",
                                        index === currentIndex
                                            ? "ring-2 ring-blue-500 shadow-lg"
                                            : "hover:shadow-md hover:scale-105"
                                    )}
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
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </CardFooter>
            </Card>
        </div>
    );
}

export default ImageGallery;
