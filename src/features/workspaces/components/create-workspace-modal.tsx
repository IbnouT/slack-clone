"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export const CreateWorkspaceModal = () => {
    const router = useRouter();
    
    const [ name, setName ] = useState("");
    
    const [ open, setOpen ] = useCreateWorkspaceModal();

    const { mutate, isPending } = useCreateWorkspace();

    const handleClose = () => {
        setName("");
        setOpen(false);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        mutate({ name }, {
            onSuccess: (id) => {
                toast.success("Workspace created successfully");
                router.push(`/workspace/${id}`);
                handleClose();
            },
            
        });
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a Workspace</DialogTitle>
                    <DialogDescription>
                        Create a new workspace to get started
                    </DialogDescription>
                </DialogHeader> 
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isPending}
                        minLength={3}
                        placeholder="Workspace name, e.g. 'Work', 'Personal', 'Home'"
                        required
                        autoFocus
                    />
                    <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Creating..." : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
