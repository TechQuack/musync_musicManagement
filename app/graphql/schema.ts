import {buildSchema} from "graphql/utilities";

const typeDefs = buildSchema(`#graphql

    type Query {
        getUserSharedPlaylist(id: Int): UserSharedPlaylist,
        getUserSharedMusic(id: Int): UserSharedMusic,
        getUserMedia(user_id: Int): String,
        getUserMediaToken(user_id: Int): String,
        getUserSharedPlaylists(user_id: Int): ListUserSharedPlaylists,
        getUserSharedMusics(user_id: Int): ListUserSharedMusics,
        getNumber: String
    }

    type Mutation {
        postUserSharedPlaylist(user_id: Int, playlist_id: Int): UserSharedPlaylist,
        postUserSharedMusic(user_id: Int, music_id: Int): UserSharedMusic,
        setUserMedia(user_id:Int, media_name:String): UserPlatformMusic,
    }

    type UserSharedPlaylist {
        user_shared_playlist_id: ID!
        playlist_id: Int!
        user_id: Int!
    }

    type ListUserSharedPlaylists {
        playlists: [UserSharedPlaylist!]
    }

    type UserSharedMusic {
        user_shared_music_id: ID!
        music_id: Int!
        user_id: Int!
    }
    
    type ListUserSharedMusics {
        musics: [UserSharedMusic!]
    }

    type UserPlatformMusic {
        user_id: Int!
        token_account : String!
        music_media_id: Int!
    }
`);

export { typeDefs }