import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = {
    name: string;
};

type ResponseType = Id<"workspaces"> | null;

type Options = {
    onSuccess?: (data: ResponseType) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    throwOnError?: boolean;
};

export const useCreateWorkspace = () => {
    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<"idle" | "pending" | "success" | "error" | "settled">("idle");

    const isPending = useMemo(() => status === "pending", [status]);
    const isSuccess = useMemo(() => status === "success", [status]);
    const isError = useMemo(() => status === "error", [status]);
    const isSettled = useMemo(() => status === "settled", [status]);

    const mutation = useMutation(api.workspaces.create);
    
    const mutate = useCallback(async (values: RequestType, options?: Options) => {
        const { onSuccess, onError, onSettled, throwOnError = false } = options || {};
        try {
            setData(null);
            setError(null);
            setStatus("pending");

            const response = await mutation(values);
            onSuccess?.(response);
            return response;
        } catch (error) {
            onError?.(error as Error);
            if (throwOnError) {
                throw error;
            }
        } finally {
            setStatus("settled");
            onSettled?.();
        }
    }, [mutation]);

    return { 
        mutate, 
        data, 
        error, 
        isPending, 
        isSuccess, 
        isError, 
        isSettled 
    };
};
