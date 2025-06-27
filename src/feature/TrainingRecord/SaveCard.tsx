import React from "react";

type Props = {
  onClick?: () => void;
};

const SaveCard: React.FC<Props> = ({ onClick }) => (
  <button
    className="w-full bg-white rounded-full py-3 text-[#a32d23] font-bold text-xl text-center transition active:opacity-80"
    onClick={onClick}
    type="button"
  >
    Save Result
  </button>
);

export default SaveCard;