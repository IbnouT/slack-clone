interface WorkspacePageProps {
    params: {
        workspaceId: string;
    }
}

const WorkspacePage = async ({ params }: WorkspacePageProps) => {
    const { workspaceId } = await params;

    return (
        <div>
            <h1>WorkspacePage</h1>
            <p>{workspaceId}</p>
        </div>
    )
}   

export default WorkspacePage;