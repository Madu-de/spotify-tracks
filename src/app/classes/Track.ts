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

    static parseToTrack(item: any): Track {
        return new Track(
            item.album?.images[1].url || item.images[1].url,
            item.name,
            item.album_group || item.type,
            item.artists[0].name,
            item.external_urls.spotify
        )
    }

}
