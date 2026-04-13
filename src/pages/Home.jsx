import Main from "../components/Main/Main.jsx";
import About from "../components/About/About.jsx";

function Home({ isLoggedIn }) {
  return (
    <main>
      <Main isLoggedIn={isLoggedIn} />

      {/* About section should always be below Main */}

      <About />
    </main>
  );
}

export default Home;
