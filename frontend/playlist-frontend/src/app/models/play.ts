export class Play {
    playid: number;
    playtype: any;
    airdate: Date;
    'epoch_airdate': number;
    'epoch_airdate_v2': string;
    'archive_urls': any;
    'artist': any;
    'release': any;
    releaseevent: any;
    track: any;
    label: any;
    comments: any[]; // KEXP's actual comments
    comment: Comment; // comments introduced by this app (these may be merged eventually)
    showid: number;
}

export class Comment {
    id: number;
    'comment_text': string;
    'play_id': number;
    'date_created': string; // Date.toISOString()
    'last_updated': string; // Date.toISOString()
    author: Author; // author id
}

export class Author {
    id: number;
    'first_name': string;
    'last_name': string;
    role: string;
    'total_comments': number;
}

export class Link {
    'link_url': string;
    'play_id': string;
}
