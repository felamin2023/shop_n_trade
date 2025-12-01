const SigninPage = () => {
  return (
    <div className="h-screen w-full flex justify-around px-32 items-center bg-[radial-gradient(ellipse_800px_800px_at_10%_-20%,_#588027_-10%,_#ffffff_90%)]">
      <div className="flex flex-col justify-around items-center border-[1px] border-black h-[48%] w-[40%] rounded-lg">
        <h1 className="text-[30px] font-noto font-bold text-black drop-shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
          Admin
        </h1>
        <div className="flex flex-col justify-between items-center  h-[50%] w-[85%]">
          <input
            type="text"
            placeholder="Username"
            className="bg-transparent w-[100%] placeholder-black py-1 px-5 rounded-md text-black border-[1px] border-black"
          />
          <input
            type="text"
            placeholder="Password"
            className="bg-transparent w-[100%] placeholder-black py-1 px-5 rounded-md text-black border-[1px] border-black"
          />
          <div className="w-full flex flex-col justify-center items-center gap-1">
            <p className="text-black text-[11px]">Forgot password?</p>

            <button className="bg-black text-white py-1 w-[50%] rounded-md">
              Sign In
            </button>
          </div>
        </div>
      </div>
      <div>
        <img
          height={200}
          width={200}
          src="/images/signin_upPage/shopNtradelogo.png"
          alt="Shop & Trade Logo"
        />
      </div>
    </div>
  );
};
export default SigninPage;
