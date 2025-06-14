import { useState, useCallback, ChangeEvent } from "react";
import {
    DEFAULT_MAX_SIZE,
    getAcceptedTypes,
    validateFile,
    UploadRule,
} from "@/forms/upload";

export interface FileUploadOptions {
    /** Override maxSize (bytes) */
    maxSize?: number;
    /** Additional MIME types */
    extraTypes?: string[];
}

/**
 * useFileUpload: hook for file input with preset + override rules
 * @param presets - array of type keys ("image", "document") or explicit MIME strings
 * @param options - optional overrides for maxSize or extraTypes
 */
export function useFileUpload(
    presets: string[],
    options: FileUploadOptions = {}
) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const rules: UploadRule = {
        maxSize: options.maxSize ?? DEFAULT_MAX_SIZE,
        acceptedTypes: getAcceptedTypes(presets, options.extraTypes),
    };

    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const selected = e.target.files?.[0] ?? null;
            if (!selected) {
                setFile(null);
                setError(null);
                return;
            }
            const err = validateFile(selected, rules);
            if (err) {
                setFile(null);
                setError(err);
            } else {
                setFile(selected);
                setError(null);
            }
        },
        [rules]
    );

    return { file, error, onChange };
}
