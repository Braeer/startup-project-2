'use client';

import { BackScreenTitle } from '@/components/index';
import { handbookName } from '@/lib';
import { TypesModuleHandbooks } from '@/module/handbook/types';

import { useParams } from 'next/navigation';

export default function Page() {
  const router = useParams();

  if (!router.slug || Array.isArray(router.slug)) {
    return null;
  }

  const slug = router.slug;

  return (
    <>
      <BackScreenTitle title={handbookName(slug)} sizeText="md" />
      <TypesModuleHandbooks slug={slug} />
    </>
  );
}
