export class Artist {
    public imageSrc: string = '';
    public name: string = '';
    public link: string = '';

    constructor(imageSrc: string, name: string, link: string) {
        this.imageSrc = imageSrc;
        this.name = name;
        this.link = link;
    }

    static parseToArtist(item: any): Artist {
        return new Artist(
            item.images[1]?.url || 'assets/imgs/spotify.png',
            item.name,
            item.external_urls.spotify
        )
    }
}
