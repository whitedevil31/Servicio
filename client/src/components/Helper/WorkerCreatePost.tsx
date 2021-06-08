import WorkerPostModal from "./WorkerPostModal";

export default function WorkerPost() {
  return (
    <div
      className="flex bg-gray-100 ml-6 mt-4 h-40 p-5 shadow-2xl sm:rounded-1xl border-b-4 
               border-green-800 
               transition duration-300 ease-in-out hover:scale-y-125 hover:shadow-inner hover:bg-gray-200
               "
    >
      <div className="flex flex-col">
        <p className="px-4 py-4">Hey, Let's Get you started.</p>
        <WorkerPostModal />
      </div>
    </div>
  );
}
