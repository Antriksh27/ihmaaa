import { redirect } from 'next/navigation';
import { getAlbumBySlug } from '@/content/albums';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function LegacyEventGalleryPage({ params }: Props) {
  const resolved = await params;
  const slugStr = Array.isArray(resolved.slug) ? resolved.slug.join('/') : resolved.slug;
  const album = getAlbumBySlug(slugStr);

  if (album) {
    redirect(`/social-views/photo-albums?album=${encodeURIComponent(album.slug)}`);
  }

  redirect('/social-views/photo-albums');
}
