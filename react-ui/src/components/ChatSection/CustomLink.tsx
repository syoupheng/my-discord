interface LinkProps {
  href: string;
}

const CustomLink = ({ href }: LinkProps) => {
  return (
    <a className="text-link hover:underline" href={href} title={href} target="_blank" rel="noreferrer noopener" role="button" tabIndex={0}>
      {href}
    </a>
  );
};

export default CustomLink;
