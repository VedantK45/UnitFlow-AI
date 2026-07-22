type ButtonProps = {
  text: string;
  onClick?:()=>void;
  disabled?:boolean;

};

export default function Button({
     text,
    onClick ,
    disabled
}: ButtonProps) {
  return (
    <button
    onClick={onClick}
    disabled={disabled}
      className="
      w-full
      rounded-xl
      bg-cyan-500
      py-3
      font-semibold
      transition
      hover:bg-cyan-400
      "
    >
      {text}
    </button>
  );
}