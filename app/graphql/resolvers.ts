import { MusicService } from '../service/MusicService.ts';
import {MusicPlatform} from "@prisma/client";


const musicService = new MusicService();
const resolvers = {
    getNumber() {
        return 6;
    },
    getUserSharedPlaylist({user_id, playlist_id}) {
        return musicService.getUserSharedPlaylist(user_id, playlist_id);
    },
    getUserSharedMusic( {user_id, music_id}) {
        return musicService.getUserSharedMusic(user_id, music_id);
    },
    getUserMedia({user_id}) {
        return musicService.getUserMedia(user_id);
    },
    getUserMediaToken({user_id}) {
        return musicService.getUserMediaToken(user_id);
    },
    getUserSharedPlaylists({user_id}) {
        return musicService.getUserSharedPlaylists(user_id);
    },
    getUserSharedMusics({user_id}) {
        return musicService.getUserSharedMusics(user_id);
    },
    postUserSharedPlaylist({ user_id, playlist_id }) {
        return musicService.postUserSharedPlaylist(user_id, playlist_id);
    },
    postUserSharedMusic({user_id, music_id}) {
        return musicService.postUserSharedMusic(user_id, music_id);
    },
    async setUserMedia({user_id, media_name}) {
        let token_account
        if(media_name == MusicPlatform.Spotify) {
           token_account  = await musicService.getSpotifyAccessToken();
        } else {
            return null;
        }
        return musicService.setUserMedia(user_id, token_account, media_name);
    }
};
export { resolvers }