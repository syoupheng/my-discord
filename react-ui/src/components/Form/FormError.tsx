type Props = {
  message: string
}

const FormError = ({ message }: Props) => {
  return (
    <div className="uppercase text-xs font-bold text-danger mt-2 text-center">
      {message}
    </div>
  );
}
 
export default FormError;