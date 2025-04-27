
interface inputBoxProps{
    label:string
    placeholder:string
    onchangeFun:()=>void
    type:string
}

const InputBox = ({
    label,
    placeholder,
    onchangeFun,
    type
}:inputBoxProps) => {
  return (
    <div className="mx-2 my-3">
    <span className="text-black font-medium">{label}</span>
    <input type={type}
    placeholder={placeholder}
    onChange={onchangeFun}
    className="w-full border-2 border-zinc-400 rounded-md px-2 py-1 text-zinc-800"
    />
    </div>
  )
};

export default InputBox;
