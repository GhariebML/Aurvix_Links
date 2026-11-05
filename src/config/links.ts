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

import ceoPortrait from '../assets/brand/ceo-portrait.webp';
import ctoPortrait from '../assets/brand/cto-portrait.webp';
import cfoPortrait from '../assets/brand/cfo-portrait.webp';

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
    url: 'https://www.aurvix.online/',
    icon: 'globe',
  },
  {
    id: 'nexaserve',
    label: 'NexaServe Platform',
    description: 'AI customer support platform',
    url: 'https://aurvix-one.vercel.app/nexaserve',
    icon: 'layers',
  },
  {
    id: 'services',
    label: 'Our Services',
    description: 'AI, automation, transformation',
    url: 'https://www.aurvix.online/solutions',
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

export interface LeaderLink {
  id: string;
  label: string;
  url: string;
  icon: IconName;
}

export interface Leader {
  name: string;
  role: string;
  /** Shown when there is no photo. */
  initials: string;
  /** Optional square image, imported at the top of this file. */
  photo?: ImageMetadata;
  links: LeaderLink[];
}

/** One card per person, shown below the links in this order. */
export const LEADERSHIP: { heading: string; people: Leader[] } = {
  heading: 'Leadership',
  people: [
    {
      name: 'Mohamed Gharieb',
      role: 'Chief Executive Officer',
      initials: 'MG',
      photo: ceoPortrait,
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
      ],
    },
    {
      name: 'Ahmed Eid',
      role: 'Chief Technology Officer',
      initials: 'AE',
      photo: ctoPortrait,
      links: [
        {
          id: 'cto-linkedin',
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/in/ahmed-1eid/',
          icon: 'linkedin',
        },
      ],
    },
    {
      name: 'Eslam Gharieb',
      role: 'Chief Financial Officer',
      initials: 'EG',
      photo: cfoPortrait,
      links: [
        {
          id: 'cfo-linkedin',
          label: 'LinkedIn',
          url: 'https://www.linkedin.com/in/eslam-gharieb-9a3725325/',
          icon: 'linkedin',
        },
      ],
    },
  ],
};
