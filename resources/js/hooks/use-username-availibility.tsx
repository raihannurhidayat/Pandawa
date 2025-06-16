import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "@uidotdev/usehooks";

/**
 * Custom hook to check username availability.
 * @param username - the raw username input
 * @returns { available: boolean|null, checking: boolean, debouncedUsername: string }
 */
export function useUsernameAvailability(username: string) {
    const [available, setAvailable] = useState<boolean | null>(null);
    const [checking, setChecking] = useState(false);
    const debouncedUsername = useDebounce(username, 500);

    useEffect(() => {
        async function check() {
            if (!debouncedUsername) {
                return;
            }
            setChecking(true);
            try {
                const res = await axios.get(route("username.check"), {
                    params: { username: debouncedUsername },
                });
                setAvailable(res.data.available);
            } catch {
                setAvailable(null);
            } finally {
                setChecking(false);
            }
        }
        check();
    }, [debouncedUsername]);

    return { available, checking, debouncedUsername };
}
