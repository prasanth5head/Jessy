const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function initializeAnalytics() {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) {
    return;
  }

  // Google Analytics 4 integration added here.
  // GA4 will automatically collect page views, unique visitors, device details,
  // country/city data, and real-time active users once this page_view event is sent.
  window.dataLayer = window.dataLayer || [];

  function gtag(...args) {
    window.dataLayer.push(args);
  }

  window.gtag = gtag;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
  });

  const trackPageView = () => {
    const pagePath = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    gtag("event", "page_view", {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  };

  trackPageView();

  // Track SPA-style navigation automatically without changing app routes or components.
  const originalPushState = window.history.pushState;
  window.history.pushState = function patchedPushState(state, title, url) {
    const result = originalPushState.apply(this, [state, title, url]);
    trackPageView();
    return result;
  };

  const originalReplaceState = window.history.replaceState;
  window.history.replaceState = function patchedReplaceState(state, title, url) {
    const result = originalReplaceState.apply(this, [state, title, url]);
    trackPageView();
    return result;
  };

  window.addEventListener("popstate", trackPageView);
  window.addEventListener("hashchange", trackPageView);
}
