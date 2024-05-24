-- CreateTable
CREATE TABLE "UserSharedPlaylist" (
    "user_shared_playlist_id" SERIAL NOT NULL,
    "playlist_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "UserSharedPlaylist_pkey" PRIMARY KEY ("user_shared_playlist_id")
);

-- CreateTable
CREATE TABLE "UserSharedMusic" (
    "user_shared_music_id" SERIAL NOT NULL,
    "music_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "UserSharedMusic_pkey" PRIMARY KEY ("user_shared_music_id")
);

-- CreateTable
CREATE TABLE "UserMusicPlatform" (
    "user_music_platform" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "token_account" TEXT NOT NULL,
    "music_media_id" INTEGER NOT NULL,

    CONSTRAINT "UserMusicPlatform_pkey" PRIMARY KEY ("user_music_platform")
);

-- CreateTable
CREATE TABLE "MusicPlaform" (
    "music_platform" SERIAL NOT NULL,
    "music_media_id" INTEGER NOT NULL,
    "music_media_name" TEXT NOT NULL,

    CONSTRAINT "MusicPlaform_pkey" PRIMARY KEY ("music_platform")
);
