interface WorkoutApplicationProps {
    children?: React.ReactNode;
}

function WorkoutApplicaton({ children }: WorkoutApplicationProps) {
    return (
        <div className="bg-gray-50">
            {children}
        </div>
    );
}

export default WorkoutApplicaton;