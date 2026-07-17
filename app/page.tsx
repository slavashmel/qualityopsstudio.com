const offers = [
  {
    eyebrow: "2-3 weeks",
    title: "Quality System Diagnostic",
    description:
      "A focused review of how quality actually moves through your team: requirements, Jira, regression, automation, environments, test data, release gates, and ownership.",
    outcomes: [
      "Current-state map of your QA and release flow",
      "Risk and bottleneck report with evidence",
      "30/60/90-day improvement roadmap",
      "Executive workshop with practical next steps",
    ],
  },
  {
    eyebrow: "4-8 weeks",
    title: "Regression Rescue Sprint",
    description:
      "A hands-on engagement for teams whose regression cycle has become slow, expensive, flaky, or hard to trust.",
    outcomes: [
      "Regression suite triage and prioritization",
      "CI/CD, parallelization, test data, and flaky-test plan",
      "Release confidence dashboard and quality gates",
      "Ownership model so the improvement survives",
    ],
  },
  {
    eyebrow: "Part-time leadership",
    title: "Fractional Head of QA",
    description:
      "Senior QA leadership for scaling teams that need direction, standards, mentoring, and operating rhythm without a full-time hire.",
    outcomes: [
      "QA operating model and responsibilities",
      "Metrics, OKRs, review cadence, and stakeholder reporting",
      "Hiring, onboarding, mentoring, and lead development",
      "Automation governance and cross-team dependency process",
    ],
  },
];

const proof = [
  {
    metric: "10h -> 30m",
    label: "Cross-team regression time reduced through automation, parallelization, test data work, and CI/CD improvements.",
  },
  {
    metric: "-50%",
    label: "QA automation costs reduced while improving coverage and execution performance.",
  },
  {
    metric: "30+",
    label: "Distributed QA engineers led across multiple product teams.",
  },
  {
    metric: "1-2 weeks",
    label: "Onboarding ramp-up improvement through a cross-functional onboarding system.",
  },
];

const signals = [
  "Regression is too slow to support frequent releases",
  "QA depends on manual coordination, hidden knowledge, or heroic individuals",
  "Automation exists, but nobody trusts its signal",
  "Jira, Confluence, and TMS are present but do not create real visibility",
  "QA engineers execute tasks but do not own product quality",
  "AI tools are being used ad hoc without a quality workflow",
];

const method = [
  {
    step: "01",
    title: "Observe the real system",
    text: "Interviews, workflow review, Jira/Confluence sampling, regression and CI/CD analysis, release incident patterns, and team ownership mapping.",
  },
  {
    step: "02",
    title: "Separate symptoms from causes",
    text: "The goal is not more process. It is finding the few constraints that make releases slow, risky, expensive, or emotionally exhausting.",
  },
  {
    step: "03",
    title: "Design practical interventions",
    text: "Prioritized improvements across people, test strategy, automation, data, environments, reporting, onboarding, and release governance.",
  },
  {
    step: "04",
    title: "Transfer ownership",
    text: "The work ends with an operating model, documentation, review cadence, and team habits that continue after the engagement.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <nav className="top-nav" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="QualityOps Studio home">
            <span className="brand-mark" aria-hidden="true">
              <span />
            </span>
            <span>
              QualityOps <em>Studio</em>
            </span>
          </a>
          <div className="nav-links">
            <a href="#offers">Offers</a>
            <a href="#method">Method</a>
            <a href="#plan">Plan</a>
          </div>
        </nav>

        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <p className="kicker">Quality systems for predictable delivery</p>
            <h1>Turn QA bottlenecks into operating systems for release confidence.</h1>
            <p className="hero-text">
              QualityOps Studio helps CTOs, VP Engineering, and product leaders
              redesign how quality works across teams: faster regression, clearer
              ownership, smarter automation signal, and safer releases.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="mailto:viacheslav.v.melnikov@gmail.com?subject=Quality%20System%20Diagnostic">
                Book diagnostic call
              </a>
              <a className="secondary-button" href="#offers">
                View consulting offers
              </a>
            </div>
          </div>

          <aside className="diagnostic-panel" aria-label="Core diagnostic focus">
            <p className="panel-label">Release confidence advisory</p>
            <div className="signal-stack">
              <span>People</span>
              <span>Process</span>
              <span>Automation</span>
              <span>CI/CD</span>
              <span>Release Risk</span>
            </div>
            <p>
              Built from 20+ years in IT and hands-on QA leadership across telecom,
              fintech, enterprise software, infrastructure, and high-load product teams.
            </p>
          </aside>
        </div>
      </section>

      <section className="proof-band" aria-label="Selected results">
        {proof.map((item) => (
          <div className="proof-item" key={item.metric}>
            <strong>{item.metric}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="section two-column">
        <div>
          <p className="section-kicker">Positioning</p>
          <h2>Not outsourced testing. Not a generic automation vendor.</h2>
        </div>
        <div className="body-copy">
          <p>
            The work is for teams where quality has become an organizational
            constraint. The product is moving, the team is growing, but release
            confidence depends on slow regression, fragile automation, unclear
            ownership, and too much manual coordination.
          </p>
          <p>
            The consulting model combines senior QA leadership, engineering context,
            process design, automation strategy, and team enablement. The outcome is
            a quality system the team can operate without constant external help.
          </p>
        </div>
      </section>

      <section className="section signal-section">
        <div className="section-heading">
          <p className="section-kicker">When to call</p>
          <h2>Useful when quality problems are already visible in delivery.</h2>
        </div>
        <div className="signal-grid">
          {signals.map((signal) => (
            <div className="signal-card" key={signal}>
              {signal}
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="offers">
        <div className="section-heading">
          <p className="section-kicker">Consulting products</p>
          <h2>Three clear ways to buy the work.</h2>
        </div>
        <div className="offer-grid">
          {offers.map((offer) => (
            <article className="offer-card" key={offer.title}>
              <p className="offer-eyebrow">{offer.eyebrow}</p>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <ul>
                {offer.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section method-section" id="method">
        <div className="section-heading">
          <p className="section-kicker">Method</p>
          <h2>A practical operating-system approach to QA.</h2>
        </div>
        <div className="method-list">
          {method.map((item) => (
            <article className="method-row" key={item.step}>
              <span>{item.step}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section founder-section">
        <div>
          <p className="section-kicker">Led by Viacheslav Melnikov</p>
          <h2>Head of QA with the technical depth to inspect the system and the leadership range to change it.</h2>
        </div>
        <div className="founder-copy">
          <p>
            Experience includes scaling distributed QA teams, reducing regression
            runtime, designing onboarding systems, enabling QA ownership of CI/CD,
            building performance testing practices, and introducing AI-assisted
            workflows for Jira, Confluence, and test management.
          </p>
          <p>
            Domain background spans telecom, fintech, trading systems, enterprise
            software, SDN/NFV, infrastructure, document security, and SaaS-style
            product delivery.
          </p>
        </div>
      </section>

      <section className="section plan-section" id="plan">
        <div className="plan-card">
          <p className="section-kicker">Next step</p>
          <h2>Start with a focused diagnostic, then decide whether implementation support is worth it.</h2>
          <p>
            The first commercial experiment should be a fixed-scope Quality System
            Diagnostic. It is easier to buy, easier to deliver, and creates a natural
            path into a Regression Rescue Sprint or Fractional Head of QA engagement.
          </p>
          <a className="primary-button" href="mailto:viacheslav.v.melnikov@gmail.com?subject=Quality%20System%20Diagnostic">
            Discuss diagnostic
          </a>
        </div>
      </section>
    </main>
  );
}
