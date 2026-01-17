import deepDishLogo from "@/images/deepDishLogo.png";

export default function NavBar() {
  return (
    <div className="flex items-center gap-[-0.5rem]">
      <img
        src={deepDishLogo}
        alt="DeepDish Logo"
        className="w-40 h-40 object-contain"
      />
      <div>
        <h1 className="text-2xl font-quicksand font-semibold">DeepDish</h1>
        <p className="text-lg font-quicksand italic">
          Your AI-Powered Food Classifier
        </p>
      </div>
    </div>
  );
}
