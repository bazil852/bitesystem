import React, { useState } from 'react';
import { Monitor, Power, RefreshCw, GamepadIcon } from 'lucide-react';
import '../styles/PCDashboard.css';
import data from '../data.json';

interface PC {
  name: string;
  status: string;
  network_status: {
    lan_connected: boolean;
    wifi_connected: boolean;
  };
  keyboard_present: boolean;
  mouse_present: boolean;
  unreal_engine_running: boolean;
  nvidia_process_running: boolean;
}

const PCDashboard = () => {
  const [selectedPC, setSelectedPC] = useState<string | null>(null);
  const [pcs] = useState<PC[]>(data);

  const instructorPC = pcs.find(pc => pc.name === "Instructor-PC");
  const studentPCs = pcs.filter(pc => pc.name !== "Instructor-PC");

  const handleRestart = (pcName: string) => {
    console.log(`Restarting ${pcName}`);
  };

  const handleRestartGame = (pcName: string) => {
    console.log(`Restarting game on ${pcName}`);
  };

  const handleShutdown = (pcName: string) => {
    console.log(`Shutting down ${pcName}`);
  };

  const isOperational = (pc: PC) => pc.unreal_engine_running && pc.nvidia_process_running;

  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="title">PC Monitoring Dashboard</h1>
        
        <div className="grid-layout">
          {/* Left Panel - PC Grid */}
          <div className="panel">
            <h2 className="panel-title">PC Status</h2>
            
            {/* Instructor PC Row */}
            {instructorPC && (
              <div className="instructor-row">
                <div
                  onClick={() => setSelectedPC(instructorPC.name)}
                  className={`pc-card ${selectedPC === instructorPC.name ? 'selected' : ''}`}
                >
                  <div className="pc-icon-container">
                    <Monitor
                      className={`pc-icon ${isOperational(instructorPC) ? 'operational' : 'not-operational'}`}
                    />
                    <span className="pc-name">{instructorPC.name}</span>
                    <span className={`pc-status ${isOperational(instructorPC) ? 'operational' : 'not-operational'}`}>
                      {isOperational(instructorPC) ? 'Operational' : 'Not Connected'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Student PCs Grid */}
            <div className="pc-grid">
              {studentPCs.map((pc) => (
                <div
                  key={pc.name}
                  onClick={() => setSelectedPC(pc.name)}
                  className={`pc-card ${selectedPC === pc.name ? 'selected' : ''}`}
                >
                  <div className="pc-icon-container">
                    <Monitor
                      className={`pc-icon ${isOperational(pc) ? 'operational' : 'not-operational'}`}
                    />
                    <span className="pc-name">{pc.name}</span>
                    <span className={`pc-status ${isOperational(pc) ? 'operational' : 'not-operational'}`}>
                      {isOperational(pc) ? 'Operational' : 'Not Connected'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Details */}
          <div className="panel">
            <h2 className="panel-title">PC Details</h2>
            <div className="details-container">
              {selectedPC ? (
                <div className="detail-card selected">
                  <h3 className="detail-title">{selectedPC}</h3>
                  
                  {pcs.filter(pc => pc.name === selectedPC).map(pc => (
                    <div key={pc.name}>
                      <div className="status-grid">
                        <div className="status-item">
                          <div className={`status-indicator ${pc.network_status.lan_connected ? 'active' : 'inactive'}`} />
                          <span className="status-label">LAN Connection</span>
                        </div>
                        <div className="status-item">
                          <div className={`status-indicator ${pc.network_status.wifi_connected ? 'active' : 'inactive'}`} />
                          <span className="status-label">WiFi Connection</span>
                        </div>
                        <div className="status-item">
                          <div className={`status-indicator ${pc.keyboard_present ? 'active' : 'inactive'}`} />
                          <span className="status-label">Keyboard</span>
                        </div>
                        <div className="status-item">
                          <div className={`status-indicator ${pc.mouse_present ? 'active' : 'inactive'}`} />
                          <span className="status-label">Mouse</span>
                        </div>
                        <div className="status-item">
                          <div className={`status-indicator ${pc.unreal_engine_running ? 'active' : 'inactive'}`} />
                          <span className="status-label">Unreal Engine</span>
                        </div>
                        <div className="status-item">
                          <div className={`status-indicator ${pc.nvidia_process_running ? 'active' : 'inactive'}`} />
                          <span className="status-label">NVIDIA Process</span>
                        </div>
                      </div>

                      <div className="action-buttons">
                        <button 
                          className="button button-restart"
                          onClick={() => handleRestart(pc.name)}
                        >
                          <RefreshCw />
                          Restart PC
                        </button>
                        <button 
                          className="button button-game"
                          onClick={() => handleRestartGame(pc.name)}
                        >
                          <GamepadIcon />
                          Restart Game
                        </button>
                        <button 
                          className="button button-shutdown"
                          onClick={() => handleShutdown(pc.name)}
                        >
                          <Power />
                          Shutdown
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="detail-card">
                  <p>Select a PC to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCDashboard;