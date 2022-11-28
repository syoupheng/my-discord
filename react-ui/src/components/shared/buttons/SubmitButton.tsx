interface Props {
  value: string
}

const SubmitButton = ({ value }: Props) => {
  return (
    <input
      type="submit"
      value={value}
      className="bg-blue hover:bg-blue-hov transition ease-in-out duration-150 text-white w-full rounded-sm h-11 text-[15.3px] cursor-pointer"
    />
  );
}
 
export default SubmitButton;