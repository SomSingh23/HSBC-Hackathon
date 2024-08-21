import axios from "axios";
let handleClick = async () => {
  let data = await axios.get("http://localhost:3001");
  console.log(data);
};
function App() {
  return (
    <>
      <h1>HSBC | T-Hub</h1>
      <button onClick={handleClick}>call the server</button>
    </>
  );
}

export default App;
