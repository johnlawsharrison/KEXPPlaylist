export class PlayRow {
    id: number;
    comment: Comment;
    dateCreated: Date;
    lastUpdated: Date;
    text: string;
    author: Author;
}

export class Comment {

}

export class Author {
    firstName: string;
    lastName: string;
}
