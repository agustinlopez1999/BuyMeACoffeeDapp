import { ethers } from "ethers";
import './Buy.css'; 

const Buy = ({ state }) => {
  const buyCoffee = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    const amount = { value: ethers.utils.parseEther(document.querySelector("#amount").value) };
    const transaction = await contract.buyCoffee(name, message, amount);
    await transaction.wait();
    alert("Transaction Successful");
    window.location.reload();
  };

  return (
    <>
      <form onSubmit={buyCoffee}>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" required />
        
        <label htmlFor="message">Message:</label>
        <input id="message" type="text" required />

        <label htmlFor="amount">Amount (ETH):</label>
        <input id="amount" type="number" step="0.0000001" required />

        <button type="submit">Pay</button>
      </form>
    </>
  );
};

export default Buy;
