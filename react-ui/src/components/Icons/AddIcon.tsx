type Props = {
  size?: number;
}

const AddIcon = ({ size = 24 }: Props) => {
  return (
    <svg x="0" y="0" aria-hidden="true" role="img" width={size} height={size} viewBox="0 0 18 18">
      <polygon fillRule="nonzero" fill="currentColor" points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
    </svg>
  );
};

export default AddIcon;
