const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Path under the deployed base, e.g. `asset('/icons/x.png')`. */
export const asset = (path: string) => `${base}${path}`;

/** Absolute URL under the deployed base. */
export const absolute = (path: string) => new URL(asset(path), import.meta.env.SITE).href;

export const SITE_URL = absolute('/');
export const ORIGIN = new URL(import.meta.env.SITE).origin;
export const LINKEDIN = 'https://www.linkedin.com/in/dr-pavani-utti/';

export const PROJECTS = [
  {
    name: 'NEET PG Cutoff Explorer',
    url: `${ORIGIN}/neet-pg-cutoff-explorer/`,
    description:
      'College-wise NEET PG closing ranks for every MD, MS, DNB and Diploma course, quota, category and MCC counselling round (2023–2025), with a rank predictor. Built from the official MCC allotment PDFs.',
    keywords: ['NEET PG cutoff', 'MD/MS closing ranks', 'MCC counselling', 'Rank predictor'],
  },
  {
    name: 'NEET SS Cutoff Explorer',
    url: `${ORIGIN}/neet-ss-cutoff-explorer/`,
    description:
      'Group-wise and college-wise NEET SS closing ranks for every DM, MCh and DNB Super Speciality course and MCC round (2023–2025), with a rank predictor. Built from the official MCC allotment PDFs.',
    keywords: ['NEET SS cutoff', 'DM/MCh closing ranks', 'Super speciality counselling', 'Rank predictor'],
  },
] as const;
