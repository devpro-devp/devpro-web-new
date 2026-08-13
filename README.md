# DevPro Website

Static marketing site for DevPro, a Business Technology & Network Infrastructure Partner.

## Architecture

- Plain semantic HTML: fast to serve, indexable without a build step, and simple to deploy.
- One local design system in `assets/css/site.css`.
- One dependency-free interaction layer in `assets/js/site.js` for navigation and the project-brief modal.
- Each solution has a dedicated landing page with a clear problem, delivery scope, and next step.

## Primary pages

- `index.html` — positioning, capability overview, FAQ, and conversion path.
- `network.html` — enterprise network infrastructure.
- `isp.html` — ISP business solution.
- `starlink.html` — managed connectivity for remote sites.
- `datacenter.html` — infrastructure, devices, and data-center readiness.
- `integration.html` — technology integration.

## Deployment notes

Deploy the repository root as a static site. Configure the host to serve `404.html` as its not-found document and preserve the HTTPS `devpro.co.id` canonical host.

Before launch, verify that `contact@devpro.co.id` is the intended lead-routing address and connect analytics or CRM form handling if a server-side lead workflow is required.

## Verified media required

The redesigned pages intentionally avoid stock placeholders and fabricated project proof. Add only verified DevPro media in a future content pass:

- Homepage hero: one wide field-deployment image, preferably an engineer working on network or connectivity infrastructure.
- Operational proof: one rack or cabinet detail and one installation/testing detail.
- Managed Connectivity: one verified Starlink installation or remote-site deployment.
- ISP Business Solution: one NOC, core-router, or field-access deployment image with permission to publish.

Prepare AVIF and WebP variants, include intrinsic dimensions, and keep the original source outside the web bundle. Below-fold images must use `loading="lazy"`; a future hero image must be responsive and preloaded only when it becomes the LCP element.
