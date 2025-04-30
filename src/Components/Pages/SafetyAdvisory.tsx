import React from 'react';
import './SafetyAdvisory.css'; // Path to your CSS file

const MindanaoTravelAdvisory = () => {
  return (
    <div className="bg-advisory">
    <div className="advisory-container">
      <h1>Mindanao Travel Advisory: What You Need to Know</h1>
      <p>Planning to explore Mindanao? Here are a few important reminders to help keep your trip safe and enjoyable:</p>

      <section>
        <h2>Travel Essentials</h2>
        <ul>
          <li><strong>Always bring a valid ID:</strong> This will be necessary for check-ins and checkpoints.</li>
          <li><strong>Prepare cash:</strong> Some areas may have limited ATM access, so it’s always good to have cash on hand.</li>
          <li><strong>Book with trusted providers:</strong> Choose reliable hotels, transport services, and tour operators.</li>
        </ul>
      </section>

      <section>
        <h2>Health and Safety</h2>
        <ul>
          <li><strong>Carry personal medicines and first-aid items:</strong> Ensure you have your necessary medications and a basic first-aid kit.</li>
          <li><strong>Use insect repellent:</strong> Mindanao’s tropical climate may bring mosquitoes — protect yourself.</li>
          <li><strong>Stay hydrated and use sunscreen:</strong> The weather can be hot, especially outdoors.</li>
          <li><strong>Stay updated on local health advisories:</strong> Monitor news for any health-related updates, like outbreaks or necessary precautions.</li>
        </ul>
      </section>

      <section>
        <h2>Respect for Local Communities</h2>
        <ul>
          <li><strong>Dress appropriately:</strong> Particularly when visiting cultural or religious sites.</li>
          <li><strong>Be polite and respectful:</strong> Always approach interactions with kindness, respecting local customs and traditions.</li>
          <li><strong>Follow local guidelines:</strong> Many regions have unique cultural practices and rules — make sure to respect them.</li>
        </ul>
      </section>

      <section>
        <h2>Communication and Emergency</h2>
        <ul>
          <li><strong>Have a working mobile SIM:</strong> Smart and Globe networks cover most areas, but check coverage in remote areas.</li>
          <li><strong>Save important contacts:</strong> Local police, tourism offices, and emergency numbers should be saved in case of an urgent situation.</li>
          <li><strong>Stay informed about local conditions:</strong> Travel advisories and local security conditions can change; always check before heading out.</li>
        </ul>
      </section>

      <section>
        <h2>Safety Alerts</h2>
        <ul>
        <li><strong>Check travel advisories:</strong> Some regions may have areas under heightened alert. Stay informed about security situations through official sources. 
            <a href="https://travel.gc.ca/destinations/philippines" target="_blank" rel="noopener noreferrer">
              Click here for the latest safety advisory on the Philippines.
            </a>
          </li>
          <li><strong>Weather conditions:</strong> Be aware of heavy rainfall, especially during the rainy season, which could lead to flooding or delays.</li>
          <li><strong>Natural disasters:</strong> Mindanao is prone to earthquakes and typhoons. Familiarize yourself with local evacuation routes and emergency protocols.</li>
        </ul>
      </section>

      <section>
        <h2>Reminder</h2>
        <p>Mindanao offers many wonderful destinations, from breathtaking beaches to cultural landmarks. A little preparation goes a long way to ensure a safe, smooth, and memorable experience.</p>
        <p>Enjoy your adventure responsibly and make the most of your visit to Mindanao!</p>
      </section>
    </div>
    </div>
  );
};

export default MindanaoTravelAdvisory;
