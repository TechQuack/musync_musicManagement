const {buildSchema} = require("graphql/utilities");

const typeDefs = buildSchema(`#graphql

    type Query {
        getUserSharedPlaylist(id: Int): UserSharedPlaylist,
        getUserSharedMusic(id: Int): UserSharedMusic,
        getUserMedia(user_id: Int): MediaPlatformName,
        getUserMediaToken(user_id: Int): MediaPlatformConnectionToken,
        getUserSharedPlaylists(user_id: Int): ListUserSharedPlaylists,
        getUserSharedMusics(user_id: Int): ListUserSharedMusics
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

    type MediaPlatformName {
        platform_name : String!
    }

    type MediaPlatformConnectionToken {
        connection_token : String!
    }
`);

module.exports = { typeDefs }