export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://mysha-transport.vercel.app/#organization",
        "name": "MYSHA Transport LLC",
        "legalName": "MYSHA Transport LLC",
        "description": "Leading transportation and logistics company in Dubai, UAE. Providing reliable logistics services across GCC since 2023.",
        "url": "https://mysha-transport.vercel.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://mysha-transport.vercel.app/GALLERY/favicon_io (2)/apple-touch-icon.png",
          "width": 180,
          "height": 180
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+971-50-1234567",
          "contactType": "customer service",
          "availableLanguage": ["en", "ar"]
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "AE",
          "addressLocality": "Dubai",
          "addressRegion": "Dubai",
          "postalCode": "",
          "streetAddress": "Dubai, United Arab Emirates"
        },
        "sameAs": [
          "https://www.linkedin.com/company/mysha-transport",
          "https://www.facebook.com/mysha-transport"
        ],
        "areaServed": [
          "Dubai",
          "Abu Dhabi",
          "Sharjah",
          "Ajman",
          "Umm Al Quwain",
          "Ras Al Khaimah",
          "Fujairah",
          "Saudi Arabia",
          "Oman",
          "Qatar",
          "Kuwait",
          "Bahrain"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://mysha-transport.vercel.app/#website",
        "url": "https://mysha-transport.vercel.app",
        "name": "MYSHA Transport",
        "description": "Leading transportation and logistics company in Dubai, UAE. Reliable services across GCC with 105+ trucks.",
        "publisher": {
          "@id": "https://mysha-transport.vercel.app/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://mysha-transport.vercel.app/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://mysha-transport.vercel.app/#localbusiness",
        "name": "MYSHA Transport LLC",
        "description": "Professional transportation and logistics services in Dubai, UAE. Cross-border cargo transport across GCC.",
        "url": "https://mysha-transport.vercel.app",
        "telephone": "+971-50-1234567",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "AE",
          "addressLocality": "Dubai",
          "addressRegion": "Dubai",
          "streetAddress": "Dubai, United Arab Emirates"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 25.2048,
          "longitude": 55.2708
        },
        "openingHours": "Mo-Su 00:00-23:59",
        "priceRange": "$$",
        "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
        "currenciesAccepted": "AED",
        "areaServed": "United Arab Emirates, Saudi Arabia, Oman, Qatar, Kuwait, Bahrain"
      },
      {
        "@type": "Service",
        "@id": "https://mysha-transport.vercel.app/services/#service",
        "name": "Transportation & Logistics Services",
        "description": "Comprehensive transportation services including cross-border transport, heavy cargo, logistics solutions across UAE and GCC.",
        "provider": {
          "@id": "https://mysha-transport.vercel.app/#organization"
        },
        "serviceType": [
          "Freight Transport",
          "Logistics Services",
          "Heavy Cargo Transport",
          "Cross-Border Transportation",
          "Fleet Management"
        ],
        "areaServed": "UAE and GCC countries"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  );
}
