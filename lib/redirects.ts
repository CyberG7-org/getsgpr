export const REDIRECTS = [
  { source: "/home", destination: "/", permanent: true },
  { source: "/about-us", destination: "/about", permanent: true },
  { source: "/contactus", destination: "/contact", permanent: true },
  { source: "/book-a-call", destination: "/contact", permanent: true },
  { source: "/service", destination: "/services", permanent: true },
  { source: "/package", destination: "/packages", permanent: true },
  { source: "/privacy-policy", destination: "/privacy-data-security", permanent: true },
  { source: "/terms-of-use", destination: "/privacy-data-security#terms", permanent: true },
] as const;
