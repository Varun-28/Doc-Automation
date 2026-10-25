import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import { PageHero } from "./PageHero";

export function PolicyPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Policies" title={title}>
        <p className="lead">{intro}</p>
        <p className="updated">Last updated: {SITE.policiesUpdated}</p>
      </PageHero>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <article className="prose">{children}</article>
        </div>
      </section>
    </>
  );
}

export function ContactBlock() {
  return (
    <p>
      {SITE.legalName}
      <br />
      Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      <br />
      Phone: {SITE.phone}
      <br />
      Address: {[SITE.address.line1, SITE.address.line2, SITE.address.city, SITE.address.state, SITE.address.pincode, SITE.address.country].join(", ")}
    </p>
  );
}
