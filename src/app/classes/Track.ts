export class Track {
    public imageSrc: string = '';
    public title: string = '';
    public type: string = '';
    public artist: string = '';
    public link: string = '';

    constructor(imageSrc: string, title: string, type: string, artist: string, link: string) {
        this.imageSrc = imageSrc;
        this.title = title;
        this.type = type;
        this.artist = artist;
        this.link = link;
    }
}
