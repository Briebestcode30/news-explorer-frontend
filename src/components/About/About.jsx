import "./About.css";

import profileImage from "../../assets/profile.png";

function About({ isLoggedIn }) {
  if (isLoggedIn) {
    return null;
  }

  return (
    <section className="about">
      <div className="about__container">
        <img src={profileImage} alt="Profile" className="about__image" />

        <div className="about__content">
          <h2 className="about__title">About the author</h2>

          <p className="about__text">
            My name is Brieana Harris, and I am a full stack software engineer
            who enjoys building responsive and user-friendly web applications.
            For this project, I used modern technologies such as React,
            JavaScript, and CSS to create reusable components and design a
            clean, functional interface. I also implemented API integration,
            user authentication, and responsive design principles to ensure the
            application performs reliably across different devices.
          </p>

          <p className="about__text">
            My experience with the TripleTen bootcamp has played a major role in
            developing my technical skills and shaping me into a confident
            software engineer. Throughout the program, I learned industry best
            practices such as the BEM methodology for organizing scalable CSS,
            version control with Git, and effective debugging strategies. These
            experiences have strengthened my problem-solving abilities and
            prepared me to confidently step into my first professional role in
            the tech industry.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
