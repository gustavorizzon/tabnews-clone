import Image from "next/image";

export default function Home() {
  return (
    <div
      style={{
        height: "100vh",
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        rowGap: "16px",
      }}
    >
      <Image
        src="/img/under_construction.png"
        alt="Representative image for Under Construction website"
        width={128}
        height={128}
      />
      <h2>em construção...</h2>
    </div>
  );
}
