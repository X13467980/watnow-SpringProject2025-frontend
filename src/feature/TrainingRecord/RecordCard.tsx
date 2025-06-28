import React, { useState } from 'react';

export type MenuRecordProps = {
  menuId?: string;
  index: number;
  weight: string;
  reps: string;
  memo?: string;
  isOpen?: boolean;
  onChange: (weight: string, reps: string, memo?: string) => void;
};

const RecordCard: React.FC<MenuRecordProps> = ({
  index,
  weight,
  reps,
  memo = '',
  isOpen = false,
  onChange,
}) => {
  const [open, setOpen] = useState(isOpen);
  const [localMemo, setLocalMemo] = useState(memo);

  return (
    <div className="flex flex-col w-full max-w-md mb-2">
      <div className="flex">
        <div className="bg-white rounded-l-2xl flex items-center justify-center h-12 px-4 min-w-[48px] border-t-2 border-b-2 border-l-2 border-white">
          <span className="font-bold text-[#B31717] text-2xl">
            {index + 1}.
          </span>
        </div>
        <div
          className={
            `flex-1 bg-[#B31717] h-12 flex items-center pl-2 pr-10 border-t-2 border-b-2 border-r-2 border-white relative rounded-tr-2xl` +
            (open ? '' : ' rounded-br-2xl')
          }
        >
          <div className="flex flex-1 items-center gap-1 min-w-0">
            <input
              type="number"
              value={reps}
              onChange={(e) => onChange(weight, e.target.value, localMemo)}
              placeholder=""
              className="w-10 min-w-0 bg-transparent text-white text-sm font-bold text-center border-0 border-b-2 border-white focus:outline-none placeholder-white flex-shrink"
              style={{ background: 'transparent' }}
            />
            <span className="font-bold text-white text-sm ml-1 mr-2 flex-shrink-0">
              Times
            </span>
            <input
              type="number"
              value={weight}
              onChange={(e) => onChange(e.target.value, reps, localMemo)}
              placeholder=""
              className="w-10 min-w-0 bg-transparent text-white text-sm font-bold text-center border-0 border-b-2 border-white focus:outline-none placeholder-white flex-shrink"
              style={{ background: 'transparent' }}
            />
            <span className="font-bold text-white text-sm ml-1 flex-shrink-0">
              KG
            </span>
          </div>

          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-white rounded-full w-7 h-7 flex items-center justify-center border-2 border-[#a32d23] focus:outline-none"
            onClick={() => setOpen((prev) => !prev)}
            type="button"
          >
            <span className="text-[#B31717] text-base font-bold">
              {open ? '▲' : '▼'}
            </span>
          </button>
        </div>
      </div>
      {open && (
        <div className="bg-[#B31717] border-2 border-t-0 border-white rounded-b-2xl px-4 py-2 flex items-center">
          <label className="text-white font-bold text-base mr-2">Memo :</label>

          <input
            type="text"
            value={localMemo}
            onChange={(e) => {
              setLocalMemo(e.target.value);
              onChange(weight, reps, e.target.value);
            }}
            className="flex-1 bg-transparent border-0 border-b-2 border-white text-white text-sm outline-none placeholder-white"
            placeholder=""
          />
        </div>
      )}
    </div>
  );
};

export default RecordCard;
