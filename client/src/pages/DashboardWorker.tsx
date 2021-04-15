import Cookies from "js-cookie";
import NavBar from "../components/NavComponent";
import WorkerCreatePost from "../components/Helper/WorkerCreatePost";
import AssignedClientBar from "../components/Client/AssignClientBar";
import WorkerApprovalRequest from "../components/Helper/WorkerApprovalRequest";

export default function DashboardWorker() {
  return (
    <div>
      {Cookies.get("user") ? (
        <div className="w-full h-screen flex flex-col">
          <NavBar />
          <div className="h-full">
            <div className="flex-col w-3/4">
              <WorkerCreatePost />
              <WorkerApprovalRequest />
            </div>
            {/* <AssignedClientBar /> */}
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-screen">
          <div className="bg-red-600 rounded-lg flex items-center flex-col justify-center w-1/2 h-1/3">
            <h1 className="text-yellow-300 text-xl">
              You are not Authenticated{" "}
            </h1>
            <h3 className="text-yellow-300 text-xl">Kindly, Go back.</h3>
          </div>
        </div>
      )}
    </div>
  );
}
