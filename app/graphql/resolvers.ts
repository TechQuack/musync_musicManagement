import { MusicService } from '../service/MusicService.ts';
import {MusicPlatform} from "@prisma/client";
import { updateSharedMusic, updateSharedPlaylist, updateMusicalPreferences } from "../kafka/producer.ts"


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
    async postUserSharedPlaylist({user_id, playlist_id}) {
        let response = musicService.postUserSharedPlaylist(user_id, playlist_id);
        await updateSharedPlaylist(await musicService.getUserSharedPlaylist(user_id, playlist_id));
        return response;
    },
    async postUserSharedMusic({user_id, music_id}) {
        let response = musicService.postUserSharedMusic(user_id, music_id);
        await updateSharedMusic(await musicService.getUserSharedMusic(user_id, music_id))
        return response
    },
    async setUserMedia({user_id, media_name}) {
        let token_account
        if(media_name == MusicPlatform.Spotify) {
           token_account  = await musicService.getSpotifyAccessToken();
        } else {
            return null;
        }
        let response = musicService.setUserMedia(user_id, token_account, media_name);
        await updateMusicalPreferences(await response)
        return response;
    }
};
export { resolvers }