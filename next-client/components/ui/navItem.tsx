import { cn } from '@/lib';
import { Icon } from './icon';

type Props = {
  logoPath: string;
  title: string;
  href: string;
  active?: boolean;
};

const svg = {
  home: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 13.02V15C2 20 4 22 9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9"
        stroke="#4257f4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.38 15.2702V7.58023C18.38 6.81023 17.76 6.25024 17 6.31024H16.96C15.62 6.42024 13.59 7.11025 12.45 7.82025L12.34 7.89026C12.16 8.00026 11.85 8.00026 11.66 7.89026L11.5 7.79025C10.37 7.08025 8.34 6.41023 7 6.30023C6.24 6.24023 5.62 6.81025 5.62 7.57025V15.2702C5.62 15.8802 6.11998 16.4602 6.72998 16.5302L6.90997 16.5602C8.28997 16.7402 10.43 17.4502 11.65 18.1202L11.68 18.1302C11.85 18.2302 12.13 18.2302 12.29 18.1302C13.51 17.4502 15.66 16.7502 17.05 16.5602L17.26 16.5302C17.88 16.4602 18.38 15.8902 18.38 15.2702Z"
        stroke="#4257f4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9999 8.1001V17.6601"
        stroke="#4257f4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  cases: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1"
        stroke="#4257f4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9"
        stroke="#4257f4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  book: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 13.02V15C2 20 4 22 9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9"
        stroke="#4257f4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.38 15.2702V7.58023C18.38 6.81023 17.76 6.25024 17 6.31024H16.96C15.62 6.42024 13.59 7.11025 12.45 7.82025L12.34 7.89026C12.16 8.00026 11.85 8.00026 11.66 7.89026L11.5 7.79025C10.37 7.08025 8.34 6.41023 7 6.30023C6.24 6.24023 5.62 6.81025 5.62 7.57025V15.2702C5.62 15.8802 6.11998 16.4602 6.72998 16.5302L6.90997 16.5602C8.28997 16.7402 10.43 17.4502 11.65 18.1202L11.68 18.1302C11.85 18.2302 12.13 18.2302 12.29 18.1302C13.51 17.4502 15.66 16.7502 17.05 16.5602L17.26 16.5302C17.88 16.4602 18.38 15.8902 18.38 15.2702Z"
        stroke="#4257f4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9999 8.1001V17.6601"
        stroke="#4257f4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  user: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.4299 2.42C11.3999 1.86 12.5999 1.86 13.5799 2.42L19.5199 5.84999C20.4899 6.40999 21.0899 7.45003 21.0899 8.58003V15.42C21.0899 16.54 20.4899 17.58 19.5199 18.15L13.5799 21.58C12.6099 22.14 11.4099 22.14 10.4299 21.58L4.48992 18.15C3.51992 17.59 2.91992 16.55 2.91992 15.42V8.58003C2.91992 7.46003 3.51992 6.41999 4.48992 5.84999L6.38992 4.75002"
        stroke="#4257f4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9999 10.9998C13.2867 10.9998 14.3299 9.95662 14.3299 8.6698C14.3299 7.38298 13.2867 6.33984 11.9999 6.33984C10.7131 6.33984 9.66992 7.38298 9.66992 8.6698C9.66992 9.95662 10.7131 10.9998 11.9999 10.9998Z"
        stroke="#4257f4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 16.6599C16 14.8599 14.21 13.3999 12 13.3999C9.79 13.3999 8 14.8599 8 16.6599"
        stroke="#4257f4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
// !Здесь говно код
export const NavItem = ({ logoPath, title, href, active }: Props) => {
  const logoSvg = logoPath.split('/').pop()?.split('.').shift() || 'home';
  const logoElement = svg[logoSvg as keyof typeof svg] || svg['home'];

  return (
    <li>
      <a href={href}>
        <div className={cn('flex flex-col items-center justify-center', active && 'text-acent')}>
          {/* !Здесь говно код */}
          {active ? logoElement : <Icon path={logoPath} />}

          <span className="mt-2 text-[12px]">{title}</span>
        </div>
      </a>
    </li>
  );
};
