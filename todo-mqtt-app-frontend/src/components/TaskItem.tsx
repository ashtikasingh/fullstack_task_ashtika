interface TaskItemProps {
    id: string;
    content: string;
    createdAt: string;
}

const TaskItem = ({ content, createdAt }: TaskItemProps) => {
    return (
        <div className="border-b py-2 px-2 text-gray-800">
            <div className="text-base">{content}</div>
            <div className="text-xs text-gray-500">{new Date(createdAt).toLocaleString()}</div>
        </div>
    );
};

export default TaskItem;
