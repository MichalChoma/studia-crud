const IconArrow = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <svg
      width="10"
      height="6"
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        isOpen ? "rotate-180" : "rotate-0"
      } transition ease-in-out delay-150`}
    >
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        d="m1 1 4 4 4-4"
      />
    </svg>
  );
};

export default IconArrow;
