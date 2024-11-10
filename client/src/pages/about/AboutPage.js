import React from 'react';
import './AboutPage.css'; // Import the CSS file for styling

const AboutPage = () => {
  return (
    <div className="about-page-container">
      <header className="about-header">
        <h1>About Task Manager App</h1>
      </header>

      <section className="about-description">
        <p>
          The Task Manager App is designed to help you organize, manage, and collaborate on tasks with ease.
          Whether you're working on personal projects or collaborating with a team, our app streamlines the 
          process of task management and helps you stay on top of your work.
        </p>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <ul>
          <li>Create and manage tasks with titles, descriptions, and status updates</li>
          <li>Assign tasks to yourself or team members</li>
          <li>Track task progress with custom statuses (e.g., Pending, In Progress, Completed)</li>
          <li>Collaborate by adding multiple collaborators to tasks</li>
          <li>View only your tasks or filter by status</li>
        </ul>
      </section>

      <section className="team">
        <h2>Our Team</h2>
        <p>Developed with love by a passionate developer.</p>
      </section>

      <footer className="about-footer">
        <p>© 2024 Task Manager App - All rights reserved</p>
      </footer>
    </div>
  );
};

export default AboutPage;
