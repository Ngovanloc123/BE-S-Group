// Chuyển dữ liệu Mongoose sang object thuần

export default {
    multipleMongooseToObject: mongooses => {
        return mongooses.map(mongoose => mongoose.toObject())
    },
    mongooseToObject: mongoose => {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};