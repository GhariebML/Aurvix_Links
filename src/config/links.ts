/**
 * AURVIX LINKS: EDIT THIS FILE
 *
 * Every label, URL and piece of page text lives here. You do not need to touch the layout.
 *
 * To publish a link, replace TODO_URL with the full address, for example:
 *   url: 'https://your-address-here',
 *
 * A link left as TODO_URL shows as a non-clickable "Coming soon" row, so nobody lands on
 * a dead page, and the build prints a warning naming it.
 */

/** Marks a URL that AURVIX has not provided yet. */
export const TODO_URL = null;

export type IconName = 'globe' | 'layers' | 'grid' | 'whatsapp' | 'linkedin' | 'briefcase';

export interface LinkItem {
  /** Unique identifier. */
  id: string;
  /** Main text on the row. */
  label: string;
  /** Smaller text under the label. */
  description: string;
  /** Destination, or TODO_URL while it is not available. */
  url: string | typeof TODO_URL;
  icon: IconName;
}

export const BRAND = {
  name: 'AURVIX',
  descriptor: 'Technology Company',
  statement: 'Building Intelligent Technology',
  intro: 'AI-powered solutions that help businesses work smarter, automate operations, and grow.',
  footer: '© AURVIX | Technology Company',
} as const;

/** Rows appear on the page in this order. */
export const LINKS: LinkItem[] = [
  {
    id: 'website',
    label: 'Official Website',
    description: 'Who we are and what we build',
    url: TODO_URL, // TODO: add the official website URL
    icon: 'globe',
  },
  {
    id: 'nexaserve',
    label: 'NexaServe Platform',
    description: 'AI customer support platform',
    url: TODO_URL, // TODO: add the NexaServe URL
    icon: 'layers',
  },
  {
    id: 'services',
    label: 'Our Services',
    description: 'AI, automation, transformation',
    url: TODO_URL, // TODO: add the services page URL
    icon: 'grid',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    description: '+20 102 248 7565',
    url: 'https://wa.me/201022487565',
    icon: 'whatsapp',
  },
];

/** The Leadership card below the links. */
export const LEADERSHIP = {
  heading: 'Leadership',
  name: 'Mohamed Gharieb',
  initials: 'MG',
  role: 'Chief Executive Officer',
  links: [
    {
      id: 'ceo-portfolio',
      label: 'Portfolio',
      url: 'https://mohamed-gharieb-portfolio.vercel.app/',
      icon: 'briefcase',
    },
    {
      id: 'ceo-linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ghariebml/',
      icon: 'linkedin',
    },
  ] satisfies { id: string; label: string; url: string; icon: IconName }[],
};
