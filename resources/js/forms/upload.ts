export interface UploadRule {
  /** Maximum file size in bytes */
  maxSize: number;
  /** Allowed MIME types */
  acceptedTypes: string[];
}

/** Default max size: 2 MB */
export const DEFAULT_MAX_SIZE = 2 * 1024 * 1024;

/** Preset type mappings */
export const TYPE_MAP: Record<string, string[]> = {
  image: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp"
  ],
  document: [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ]
};

/**
 * Build a full list of accepted types from presets and explicit MIME strings
 */
export function getAcceptedTypes(presets: string[], extraTypes: string[] = []): string[] {
  const types = presets.reduce<string[]>((acc, p) => {
    if (TYPE_MAP[p]) {
      return acc.concat(TYPE_MAP[p]);
    }
    // treat unknown as explicit MIME
    return acc.concat(p);
  }, []);
  return Array.from(new Set([...types, ...extraTypes]));
}

/**
 * Validates a File against given rules.
 * @returns `null` if valid, or an error message string.
 */
export function validateFile(file: File, rules: UploadRule): string | null {
  if (file.size > rules.maxSize) {
    const mb = (rules.maxSize / 1024 / 1024).toFixed(2);
    return `File is too large. Max size is ${mb} MB.`;
  }
  if (!rules.acceptedTypes.includes(file.type)) {
    const exts = rules.acceptedTypes.map(t => t.split("/")[1]).join(", ");
    return `Invalid file type. Only ${exts} allowed.`;
  }
  return null;
}
