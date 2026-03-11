import { useNavigate } from "react-router-dom";
import coverImage from "../../assets/background-cover.jpg";
import { SiActualbudget } from "react-icons/si";

function Landing() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/home");
  };

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${coverImage})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <SiActualbudget className="text-6xl mb-4" />
        <h1 className="text-5xl font-bold tracking-wide">Budgetr</h1>

        <button
          onClick={handleStart}
          className="mt-6 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Landing;
