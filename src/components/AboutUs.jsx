import React from 'react';
import './AboutUs.css';

const people = [
  { name: 'Amir Djelidi', img: '/images/personne1.jpg' },
  { name: 'Robin Rivard', img: '/images/personne2.jpg' },
  { name: 'Kevin Truong', img: '/images/personne3.jpg' },
  { name: 'Alexis Hourcau', img: '/images/personne4.jpg' },
  { name: 'Mattéo Buffey', img: '/images/personne5.jpg' },
  { name: 'Nolan Mornet', img: '/images/personne6.jpg' }
];

function AboutUs() {
  return (
    <div className="about-us">
      <h2>À PROPOS DE NOUS</h2>
      <div className="team-grid">
        {people.map((person, idx) => (
          <div className="team-member" key={idx}>
            <div className="name">{person.name}</div>
            <img src={person.img} alt={person.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;