import {buildSchema} from "graphql/utilities";

const typeDefs = buildSchema(`#graphql

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

export default typeDefs;