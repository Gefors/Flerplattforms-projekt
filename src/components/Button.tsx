interface Props {
  children: string;
  onClick: () => void;
  className?: string;
}

const Button = ({ className, children, onClick }: Props) => {
  return (
    <button className={className} onClick={onClick} type="button">
      {children}
    </button>
  );
};

export default Button;
