const fs = require('fs');
const path = require('path');

const base = path.join(process.cwd(), 'public/images/eventgallery');

const albumMeta = {
  'IHMAAA Reunion 2016 At Crowne Plaza Ahmedabad': {
    id: '1',
    slug: 'ihmaaa-reunion-2016-crowne-plaza-ahmedabad',
    aliases: ['IHMAAA Reunion 2016 At Crowne Plaza Ahmedabad', 'reunion-2016-crowne-plaza'],
    title: 'IHMAAA Reunion 2016 At Crowne Plaza Ahmedabad',
    date: 'April 03, 2016',
    category: 'Reunions & Meets',
    description: 'Memorable reunion celebration evening, networking banquet, and batch celebrations at Hotel Crowne Plaza Ahmedabad.',
    cover: 'crwnplz_DSC_006.jpg'
  },
  'IHMAAA Reunion 2016 At IHM Campus Gandhinagar': {
    id: '2',
    slug: 'ihmaaa-reunion-2016-ihm-campus-gandhinagar',
    aliases: ['IHMAAA Reunion 2016 At IHM Campus Gandhinagar', 'reunion-2016-campus-gandhinagar'],
    title: 'IHMAAA Reunion 2016 At IHM Campus Gandhinagar',
    date: 'April 03, 2016',
    category: 'Reunions & Meets',
    description: 'Alumni homecoming visit, campus walk, interactive faculty sessions, and group photographs at the Gandhinagar campus.',
    cover: 'gndnrg_DSC_001.jpg'
  },
  'IHMAAA Reunion 2016 At Old IHM Polytechnic Institute': {
    id: '3',
    slug: 'ihmaaa-reunion-2016-old-ihm-polytechnic',
    aliases: ['IHMAAA Reunion 2016 At Old IHM Polytechnic Institute', 'reunion-2016-old-polytechnic'],
    title: 'IHMAAA Reunion 2016 At Old IHM Polytechnic Institute',
    date: 'April 03, 2016',
    category: 'Reunions & Meets',
    description: 'Nostalgic walk down memory lane at the historic Old Polytechnic campus building where IHM Ahmedabad first began.',
    cover: 'amdbi_DSC_002.jpg'
  },
  'IHMAAA Annual Alumni Meet 03-04-2016': {
    id: '4',
    slug: 'ihmaaa-annual-alumni-meet-03-04-2016',
    aliases: ['IHMAAA Annual Alumni Meet 03-04-2016', 'annual-alumni-meet-2016'],
    title: 'IHMAAA Annual Alumni Meet 03-04-2016',
    date: 'April 03, 2016',
    category: 'Reunions & Meets',
    description: 'Annual general meeting, keynote addresses by institute leaders, executive committee updates, and alumni felicitations.',
    cover: '20160403_150220.jpg'
  },
  'IHM-Ahmedabad Annual Function 06-04-2016': {
    id: '5',
    slug: 'ihm-ahmedabad-annual-function-06-04-2016',
    aliases: ['IHM-Ahmedabad Annual Function 06-04-2016', 'annual-function-2016'],
    title: 'IHM-Ahmedabad Annual Function 06-04-2016',
    date: 'April 06, 2016',
    category: 'Annual Celebrations & Awards',
    description: 'Annual college day cultural celebrations, stage presentations, culinary showcases, and academic honours.',
    cover: 'IMG-20160407-WA0001.jpg'
  },
  'Alumni Batches': {
    id: '6',
    slug: 'alumni-batches-1972-2016',
    aliases: ['Alumni Batches', 'alumni-batches'],
    title: 'Alumni Batches & Group Portraits',
    date: '1981 - 2017',
    category: 'Batches',
    description: 'Archival batch group portraits spanning graduating years of IHM Ahmedabad (1981, 1997, 1999-2002, 2006, 2007, 2011-2017).',
    cover: '1997.jpg'
  },
  'IHM Ahmedabad Annual Day': {
    id: '7',
    slug: 'ihm-ahmedabad-annual-day-2014',
    aliases: ['IHM Ahmedabad Annual Day', 'ihm-ahmedabad-annual-day'],
    title: 'IHM Ahmedabad Annual Day Celebrations',
    date: 'March 2014',
    category: 'Annual Celebrations & Awards',
    description: 'Annual Day festivities, cultural events, student awards, culinary competitions, and alumni felicitations.',
    cover: '1.JPG'
  },
  'Awards-Farewell-2014-Batch': {
    id: '8',
    slug: 'Awards-Farewell-2014-Batch',
    aliases: ['Awards-Farewell-2014-Batch', 'awards-farewell-2014'],
    title: 'IHMAAA Alumni Awards at Farewell 2014 Batch',
    date: '2014',
    category: 'Annual Celebrations & Awards',
    description: 'Dr. J. K. Mangaraj - Principal IHM Ahmedabad, distributing IHMAAA Alumni Awards at the Farewell ceremony for the 2014 Batch.',
    cover: '10.JPG'
  },
  'Reunion 2014': {
    id: '9',
    slug: 'reunion-2014',
    aliases: ['Reunion 2014'],
    title: 'IHMAAA Alumni Reunion 2014',
    date: '2014',
    category: 'Reunions & Meets',
    description: 'Memories and gatherings from the 2014 Alumni Meet and Reunion celebrations.',
    cover: 'f1-1.jpg'
  },
  'IHM Ahmedabad 2014': {
    id: '10',
    slug: 'ihm-ahmedabad-2014',
    aliases: ['IHM Ahmedabad 2014'],
    title: 'IHM Ahmedabad Campus Life 2014',
    date: '2014',
    category: 'Campus Life & Galleria',
    description: 'Moments from student activities, practical culinary sessions, and institute life during 2014.',
    cover: 'h1.JPG'
  },
  'Galleria': {
    id: '11',
    slug: 'galleria',
    aliases: ['Galleria'],
    title: 'Institute Galleria',
    date: 'Archives',
    category: 'Campus Life & Galleria',
    description: 'Institute infrastructure, campus facilities, hospitality training kitchens, and student premises.',
    cover: 'I1.jpg'
  },
  'IHM': {
    id: '12',
    slug: 'ihm-campus',
    aliases: ['IHM'],
    title: 'IHM Campus Memories',
    date: 'Archives',
    category: 'Campus Life & Galleria',
    description: 'Archival photographs capturing campus grounds, facilities, and academic life.',
    cover: 'h1.JPG'
  }
};

const dirs = fs.readdirSync(base, { withFileTypes: true }).filter(d => d.isDirectory());

const albums = [];

dirs.forEach(d => {
  const dirName = d.name;
  const meta = albumMeta[dirName];
  if (!meta) return;
  const dirPath = path.join(base, dirName);
  const files = fs.readdirSync(dirPath).filter(f => {
    const p = path.join(dirPath, f);
    return fs.statSync(p).isFile() && /\.(jpe?g|png|webp)$/i.test(f);
  });

  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  const photos = files.map(f => {
    const encodedFolder = encodeURIComponent(dirName);
    const encodedFile = encodeURIComponent(f);
    return {
      src: `/images/eventgallery/${encodedFolder}/${encodedFile}`,
      thumb: `/images/eventgallery/${encodedFolder}/${encodedFile}`,
      fileName: f,
      title: f.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
    };
  });

  const coverFile = meta.cover && files.includes(meta.cover) ? meta.cover : files[0];
  const encodedFolder = encodeURIComponent(dirName);
  const encodedCover = encodeURIComponent(coverFile);

  albums.push({
    id: meta.id,
    slug: meta.slug,
    aliases: meta.aliases,
    folder: dirName,
    title: meta.title,
    date: meta.date,
    category: meta.category,
    description: meta.description,
    coverImage: `/images/eventgallery/${encodedFolder}/${encodedCover}`,
    photoCount: photos.length,
    photos: photos
  });
});

const order = ['1', '2', '3', '4', '6', '5', '7', '8', '9', '10', '11', '12'];
albums.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

const code = `// Auto-generated photo albums dataset from eventgallery
export interface AlbumPhoto {
  src: string;
  thumb: string;
  fileName: string;
  title: string;
}

export interface PhotoAlbum {
  id: string;
  slug: string;
  aliases: string[];
  folder: string;
  title: string;
  date: string;
  category: string;
  description: string;
  coverImage: string;
  photoCount: number;
  photos: AlbumPhoto[];
}

export const photoAlbums: PhotoAlbum[] = ${JSON.stringify(albums, null, 2)};

export function getAlbumBySlug(slug: string): PhotoAlbum | undefined {
  if (!slug) return undefined;
  const normalized = decodeURIComponent(slug).toLowerCase().trim();
  return photoAlbums.find(a => 
    a.slug.toLowerCase() === normalized ||
    a.id === normalized ||
    a.aliases.some(alias => alias.toLowerCase() === normalized) ||
    a.folder.toLowerCase() === normalized
  );
}
`;

fs.writeFileSync(path.join(process.cwd(), 'src/content/albums.ts'), code, 'utf8');
console.log('Successfully wrote src/content/albums.ts with', albums.length, 'albums and', albums.reduce((acc, a) => acc + a.photoCount, 0), 'total photos!');
