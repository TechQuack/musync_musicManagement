import {MusicPlatform, PrismaClient, UserMusicPlatform, UserSharedMusic, UserSharedPlaylist} from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Manipulate entities for music management like users' music account and platform preferences.
 */
class MusicService {

    // REQUESTS

    /**
     * getUserSharedPlaylists : return the promise of an array containing all the playlist shared by the user
     * @param userId
     * @return Promise<Array<UserSharedPlaylist>>
     */
    async getUserSharedPlaylists(userId: Number): Promise<Array<UserSharedPlaylist>> {
        return await prisma.userSharedPlaylist.findMany({
            where: {
                user_id: userId
            }
        }).then();
    }

    /**
     * getUserSharedPlaylist : return the promise of the playlist shared by the user going by playlistId
     * @param userId
     * @param playlistId
     * @return Promise<Array<UserSharedPlaylist>>
     */
    async getUserSharedPlaylist(userId: Number, playlistId: Number): Promise<UserSharedPlaylist> {
        return prisma.userSharedPlaylist.findFirst({
            where: {
                user_id: userId,
                playlist_id: playlistId
            }
        }).then();
    }

    /**
     * getUserSharedMusic : return the promise of an array containing all the music shared by the user
     * @param userId
     * @return Promise<Array<UserSharedMusic>>
     */
    async getUserSharedMusics(userId: Number): Promise<Array<UserSharedMusic>> {
        return await prisma.userSharedMusic.findMany({
            where: {
                user_id: userId
            }
        }).then();
    }

    /**
     * getUserSharedMusic : return the promise of the music shared by the user going by musicId
     * @param userId
     * @param musicId
     * @return Promise<Array<UserSharedPlaylist>>
     */
    async getUserSharedMusic(userId: Number, musicId: Number): Promise<UserSharedMusic> {
        return prisma.userSharedMusic.findFirst({
            where: {
                user_id: userId,
                music_id: musicId
            }
        }).then();
    }

    /**
     * getUserSharedPlaylist : return the promise of a string indicating the music media
     * @param userId
     * @return Promise<Array<UserSharedPlaylist>>
     */
    async getUserMedia(userId: Number): Promise<String> {
        return prisma.userMusicPlatform.findUnique({
            where: {
                user_id: userId,
            }
        }).then((object) => object != null ?
            this.getMusicPlatformName(object.music_media) : null
        );
    }

    /**
     * getUserSharedPlaylist : return the promise of an array containing all the music shared by the user
     * @param userId
     * @return Promise<String>
     */
    async getUserMediaToken(userId: Number): Promise<String> {
        return prisma.userMusicPlatform.findUnique({
            where: {
                user_id: userId
            }
        }).then( (object) => object != null ? object.token_account : null);
    }

    // COMMANDS

    /**
     * postUserSharedPlaylist: register the new entry userSharedPlaylist with given user and playlist ids
     * @param userId
     * @param playlistId
     */
    async postUserSharedPlaylist(userId: Number, playlistId: Number){
        let alreadyExist = await prisma.userSharedPlaylist.findFirst(
            {
                where: {
                    playlist_id: playlistId,
                    user_id: userId
                }
            }
        ).then((object) => object != null);
        let userSharedPlaylist;

        // Check if the entry already exist
        if (!alreadyExist) {
            userSharedPlaylist = {
                playlist_id : playlistId,
                user_id : userId
            }
        } else {
            throw Error("This user shared playlist already exist");
        }

        // Pass 'userSharedPlaylist' object into query
        return prisma.userSharedPlaylist.create({data: userSharedPlaylist});
    }

    /**
     * postUserSharedMusic: register the new entry userSharedMusic with given user and music ids
     * @param userId
     * @param musicId
     */
    async postUserSharedMusic(userId: Number, musicId: Number){
        let alreadyExist = await prisma.userSharedMusic.findFirst(
            {
                where: {
                    music_id: musicId,
                    user_id: userId
                }
            }
        ).then((object) => object != null);
        let userSharedMusic;

        // Check if the entry already exist
        if (!alreadyExist) {
            userSharedMusic = {
                music_id : musicId,
                user_id : userId
            }
        } else {
            throw Error("This user shared playlist already exist");
        }

        // Pass 'userSharedPlaylist' object into query
        return prisma.userSharedMusic.create({data: userSharedMusic});
    }

    /**
     * setUserMedia: register a new entry for
     * @param userId
     * @param tokenAccount
     * @param mediaName
     */
    async setUserMedia(userId: Number, tokenAccount:String, mediaName: String): Promise<UserMusicPlatform> {
        let musicPlatform = this.getMusicPlatformFromString(mediaName);
        if(musicPlatform == MusicPlatform.Unknown) {
            throw new Error("Incorrect media name")
        }
        let userPlatform = await prisma.userMusicPlatform.findFirst(
            {
                where: {
                    user_id: userId
                }
            }
        ).then((object) => object != null ? object.music_media : null);
        let userMedia = {
            user_id : userId,
            token_account: tokenAccount,
            music_media: musicPlatform
        }
        // Pass 'userSharedPlaylist' object into query
        if(userPlatform == null) {
            return prisma.userMusicPlatform.create({data: userMedia});
        } else {
            return prisma.userMusicPlatform.update({
                where: {
                    user_id: userId
                },
                data: userMedia
            })
        }
    }

    /**
     * getSpotifyAccessToken : get the token account of the user for connection to Spotify
     * @private
     */
    public async getSpotifyAccessToken(): Promise<string> {
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' +
                    (
                        new Buffer.from(
                            process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
                        ).toString('base64'))
            },
            form: {
                grant_type: 'client_credentials'
            },
            json: true
        };
        return await fetch(authOptions).then(async response => {
            if (!response.ok && response.status === 200) {
                return JSON.parse(await response.text()).access_token;
            }
        });

    }

    // UTILS

    /**
     * getMusicPlatformName : return the associated name from the music platform
     * @param musicPlatform
     * @private
     */
    private getMusicPlatformName(musicPlatform : MusicPlatform): String {
        switch (musicPlatform) {
            case MusicPlatform.Spotify : return "Spotify"
            case MusicPlatform.Apple_Music : return "Apple Music"
            case MusicPlatform.Deezer : return "Deezer"
            case MusicPlatform.Unknown : return "Unknown"
        }
    }

    /**
     * getMusicPlatformFromString : return the object music platform from the name, unknown if incorrect
     * @param mediaName
     * @private
     */
    private getMusicPlatformFromString(mediaName : String) : MusicPlatform {
        switch (mediaName) {
            case "Spotify" : return MusicPlatform.Spotify
            case "Apple Music" : return MusicPlatform.Apple_Music
            case "Deezer" : return MusicPlatform.Deezer
            default : return MusicPlatform.Unknown
        }
    }
}

export { MusicService }