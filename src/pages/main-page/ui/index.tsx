import { Navigation } from '@/features/navigation';
import { ModeToggle } from '@/features/user';

export const MainPage = () => (
  <>
    <h1>Clean Service</h1>

    <div className="bg-red-500 p-4 text-white text-2xl">
      Если я красный — Tailwind работает!
    </div>

    <br />

    <ModeToggle />

    <Navigation />
  </>
);
