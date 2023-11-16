import { useState, useEffect } from "react";
import './Memos.css'; 

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      // Sort memos array in descending order by date
      const sortedMemos = [...memos].sort((a, b) => b.time - a.time);
      setMemos(sortedMemos);
    };
    contract && memosMessage();
  }, [contract]);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Message</th>
          <th>Time</th>
          <th>From</th>
        </tr>
      </thead>
      <tbody>
        {memos.map((memo, index) => (
          <tr key={index}>
            <td>{memo.name}</td>
            <td>{memo.message}</td>
            <td>{new Date(memo.time * 1000).toLocaleString()}</td>
            <td>{memo.from}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Memos;