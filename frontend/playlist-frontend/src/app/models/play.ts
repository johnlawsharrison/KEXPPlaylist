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

// {
//     "playid": 2664056,
//       "playtype": {
//         "playtypeid": 1,
//         "name": "Media play"
//       },
//       "airdate": "2019-05-30T20:39:21Z",
//       "epoch_airdate": 1559248761000,
//       "epoch_airdate_v2": "/Date(1559248761000)/",
//       "archive_urls": {
//         "32": "http://50.234.71.239:8090/stream-32.mp3?date=2019-05-30T20:39:21Z",
//         "64": "http://50.234.71.239:8090/stream-64.mp3?date=2019-05-30T20:39:21Z",
//         "128": "http://50.234.71.239:8090/stream-128.mp3?date=2019-05-30T20:39:21Z",
//         "256": "http://50.234.71.239:8090/stream-256.mp3?date=2019-05-30T20:39:21Z"
//       },
//       "artist": {
//         "artistid": 184683,
//         "name": "New Age Healers",
//         "islocal": true
//       },
//       "release": {
//         "releaseid": 349445,
//         "name": "Debris",
//         "largeimageuri": null,
//         "smallimageuri": null
//       },
//       "releaseevent": {
//         "releaseeventid": 704348,
//         "year": 2019
//       },
//       "track": {
//         "trackid": 1376647,
//         "name": "A Message From The Past"
//       },
//       "label": {
//         "labelid": 71350,
//         "name": "[no label]"
//       },
//       "comments": [
//         {
//           "commentid": 1230367,
//           "text": " "
//         }
//       ],
//       "showid": 103857
//     }
// }

// export class Comment {
//     commentText: string;
// }

// export class Author {
//     firstName: string;
//     lastName: string;
// }
