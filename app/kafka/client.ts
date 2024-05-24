const { Kafka } = require("kafkajs");

exports.kafka = new Kafka({
    clientId: "music",
    brokers: ["kafka:9092"],
});