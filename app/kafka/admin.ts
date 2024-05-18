const { kafka } = require("./client");

async function init() {
    const admin = kafka.admin();
    console.log("Admin connecting...");
    admin.connect();
    console.log("Admin Connection Success...");

    console.log("Creating Topic [shared_music]");
    await admin.createTopics({
        topics: [
            {
                topic: "shared_music",
                numPartitions: 1,
            },
        ],
    });
    console.log("Topic Created Success [shared_music]");

    console.log("Creating Topic [shared_playlist]");
    await admin.createTopics({
        topics: [
            {
                topic: "shared_playlist",
                numPartitions: 1,
            },
        ],
    });
    console.log("Topic Created Success [shared_playlist]");

    console.log("Creating Topic [musical_preferences]");
    await admin.createTopics({
        topics: [
            {
                topic: "musical_preferences",
                numPartitions: 1,
            },
        ],
    });
    console.log("Topic Created Success [musical_preferences]");

    console.log("Disconnecting Admin..");
    await admin.disconnect();
}

init();