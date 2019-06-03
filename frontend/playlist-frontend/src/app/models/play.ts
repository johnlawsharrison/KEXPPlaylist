
/**
 * Play represents a play row in the context of the frontend application
 * most fields are reflected from the KEXP playlist API model, with
 * the addition of a `comment` field for use with this app's comments
 *
 * I chose not to display comments from the live KEXP app, so that it will
 * be easier to demo my own comment model
 */
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


/**
 * Comment represents a play row comment made by a KEXP user
 */
export class Comment {
    id: number;
    'comment_text': string;
    'play_id': number;
    'date_created': string; // Date.toISOString()
    'last_updated': string; // Date.toISOString()
    author: Author; // author id
}


/**
 * Author represents a comment author
 */
export class Author {
    id: number;
    'first_name': string;
    'last_name': string;
    role: string;
    'total_comments': number;
}


/**
 * Link represents a link associated with a play
 *
 * This is intended for use in persisting links to the backend separately from comments
 * for normalization purposes (discussion around this welcome)
 */
export class Link {
    'link_url': string;
    'play_id': string;
}
