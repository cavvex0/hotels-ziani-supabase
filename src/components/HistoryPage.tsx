"use client";

import { HistoryType } from "../schema/historySchema";

type Props = {
  history: HistoryType[];
};
const HistoryPage = ({ history }: Props) => {
    console.log(history)
  return <div className="">HistoryPage</div>;
};

export default HistoryPage;
