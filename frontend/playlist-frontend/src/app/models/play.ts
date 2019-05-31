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
    comment: Comment; // this app's comments? (maybe merge this with comments[])
    label: any;
    comments: any[];
    showid: number;
}

export class Comment {
    commentText: string;
}

export class Author {
    firstName: string;
    lastName: string;
}
