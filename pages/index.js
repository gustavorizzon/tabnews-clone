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
      <img
        src="/img/under_construction.png"
        style={{ maxWidth: "128px", width: "100%" }}
      />
      <h2>em construção...</h2>
    </div>
  );
}
