import { ethers } from "ethers";
//import './Buy.css'; 

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
        <fieldset>
          <legend>User Data</legend>
            <label htmlFor="name">Name:</label><br />
            <input id="name" type="text" placeholder="Enter your name" required /><br />
            
            <label htmlFor="message">Message:</label><br />
            <input id="message" type="text" placeholder="Leave me a Message" required /><br />

            <label htmlFor="amount">Amount:</label><br />
            <input id="amount" type="number" placeholder="Enter ETH Amount" step="0.0000001" required /><br />

            <button type="submit">Pay</button>
            <button type="reset">Reset</button>
        </fieldset>
      </form>
    </>
  );
};

export default Buy;
