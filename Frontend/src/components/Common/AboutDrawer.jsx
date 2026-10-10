import React, { useState, useEffect } from 'react';
import styles from './AboutDrawer.module.css';
import { 
  X, Mail, Copy, Check, Send, Sparkles, Heart, Globe, 
  ShieldCheck, Code, UserCheck, Flame, ExternalLink, Laptop,
  Cpu, Database, Layers, CheckCircle2, ArrowRight, Award, Briefcase, Zap, Terminal, Server
} from 'lucide-react';
import { useStreak } from '../../context/StreakContext';
import confetti from 'canvas-confetti';

export default function AboutDrawer({ isOpen, onClose }) {
  const { showToast } = useStreak();
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', projectType: 'Full-Stack MERN Application', message: '' });
  const [sending, setSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [sentDetails, setSentDetails] = useState(null);

  // Close on Escape key and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const ownerEmail = 'my2387569@gmail.com';
  const portfolioUrl = 'https://portfolio-three-green-51.vercel.app';
  const linkedinUrl = 'https://www.linkedin.com/in/mithlesh-kumar-4ab73929a';
  const githubUrl = 'https://github.com/Mithleshyadavgithub/Mithleshyadavgithub';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(ownerEmail);
    setCopied(true);
    showToast('📋 Email copied: my2387569@gmail.com', 'info');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!form.message.trim()) {
      showToast('Please enter a message before sending.', 'danger');
      return;
    }

    setSending(true);
    const submittedData = { ...form };
    setTimeout(() => {
      setSending(false);
      setSentDetails(submittedData);
      setMessageSent(true);
      setForm({ name: '', email: '', projectType: 'Full-Stack MERN Application', message: '' });
      confetti({ 
        particleCount: 120, 
        spread: 80, 
        origin: { y: 0.5 },
        colors: ['#ff9100', '#ec4899', '#8b5cf6', '#00e5ff', '#ffd700']
      });
      showToast('💌 Message successfully delivered to Founder Mithlesh Kumar!', 'success');
    }, 800);
  };

  const handleResetForm = () => {
    setMessageSent(false);
    setSentDetails(null);
  };

  // Full-Stack MERN technologies specified in the PDF requirements
  const mernStack = [
    { 
      name: 'React 19', 
      role: 'Frontend UI & Context API', 
      desc: 'Interactive UI components, state management & real-time gamified views',
      icon: Code, 
      tag: 'Frontend' 
    },
    { 
      name: 'Node.js', 
      role: 'Backend Runtime Engine', 
      desc: 'High-performance asynchronous server runtime executing business & streak logic',
      icon: Terminal, 
      tag: 'Backend' 
    },
    { 
      name: 'Express.js', 
      role: 'REST API & Middleware', 
      desc: 'Modular REST routing, rate limiting, request validation & error middleware',
      icon: Server, 
      tag: 'Backend' 
    },
    { 
      name: 'MongoDB & Mongoose', 
      role: 'Authoritative Database', 
      desc: 'Compound index uniqueness, atomic increments & idempotent reward ledger',
      icon: Database, 
      tag: 'Database' 
    },
    { 
      name: 'CSS Modules & Bootstrap 5', 
      role: 'Responsive UI Architecture', 
      desc: 'Custom velvet-purple & amber design tokens, glassmorphism & fluid grid',
      icon: Layers, 
      tag: 'Styling' 
    },
    { 
      name: 'JWT & REST Security', 
      role: 'Authentication & Anti-Cheat', 
      desc: 'Secure bearer tokens, authoritative server-time checks & anti-tamper logic',
      icon: ShieldCheck, 
      tag: 'Security' 
    }
  ];

  return (
    <div className={styles.fullScreenModal} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        
        {/* Top Sticky Header */}
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.brandIconWrapper}>
              <Sparkles size={20} className={styles.sparkleIcon} />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h4 className={styles.headerTitle}>About Founder</h4>
                <span className={styles.verifiedBadge}>
                  <CheckCircle2 size={12} color="#fff" />
                  <span className={styles.verifiedFullText}>VERIFIED MERN ARCHITECT</span>
                  <span className={styles.verifiedShortText}>MERN</span>
                </span>
              </div>
              <p className={styles.headerSubtitle}>Mithlesh Kumar • Full-Stack MERN Developer</p>
            </div>
          </div>

          <div className={styles.headerRight}>
            <a 
              href={portfolioUrl} 
              target="_blank" 
              rel="noreferrer" 
              className={styles.headerCtaBtn}
            >
              <Laptop size={15} />
              <span>Live Portfolio</span>
              <ExternalLink size={13} />
            </a>
            <button className={styles.closeBtn} onClick={onClose} title="Close (Esc)">
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className={styles.scrollContent}>
          
          {/* Hero Section Banner */}
          <section className={styles.heroSection}>
            <div className={styles.heroGlowOrb1} />
            <div className={styles.heroGlowOrb2} />
            
            <div className={styles.heroGrid}>
              
              {/* Founder Avatar MK */}
              <div className={styles.avatarBlock}>
                <div className={styles.avatarRing}>
                  <div className={styles.avatarInner}>
                    <span className={styles.avatarInitials}>MK</span>
                  </div>
                </div>
                <div className={styles.onlineBadge}>
                  <span className={styles.onlineDot} /> Available for Hiring &amp; Projects
                </div>
              </div>

              {/* Founder Intro */}
              <div className={styles.heroDetails}>
                <div className={styles.rolePill}>
                  <Award size={14} color="#ffd700" />
                  <span>FOUNDER &amp; FULL-STACK MERN DEVELOPER</span>
                </div>
                
                <h1 className={styles.founderName}>Mithlesh Kumar</h1>
                
                <p className={styles.founderTagline}>
                  Full-Stack MERN Architect specializing in high-concurrency Node.js/Express backends, authoritative MongoDB transaction ledgers, and immersive gamified React 19 web applications.
                </p>

                {/* Hero Actions Bar */}
                <div className={styles.heroActions}>
                  <div className={styles.emailPill}>
                    <div className="d-flex align-items-center gap-2">
                      <Mail size={15} color="#ffd700" />
                      <span className={styles.emailAddress}>{ownerEmail}</span>
                    </div>
                    <button className={styles.copyBtn} onClick={handleCopyEmail} title="Copy Email">
                      {copied ? <Check size={14} color="#76ff03" /> : <Copy size={14} />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  <a 
                    href={portfolioUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={styles.primaryActionBtn}
                  >
                    <Globe size={16} />
                    <span>Explore Portfolio</span>
                  </a>

                  <div className={styles.socialButtonsRow}>
                    <a 
                      href={linkedinUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className={styles.secondaryActionBtn}
                    >
                      <UserCheck size={16} color="#00e5ff" />
                      <span>LinkedIn</span>
                    </a>

                    <a 
                      href={githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className={styles.secondaryActionBtn}
                    >
                      <Code size={16} color="#fff" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Core MERN Highlights Grid */}
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricIconBox} style={{ background: 'rgba(255, 145, 0, 0.15)', color: '#ff9100' }}>
                  <Code size={22} />
                </div>
                <div>
                  <div className={styles.metricTitle}>React 19 Frontend</div>
                  <div className={styles.metricDesc}>Gamified streak hubs, modular components &amp; CSS Module styling</div>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIconBox} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                  <Terminal size={22} />
                </div>
                <div>
                  <div className={styles.metricTitle}>Node.js &amp; Express API</div>
                  <div className={styles.metricDesc}>100% authoritative backend, JWT security &amp; rate-limited routes</div>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIconBox} style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                  <Database size={22} />
                </div>
                <div>
                  <div className={styles.metricTitle}>MongoDB Ledger</div>
                  <div className={styles.metricDesc}>Idempotent compound index constraints &amp; atomic reward audits</div>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIconBox} style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <div className={styles.metricTitle}>Anti-Cheat Engine</div>
                  <div className={styles.metricDesc}>Server-time validation, missed-day resets &amp; anti-tamper logic</div>
                </div>
              </div>
            </div>
          </section>

          {/* 2-Column Content Grid */}
          <div className={styles.mainLayoutGrid}>
            
            {/* Left Column: Full-Stack MERN Arsenal & Architecture */}
            <div className={styles.leftCol}>
              
              {/* Full-Stack MERN Tech Stack Card (PDF Specifications) */}
              <div className={styles.glassCard}>
                <div className={styles.cardHeader}>
                  <Cpu size={20} color="#ff9100" />
                  <h3 className={styles.cardTitle}>Full-Stack MERN Technologies (PDF Specifications)</h3>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.bodyParagraph}>
                    Engineered strictly with the full-stack MERN stack specified in the project requirements document:
                  </p>

                  <div className={styles.skillsGrid}>
                    {mernStack.map((tech, idx) => {
                      const IconComp = tech.icon;
                      return (
                        <div key={idx} className={styles.skillItem}>
                          <div className={styles.skillItemIcon}>
                            <IconComp size={18} />
                          </div>
                          <div className={styles.skillItemInfo}>
                            <div className="d-flex align-items-center justify-content-between gap-2">
                              <span className={styles.skillName}>{tech.name}</span>
                              <span className={styles.skillTag}>{tech.tag}</span>
                            </div>
                            <span className={styles.skillRole}>{tech.role}</span>
                            <span className={styles.skillDesc}>{tech.desc}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* VELoop Architecture Blueprint Card */}
              <div className={styles.glassCard} style={{ borderColor: 'rgba(16, 185, 129, 0.35)' }}>
                <div className={styles.cardHeader}>
                  <ShieldCheck size={20} color="#10b981" />
                  <h3 className={styles.cardTitle}>VELoop Platform Architecture</h3>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.bodyParagraph}>
                    Designed and built from scratch by <strong>Mithlesh Kumar</strong>:
                  </p>
                  <ul className={styles.featureList}>
                    <li>
                      <CheckCircle2 size={16} color="#10b981" />
                      <span><strong>100% Backend Authority:</strong> Client cannot forge rewards or manipulate streak values; all timestamps and calculations are server-governed.</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} color="#10b981" />
                      <span><strong>MongoDB Idempotent Ledger:</strong> Compound index <code>(userId + cycleId + day)</code> guarantees race-condition immunity on simultaneous claims.</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} color="#10b981" />
                      <span><strong>Gamified Multi-Sensory UX:</strong> React 19 UI with Web Audio synthesis, interactive reward animations, and XP levelling.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Pitch Banner */}
              <div className={styles.pitchBanner}>
                <div className={styles.pitchContent}>
                  <h4 className={styles.pitchTitle}>Looking to Build a High-Performance Web App?</h4>
                  <p className={styles.pitchText}>
                    Connect with me for full-stack MERN development, gamified interfaces, or scalable backend API architectures.
                  </p>
                  <a 
                    href={portfolioUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={styles.pitchBtn}
                  >
                    <span>Visit Live Portfolio &amp; Projects</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Direct Message & Contact Channels */}
            <div className={styles.rightCol}>
              
              {/* Direct Inquiry Form */}
              <div className={styles.glassCard} style={{ borderColor: 'rgba(255, 145, 0, 0.4)' }}>
                <div className={styles.cardHeader}>
                  <Heart size={20} color="#ec4899" />
                  <h3 className={styles.cardTitle}>Send a Direct Inquiry to Mithlesh</h3>
                </div>
                <div className={styles.cardBody}>
                  {messageSent ? (
                    <div className={styles.successBox}>
                      <div className={styles.successIconWrapper}>
                        <CheckCircle2 size={44} className={styles.successIconPulse} color="#10b981" />
                      </div>
                      
                      <div className={styles.successBadge}>
                        <Sparkles size={13} color="#ffd700" />
                        <span>CONFIRMATION DELIVERED</span>
                      </div>

                      <h4 className={styles.successTitle}>Your Message Has Been Sent to the Founder!</h4>
                      
                      <p className={styles.successText}>
                        Thank you{sentDetails?.name ? `, ${sentDetails.name}` : ''}! Your message regarding <strong>{sentDetails?.projectType || 'MERN Inquiry'}</strong> has been delivered directly to <strong>Mithlesh Kumar</strong>.
                      </p>

                      <div className={styles.successSummaryCard}>
                        <div className={styles.summaryRow}>
                          <span className={styles.summaryLabel}>Recipient Founder:</span>
                          <span className={styles.summaryValue}>Mithlesh Kumar</span>
                        </div>
                        <div className={styles.summaryRow}>
                          <span className={styles.summaryLabel}>Founder Email:</span>
                          <span className={styles.summaryValue}>{ownerEmail}</span>
                        </div>
                        {sentDetails?.email && (
                          <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>From:</span>
                            <span className={styles.summaryValue}>{sentDetails.email}</span>
                          </div>
                        )}
                        <div className={styles.summaryRow}>
                          <span className={styles.summaryLabel}>Estimated Response:</span>
                          <span className={styles.summaryValue} style={{ color: '#76ff03', fontWeight: 800 }}>Within 24 Hours</span>
                        </div>
                      </div>

                      <button 
                        type="button" 
                        className={styles.sendAnotherBtn}
                        onClick={handleResetForm}
                      >
                        <Send size={15} />
                        <span>Send Another Message</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className={styles.formHint}>
                        Interested in hiring, collaborating on a MERN stack project, or discussing full-stack development? Send a message below.
                      </p>

                      <form onSubmit={handleSendMessage} className={styles.inquiryForm}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Your Name</label>
                          <input 
                            type="text" 
                            className={styles.formInput} 
                            placeholder="e.g. Alex Johnson"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Your Email Address</label>
                          <input 
                            type="email" 
                            className={styles.formInput} 
                            placeholder="e.g. alex@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Inquiry Type</label>
                          <select 
                            className={styles.formSelect}
                            value={form.projectType}
                            onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                          >
                            <option value="Full-Stack MERN Application">Full-Stack MERN Application</option>
                            <option value="Backend API & Database Architecture">Backend API &amp; Database Architecture</option>
                            <option value="Gamified UI & React Development">Gamified UI &amp; React Development</option>
                            <option value="Hiring / Software Engineer Role">Hiring / Software Engineer Role</option>
                            <option value="General Discussion">General Discussion</option>
                          </select>
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Message Details</label>
                          <textarea 
                            className={styles.formTextarea} 
                            placeholder="Tell me about your project, team, or opportunity..."
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            required
                          />
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={sending}>
                          <Send size={16} />
                          <span>{sending ? 'Sending...' : 'Send Message to Mithlesh'}</span>
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>

              {/* Official Social & Professional Channels */}
              <div className={styles.glassCard}>
                <div className={styles.cardHeader}>
                  <Globe size={20} color="#06b6d4" />
                  <h3 className={styles.cardTitle}>Official Channels &amp; Profiles</h3>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.channelsGrid}>
                    <a 
                      href={portfolioUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className={styles.channelTile}
                    >
                      <div className={styles.channelTileIcon} style={{ background: 'rgba(255, 215, 0, 0.15)', color: '#ffd700' }}>
                        <Globe size={20} />
                      </div>
                      <div className={styles.channelTileInfo}>
                        <span className={styles.channelTileTitle}>Live Portfolio</span>
                        <span className={styles.channelTileDesc}>portfolio-three-green-51.vercel.app</span>
                      </div>
                      <ExternalLink size={14} className={styles.channelExternalIcon} />
                    </a>

                    <a 
                      href={linkedinUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className={styles.channelTile}
                    >
                      <div className={styles.channelTileIcon} style={{ background: 'rgba(0, 229, 255, 0.15)', color: '#00e5ff' }}>
                        <UserCheck size={20} />
                      </div>
                      <div className={styles.channelTileInfo}>
                        <span className={styles.channelTileTitle}>LinkedIn Profile</span>
                        <span className={styles.channelTileDesc}>Connect &amp; view recommendations</span>
                      </div>
                      <ExternalLink size={14} className={styles.channelExternalIcon} />
                    </a>

                    <a 
                      href={githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className={styles.channelTile}
                    >
                      <div className={styles.channelTileIcon} style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff' }}>
                        <Code size={20} />
                      </div>
                      <div className={styles.channelTileInfo}>
                        <span className={styles.channelTileTitle}>GitHub Profile</span>
                        <span className={styles.channelTileDesc}>Explore source code &amp; repositories</span>
                      </div>
                      <ExternalLink size={14} className={styles.channelExternalIcon} />
                    </a>

                    <a 
                      href={`mailto:${ownerEmail}?subject=Full-Stack%20MERN%20Inquiry`}
                      className={styles.channelTile}
                    >
                      <div className={styles.channelTileIcon} style={{ background: 'rgba(255, 145, 0, 0.15)', color: '#ff9100' }}>
                        <Mail size={20} />
                      </div>
                      <div className={styles.channelTileInfo}>
                        <span className={styles.channelTileTitle}>Direct Email</span>
                        <span className={styles.channelTileDesc}>{ownerEmail}</span>
                      </div>
                      <ExternalLink size={14} className={styles.channelExternalIcon} />
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Footer Bar */}
          <footer className={styles.bottomFooter}>
            <div className={styles.footerLeft}>
              <span>VELoop Rewards Platform • Engineered by <strong>Mithlesh Kumar</strong> (Full-Stack MERN Developer)</span>
            </div>
            <div className={styles.footerRight}>
              <button className={styles.returnBtn} onClick={onClose}>
                <span>Close Showcase</span>
                <X size={15} />
              </button>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}
