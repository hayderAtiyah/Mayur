function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
          About This App
        </h1>

        <p className="text-slate-300 leading-relaxed mb-4">
          Welcome to{" "}
          <span className="font-semibold text-indigo-300">MessageShare</span> Website where people can leave messages and others can like, dislike these messages. You can view the highest and lowest rated messages and search messages that others have created.
        </p>

        <p className="text-slate-300 leading-relaxed mb-4">
          This project was built using{" "}
          <span className="font-semibold text-fuchsia-300">React</span> on the
          frontend and{" "}
          <span className="font-semibold text-fuchsia-300">Python Flask for the backend</span>{" "}
          <span className="font-semibold text-indigo-300">with MongoDB for the database</span>.
        </p>

        <div className="text-center">
          <p className="text-sm text-slate-400">Built By Mayur Satish</p>
        </div>
      </div>
    </div>
  );
}

export default About;
