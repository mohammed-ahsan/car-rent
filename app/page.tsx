import { HomeProps } from '@/types';
import { Hero, Feed } from '@/components';

export default async function Home({ searchParams }: HomeProps) {
  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <Feed searchParams={searchParams} />
      </div>
    </main>
  );
}
