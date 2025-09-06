import React from "react";

const CARD_DATA = [
  {
    icon: "bi-shield-check",
    title: "Secure Transactions",
    text: "AI monitors every transaction in real-time to flag anomalies and reduce fraud."
  },
  {
    icon: "bi-speedometer2",
    title: "Fast & Reliable",
    text: "Optimized flow ensures quick confirmations and minimal latency for users."
  },
  {
    icon: "bi-graph-up",
    title: "Insightful Analytics",
    text: "Clear dashboards and risk scores so you can make smarter decisions."
  }
];

export default function Home() {
  return (
    <main className="app-hero">
      <div className="container">
        <header className="text-center mb-5">
          <h1 className="fw-bold">
            Welcome to <span className="text-primary">Secure Pay</span>
          </h1>
          <p className="lead">
            Secure. Simple. Smarter digital payments powered by AI-driven fraud detection.
          </p>
        </header>

        <section className="row g-4">
          {CARD_DATA.map((c, i) => (
            <div key={i} className="col-md-6 col-lg-4">
              <article className="card flashcard h-100 p-3">
                <div className="card-body d-flex flex-column">
                  <div className="mb-3">
                    <div className="icon-circle bg-primary text-white d-inline-flex align-items-center justify-content-center">
                      <i className={`bi ${c.icon} fs-4`} aria-hidden="true"></i>
                    </div>
                  </div>

                  <h5 className="card-title">{c.title}</h5>
                  <p className="card-text">{c.text}</p>

                  <div className="mt-auto">
                    <small className="text-muted">Updated recently</small>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
