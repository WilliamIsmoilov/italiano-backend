import mongoose, {Schema} from "mongoose";
import { ContactSubject } from "../libs/enums/contact.enum";


const contactSchema = new Schema({
    memberId:{
            type: Schema.Types.ObjectId,
            ref: 'Member', required: true
        },
    memberNick: {
        type: String,
        required: true,
    },
    memberLastName: {
        type: String,
        required: true,
    },
    memberEmail: {
        type: String,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        required: true
    },
    contactSubject:{
        type: String,
    },
    contactMessage: {
        type: String,
        required: true
    }
},
{timestamps: true});
export default mongoose.model('Contact', contactSchema)