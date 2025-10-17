import { shapeIntoMongooseObjectId } from "../libs/utils/config";
import { Contact, ContactInput } from "../libs/types/contact";
import { Member } from "../libs/types/member";
import ContactModel from "../schema/Contact.Model";
import Errors, { HTTPCODES, MESSAGE } from "../libs/Errors";


class ContactService{
    private readonly contactModel

    constructor(){
        this.contactModel = ContactModel
    }

    public async createContact(member: Member, input: ContactInput): Promise<Contact>{
        const memberId = shapeIntoMongooseObjectId(member._id);
        try {
            const result = await this.contactModel.create({
                memberId,
                ...input
        }) 
        return result as unknown as Contact
        } catch (err) {
            console.log('error contact service', err)
            throw new Errors(HTTPCODES.BAD_REQUEST, MESSAGE.CREAT_FAILED)
    }
}

public async getContacts(): Promise<Contact>{
    const result = await this.contactModel
      .find()
      .sort({createdAt: -1})
      .exec();
      if(!result) throw new Errors(HTTPCODES.NOT_FOUND, MESSAGE.NO_DATA_FOUND)
        return result as unknown as Contact;
}
}

export default ContactService