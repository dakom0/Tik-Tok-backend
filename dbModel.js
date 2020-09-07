import mongoose from 'mongoose';

const tiktokSchema = mongoose.Schema({
    url: String,
    channel: String,
    song: String,
    likes: Number,
    messages: Number,
    description: String,
    shares: Number,
});

// Collectionn to database
export default mongoose.model("tiktokData",tiktokSchema);