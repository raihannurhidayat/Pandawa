import React, { useState, useCallback, ChangeEvent } from "react";
import { Upload } from "lucide-react";
import {
    getAcceptedTypes,
    validateFile,
    DEFAULT_MAX_SIZE,
} from "@/forms/upload";
import { cn } from "@/lib/utils";

interface FileUploadProps {
    /** Callback when files change */
    onFilesChange?: (files: File[]) => void;
    /** Type presets (e.g. ["image","document"]) or explicit MIME */
    presets?: string[];
    /** Max file size in bytes */
    maxSize?: number;
    /** Extra MIME types */
    extraTypes?: string[];
    /** Show list of files */
    isShowList?: boolean;
    /** Maximum number of files allowed */
    maxFiles?: number;
}

function FileUpload({
    onFilesChange,
    presets = ["image", "document"],
    maxSize = DEFAULT_MAX_SIZE,
    extraTypes = [],
    isShowList = false,
    maxFiles = Infinity,
}: FileUploadProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);

    const acceptedTypes = getAcceptedTypes(presets, extraTypes);
    const isDisabled = files.length >= maxFiles;

    const processFiles = useCallback(
        (fileList: FileList) => {
            if (isDisabled) return;
            const valid: File[] = [];
            const errs: string[] = [];
            const availableSlots = Math.max(maxFiles - files.length, 0);
            Array.from(fileList)
                .slice(0, availableSlots)
                .forEach((file) => {
                    const err = validateFile(file, { maxSize, acceptedTypes });
                    if (err) errs.push(`${file.name}: ${err}`);
                    else valid.push(file);
                });
            setFiles(valid);
            setErrors(errs);
            onFilesChange?.(valid);
        },
        [
            acceptedTypes,
            files.length,
            maxFiles,
            maxSize,
            onFilesChange,
            isDisabled,
        ]
    );

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (isDisabled) return;
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        if (isDisabled) return;
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (isDisabled) return;
        setIsDragOver(false);
        if (e.dataTransfer.files) {
            processFiles(e.dataTransfer.files);
        }
    };

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (isDisabled) return;
        if (e.target.files) {
            processFiles(e.target.files);
        }
    };

    return (
        <div>
            <div
                className={cn(
                    "relative border-2 border-dashed rounded-lg p-6 text-center transition-all ease-in-out group",
                    isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer hover:border-primary",
                    isDragOver && !isDisabled && "bg-primary/10 border-primary"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* Invisible input covers entire drop area for click/tap */}
                <input
                    type="file"
                    multiple={maxFiles > 1}
                    disabled={isDisabled}
                    accept={acceptedTypes.join(",")}
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0"
                />
                <Upload
                    className={cn(
                        "w-12 h-12 mx-auto mb-4 transition-all ease-in-out text-zinc-800",
                        !isDisabled && "group-hover:text-primary",
                        isDragOver && !isDisabled && "text-primary"
                    )}
                />
                <div className="space-y-2">
                    <p className="text-sm">
                        {isDisabled
                            ? `Maximum of ${maxFiles} files reached`
                            : "Drag and drop files here, or browse"}
                    </p>
                    <p className="text-xs text-gray-500">
                        Supports: Images, PDF, DOC, DOCX (Max{" "}
                        {maxSize / (1024 * 1024)}MB each)
                    </p>
                </div>
            </div>
            {errors.length > 0 && (
                <div className="mt-2 text-sm text-destructive">
                    {errors.map((err) => (
                        <p key={err}>{err}</p>
                    ))}
                </div>
            )}
            {isShowList && files.length > 0 && (
                <ul className="mt-2 text-sm list-disc list-inside">
                    {files.map((file) => (
                        <li key={file.name}>{file.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FileUpload;
