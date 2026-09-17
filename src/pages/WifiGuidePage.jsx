import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';

const NETWORKS = [
  {
    id: 'staff-student',
    tabLabel: 'Students & staff',
    networkName: 'Griffith University',
    heading: 'Students & staff',
    intro: 'Use your Griffith account for full access to university resources and the internet.',
    steps: [
      'Be on a Griffith campus and make sure Wi-Fi is turned on.',
      'Open your device Wi-Fi settings and choose "Griffith University".',
      'On Windows, enable "Connect automatically", then select Connect.',
      'Enter your Griffith Uni ID (for example, s1234567) and your Griffith password.',
      'If asked about the wireless.griffith.edu.au certificate, review it and accept to finish connecting.',
    ],
  },
  {
    id: 'visitors',
    tabLabel: 'Visitors',
    networkName: 'Griffith Public WiFi',
    heading: 'Visitors',
    intro: 'Free basic internet access for visitors without a Griffith or participating eduroam account.',
    steps: [
      'Open Wi-Fi settings while you are on any Griffith campus.',
      'Select the "Griffith Public WiFi" network.',
      'Open a web browser and select the Griffith Public WiFi tile.',
      'Follow the registration prompts and provide an email address or mobile number.',
      'Use the registration details sent to you by email or SMS to complete access.',
    ],
  },
  {
    id: 'academics',
    tabLabel: 'Visiting academics',
    networkName: 'eduroam',
    heading: 'Visiting academics',
    intro: 'For visitors whose home educational institution participates in the eduroam federation.',
    steps: [
      'Set up eduroam using the instructions and credentials supplied by your home institution.',
      'When you arrive at Griffith, open your device Wi-Fi settings.',
      'Select "eduroam" from the available networks.',
      'Sign in using the full username and password format required by your home institution.',
      "Contact your home institution's IT team if your credentials are not accepted.",
    ],
  },
];

export default function WifiGuidePage() {
  const [activeId, setActiveId] = useState(NETWORKS[0].id);
  const active = NETWORKS.find((n) => n.id === activeId);

  useEffect(() => {
    document.title = 'Connect to Wi-Fi | N79 Navigator';
  }, []);

  return (
    <div className="page-transition wifi-page">
      <Header />
      <main id="main-content">
        <section className="wifi-hero">
          <p className="campus-label light">Campus essentials</p>
          <h1>Connect to Griffith Wi-Fi</h1>
          <p>Choose the network that matches how you're visiting, then follow the steps below.</p>
        </section>

        <div className="wifi-layout">
          <aside>
            <span>Choose your access</span>
            <div role="tablist" aria-label="Choose your Wi-Fi access type">
              {NETWORKS.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  role="tab"
                  id={`tab-${n.id}`}
                  aria-selected={n.id === activeId}
                  aria-controls={`panel-${n.id}`}
                  className={n.id === activeId ? 'active' : ''}
                  onClick={() => setActiveId(n.id)}
                >
                  <b>{n.tabLabel}</b>
                  <small>{n.networkName}</small>
                </button>
              ))}
            </div>
            <div className="wifi-note">
              <b>Before you start</b>
              <p>You must be on campus. Update your device software and forget any old Griffith connection if reconnecting.</p>
            </div>
          </aside>

          <div
            className="wifi-steps"
            id={`panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            tabIndex={0}
          >
            <div className="network-name">
              <span>Wi-Fi network</span>
              <b>{active.networkName}</b>
            </div>
            <h2>{active.heading}</h2>
            <p>{active.intro}</p>
            <ol>
              {active.steps.map((step, i) => (
                <li key={i}>
                  <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="wifi-support">
          <div>
            <b>Need help connecting?</b>
            <p>Contact the Griffith IT Service Centre: (07) 3735 5555 for Brisbane campuses.</p>
          </div>
          <a href="https://www.griffith.edu.au/internet-access/wifi/getting-connected" target="_blank" rel="noreferrer">
            Official device guides ↗
          </a>
        </div>
      </main>
    </div>
  );
}
