import { redirect } from 'next/navigation';
import { getAlbumBySlug } from '@/content/albums';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AlbumBySlugPage({ params }: Props) {
  const resolved = await params;
  const album = getAlbumBySlug(resolved.slug);

  if (album) {
    redirect(`/social-views/photo-albums?album=${encodeURIComponent(album.slug)}`);
  }

  redirect('/social-views/photo-albums');
}
