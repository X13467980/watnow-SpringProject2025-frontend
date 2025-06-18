"use client";
import React, { useState } from "react";
import Footer from "@/feature/Footer/Footer";
import Header from "@/feature/Header/Header";
import { useSearchParams } from "next/navigation";

type SetInput = {
  weight: number | null;
  count: number | null;
  memo: string;
};

export default function RecordPage({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const searchParamsClient = useSearchParams();
  const menuName = searchParamsClient.get("menuName") || "メニュー未指定";
  const part = searchParamsClient.get("part") || "部位未指定";
  const machineId = parseInt(searchParams.get("machineId") || "0", 10);

  const [sets, setSets] = useState<SetInput[]>([
    { weight: null, count: null, memo: "" },
    { weight: null, count: null, memo: "" },
    { weight: null, count: null, memo: "" },
    { weight: null, count: null, memo: "" },
  ]);

  const handleChange = (
    index: number,
    field: keyof SetInput,
    value: string
  ) => {
    const newSets = [...sets];
    if (field === "memo") {
      newSets[index][field] = value;
    } else {
      newSets[index][field] = value === "" ? null : parseFloat(value);
    }
    setSets(newSets);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/menus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menu: {
            name: menuName,
            part: part,
            machine_id: machineId, // クエリパラメータから取得したIDを使用
            count: sets[0].count,
            set_count: sets.length,
            time: null,
            weight: sets[0].weight,
          },
        }),
      });

      if (!res.ok) throw new Error("記録に失敗しました");
      const data = await res.json();
      alert("記録完了: " + data.message);
    } catch (err) {
      console.error(err);
      alert("記録エラー");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{menuName} 記録</h2>
      {sets.map((set, index) => (
        <div key={index} className="mb-4 border rounded p-2">
          <div>セット {index + 1}</div>
          <input
            type="number"
            placeholder="重さ (kg)"
            value={set.weight ?? ""}
            onChange={(e) => handleChange(index, "weight", e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <input
            type="number"
            placeholder="回数"
            value={set.count ?? ""}
            onChange={(e) => handleChange(index, "count", e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <input
            type="text"
            placeholder="メモ"
            value={set.memo}
            onChange={(e) => handleChange(index, "memo", e.target.value)}
            className="border px-2 py-1 mt-2 w-full"
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        記録する
      </button>
    </div>
  );
}
