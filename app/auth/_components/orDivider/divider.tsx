const Divider = () => {
	return (
		<>
			<div className={`w-full my-4 flex justify-between items-center`}>
				<div className="h-[1px] flex flex-1 bg-slate-300"></div>
				<div className="px-4 text-slate-500">or</div>
				<div className="h-[1px] flex flex-1 bg-slate-300"></div>
			</div>
		</>
	);
};

export default Divider;
