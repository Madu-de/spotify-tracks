export class Artist {
    public imageSrc: string = '';
    public name: string = '';
    public link: string = '';

    constructor(imageSrc: string, name: string, link: string) {
        this.imageSrc = imageSrc;
        this.name = name;
        this.link = link;
    }
}
