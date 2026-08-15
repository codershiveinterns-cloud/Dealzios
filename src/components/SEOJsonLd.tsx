import React from 'react';

interface SEOJsonLdProps {
  type: 'website' | 'organization' | 'store' | 'coupon' | 'faq' | 'breadcrumb';
  data: any;
}

export const SEOJsonLd: React.FC<SEOJsonLdProps> = ({ type, data }) => {
  let schema = {};

  if (type === 'website') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Dealzios',
      'url': 'https://dealzios.com',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://dealzios.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    };
  } else if (type === 'organization') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Dealzios',
      'url': 'https://dealzios.com',
      'logo': 'https://dealzios.com/logo.png',
      'sameAs': [
        'https://twitter.com/dealzios',
        'https://facebook.com/dealzios'
      ]
    };
  } else if (type === 'faq' && Array.isArray(data)) {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': data.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    };
  } else if (type === 'breadcrumb' && Array.isArray(data)) {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': data.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url
      }))
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
