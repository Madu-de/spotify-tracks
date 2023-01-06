export class Artist {
    public id: string = '';
    public imageSrc: string = '';
    public name: string = '';
    public link: string = '';

    constructor(imageSrc: string, name: string, link: string, id: string) {
        this.imageSrc = imageSrc;
        this.name = name;
        this.link = link;
        this.id = id;
    }

    static parseToArtist(item: any): Artist {
        return new Artist(
            item.images[1]?.url || 'assets/imgs/spotify.png',
            item.name,
            item.external_urls.spotify,
            item.id
        )
    }
}
