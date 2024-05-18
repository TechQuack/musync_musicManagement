import {UserMusicPlatform, UserSharedMusic, UserSharedPlaylist} from "@prisma/client";

const { kafka } = require("./client");

export async function updateSharedMusic(music: UserSharedMusic) {
    const producer = kafka.producer();

    console.log("Connecting Producer");
    await producer.connect();
    console.log("Producer Connected Successfully");

    await producer.send({
        topic: "shared_music",
        messages: [
            {
                partition: 0,
                key: "music-update",
                value: JSON.stringify(music),
            },
        ],
    });
    await producer.disconnect();
}

export async function updateSharedPlaylist(playlist: UserSharedPlaylist) {
    const producer = kafka.producer();

    console.log("Connecting Producer");
    await producer.connect();
    console.log("Producer Connected Successfully");

    await producer.send({
        topic: "shared_playlist",
        messages: [
            {
                partition: 0,
                key: "playlist-update",
                value: JSON.stringify(playlist),
            },
        ],
    });
    await producer.disconnect();
}

export async function updateMusicalPreferences(userMusicPlatform: UserMusicPlatform) {
    const producer = kafka.producer();

    console.log("Connecting Producer");
    await producer.connect();
    console.log("Producer Connected Successfully");

    await producer.send({
        topic: "shared_playlist",
        messages: [
            {
                partition: 0,
                key: "userPlatform-update",
                value: JSON.stringify(userMusicPlatform),
            },
        ],
    });
    await producer.disconnect();
}