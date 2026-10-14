export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  children?: NavItem[];
}

export const navigationMenu: NavItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'IHMAAA',
    href: '/ihmaaa/about-us',
    children: [
      {
        title: 'About Us',
        href: '/ihmaaa/about-us',
      },
      {
        title: "Chairman's Message",
        href: '/ihmaaa/about-us/chairmans-message',
      },
      {
        title: "President's Message",
        href: '/ihmaaa/about-us/president-s-message',
      },
      {
        title: "Founder Principal's Message",
        href: '/ihmaaa/about-us/founder-principal-s-message',
      },
      {
        title: 'Office Bearers',
        href: '/ihmaaa/about-us/office-bearers',
      },
      {
        title: "Member's List",
        href: '/ihmaaa/about-us/member-s-list',
      },
      {
        title: 'Memorandum of Association',
        href: '/ihmaaa/aims-objectives/memorandum-of-association',
      },
      {
        title: 'Article of Association',
        href: '/ihmaaa/aims-objectives/article-of-association',
      },
      {
        title: 'Downloads',
        href: '/ihmaaa/aims-objectives/downloads',
      },
    ],
  },
  {
    title: 'Curriculum Vitae',
    href: '/curriculum-vitae',
  },
  {
    title: 'Vacancies',
    href: '/vacancies/hotels-restaurants',
    children: [
      {
        title: 'Hotels & Restaurants',
        href: '/vacancies/hotels-restaurants',
      },
    ],
  },
  {
    title: 'News & Events',
    href: '/news-events/ihmaaa-news',
  },
  {
    title: 'Social Views',
    href: '/social-views/photo-albums',
    children: [
      {
        title: 'Photo Albums',
        href: '/social-views/photo-albums',
      },
      {
        title: 'IHMAAA Reunion 2016',
        href: '/social-views/user-page-blog',
      },
      {
        title: 'Social Connect',
        href: '/social-views/social-connect',
      },
    ],
  },
  {
    title: 'Sponsors',
    href: '/sponsors',
  },
  {
    title: 'Contact',
    href: '/contact-us',
  },
];
