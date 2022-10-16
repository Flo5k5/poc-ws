import useHeaderTitle from "src/hooks/useHeaderTitle";

export default function Home() {
  useHeaderTitle("Bid items");

  return (
    <div className="flex-1 flex flex-col mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 gap-10">
      <h3>Home</h3>
    </div>
  );
}
