import SignupForm from '../components/SignupFormComponent'

function Signup() {
  return (
    <div>
      <div className="flex float-left">
        <img
          className="h-full w-4/5 sm:h-full md:h-screen lg:w-96 lg:h-screen rounded-r-2xl"
          src="https://images.unsplash.com/photo-1613608698681-47e441065aa0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          alt=""
        ></img>
        <div className="px-2 py-2 shadow-inner bg-blur-md bg-brightness-75 sm:p-6 rounded-xl -ml-72 mt-28 h-full w-72 text-white">
          <div className="pt-12 text-3xl font-extrabold">
            Find your perfect Utility helper
          </div>
          <div className="pt-12 text-5xl font-bold">In a single Click</div>
          <div className="pt-5 text-xs">
            Already a member?{" "}
            <a className="font-bold" href="http://localhost:3000/login">
              Sign in
            </a>
          </div>
        </div>
      </div>
      <SignupForm />
    </div>
  );
}

export default Signup;
