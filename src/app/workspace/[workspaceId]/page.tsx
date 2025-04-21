"use client";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Skeleton } from "@/components/ui/skeleton";
const WorkspacePage = () => {
    const workspaceId = useWorkspaceId();
    const { data, isLoading } = useGetWorkspace({ id: workspaceId });

    if (isLoading) {
        return <Skeleton className="h-full w-full" />
    }

    if (!workspaceId) {
        return <div>Workspace not found</div>;
    }

    return (
        <div>
            Data: {JSON.stringify(data)}
        </div>
    )
}   

export default WorkspacePage;