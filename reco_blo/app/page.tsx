import { PostData } from "@/Mocks/PostData";
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";

export default function Home() {
  const data = PostData;
  return (
    <main className=" max-w-5xl mx-auto my-[250px]">
      <Header />

      <div className="grid grid-cols-3 gap-7">
        {data.map((item) => (
          <Card item={item} key={item.name} />
        ))}
      </div>
    </main>
  );
}
