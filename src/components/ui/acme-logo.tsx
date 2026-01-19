import { Globe } from 'lucide-react';
import { lusitana } from '@/styles/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-inherit`}
    >
      <Globe className="h-8 w-8 rotate-12" />
      <p className="text-3xl">Acme</p>
    </div>
  );
}
