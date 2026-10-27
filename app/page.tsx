import { SpinnerIcon } from '@phosphor-icons/react/ssr';
import { Button } from '@/styles/primitives/Button';

export default function Home() {
  return (
    <div className="p-6">
      <Button variant="outline" leftIcon={<SpinnerIcon />}>
        Hello World!
      </Button>
    </div>
  );
}
