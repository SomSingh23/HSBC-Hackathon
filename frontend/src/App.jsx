import { Suspense } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useLoaderData, Await } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
// let handleClick = async () => {
//   let data = await axios.get("http://localhost:3001");
//   console.log(data);
// };
function App() {
  let { role } = useLoaderData();
  let navigate = useNavigate();
  return (
    <>
      <Suspense
        fallback={
          <div>
            <ThreeDots
              visible={true}
              height="120"
              width="120"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
            />
          </div>
        }
      >
        <Await resolve={role}>
          {(role) => {
            if (role === "hsbc") {
              return (
                <>
                  <h1>IT's HSBC</h1>
                </>
              );
            }
            if (role === "noRole") {
              navigate("/login/google/auth");
            }
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default App;
