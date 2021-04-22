export default function AssignedClientBar() {
  return (
    <div className="w-1/5 ml-36 bg-gray-100 rounded-md h-96 shadow-2xl transition duration-400 ease-in-out hover:scale-y-125 hover:bg-gray-200 ">
      <div className="px-5 py-5">
      <div className="mb-3 font-bold">Assigned To:</div>
        {/* {assignee.map((obj) => ( */}
        <div className="flex px-5 py-5 bg-indigo-100 rounded-xl mt-6 w-full hover:bg-indigo-200 shadow-inner">
          <div className="flex flex-col float-left"><b>Thala</b></div>
          <a className="flex flex-col float-right ml-24 mt-2 cursor-pointer">
            <i className="far fa-comments"></i>
          </a>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
}
