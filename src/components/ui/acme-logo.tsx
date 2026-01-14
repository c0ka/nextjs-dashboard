import { Globe } from 'lucide-react';
import { lusitana } from '@/styles/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Globe className="h-10 w-10 rotate-12" />
      <p className="text-4xl">Acme</p>
    </div>
  );
}
