import React from "react";

export default function Home() {
  return (
    <section className="container text-center py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="fw-bold display-5 text-dark mb-3" style={{ fontFamily: "Segoe UI, sans-serif" }}>
            Welcome to <span className="text-primary">AI Pay</span>
          </h1>
          <p className="fs-5 text-secondary" style={{ fontFamily: "Segoe UI, sans-serif" }}>
            Secure. Simple. Smarter digital payments powered by AI-driven fraud detection.
          </p>
        </div>
      </div>
    </section>
  );
}
