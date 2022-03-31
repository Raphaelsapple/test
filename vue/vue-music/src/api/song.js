export default class Song
{
  constructor ({id,musicrid,artist,name,album,duration,image,url,isListenFee}) {
    this.id = id;
    this.musicrid = musicrid;
    this.artist = artist;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
    this.isListenFee = isListenFee;
  }
}

export function createSong(musicData){
  return new Song({
    id:musicData.id,
    musicrid:musicData.musicrid,
    artist:musicData.artist,
    name:musicData.name,
    album:musicData.album,
    duration:musicData.duration,
    image:musicData.albumpic,
    url:musicData.url,
    isListenFee:musicData.isListenFee,
  })

}
