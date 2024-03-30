import {PrismaClient, UserSharedMusic, UserSharedPlaylist} from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Manipulate entities for music management like users' music account and platform preferences.
 */
class MusicService {

    /**
     * getUserSharedPlaylist : return the promise of an array containing all the playlist shared by the user
     * @param userId
     * @return Promise<Array<UserSharedPlaylist>>
     */
    async getUserSharedPlaylist(userId: Number): Promise<Array<UserSharedPlaylist>> {
        return await prisma.userSharedPlaylist.findMany({
            where: {
                user_id: userId
            }
        }).then();
    }

    /**
     * getUserSharedPlaylist : return the promise of an array containing all the music shared by the user
     * @param userId
     * @return Promise<Array<UserSharedMusic>>
     */
    async getUserSharedMusic(userId: Number): Promise<Array<UserSharedMusic>> {
        return await prisma.userSharedMusic.findMany({
            where: {
                user_id: userId
            }
        }).then();
    }

    /**
     * getUserSharedPlaylist : return the promise of a string indicating the music media
     * @param userId
     * @return Promise<Array<UserSharedPlaylist>>
     */
    async getUserMedia(userId: Number): Promise<String> {
        return await prisma.userMusicPlatform.findMany({
            where: {
                user_id: userId,
                relationLoadStrategy: 'join',
                include: {
                    music_media_id : {
                        select : {
                            music_media_name : true
                        }
                    }
                }
            }
        }).then();
    }

    /**
     * getUserSharedPlaylist : return the promise of an array containing all the music shared by the user
     * @param userId
     * @return Promise<Array<UserSharedMusic>>
     */
    async getUserMediaToken(userId: Number): Promise<String> {
        return await prisma.userSharedMusic.findMany({
            where: {
                user_id: userId,
                select : {
                    token_account : true
                }
            }
        }).then();
    }
}