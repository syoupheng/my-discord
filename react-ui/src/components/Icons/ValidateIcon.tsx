type Props = {
  size?: number;
}

const ValidateIcon = ({ size = 24 }: Props) => {
  return (
    <svg aria-hidden="true" role="img" width={size} height={size} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"
      ></path>
    </svg>
  );
};

export default ValidateIcon;
