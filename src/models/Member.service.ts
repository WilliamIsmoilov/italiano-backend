import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../libs/types/member";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";
import MemberModel from "../schema/Member.Model";
import Errors, { MESSAGE, HTTPCODES } from "../libs/Errors";
import * as bcryptjs from "bcryptjs";
import sendMailer from '../libs/sendMailer/mailer';
import { shapeIntoMongooseObjectId } from "../libs/utils/config";
import fs from 'fs';
import path from 'path';


class MemberService {


    private readonly memberModel;

    constructor() {
        this.memberModel = MemberModel;
    }

    public async getRestaurant(): Promise<Member> {
        const result = await this.memberModel
          .findOne({memberType: MemberType.RESTAURANT})
          .lean()
          .exec();


          if(!result) throw new Errors(HTTPCODES.NOT_FOUND, MESSAGE.NO_DATA_FOUND);
          return result as  unknown as Member;

    }

    public async processLogin(input: LoginInput): Promise<Member>{
        const member = await this.memberModel
          .findOne({memberEmail: input.memberEmail},
            {memberEmail: 1, memberPassword: 1,}
          )
          .exec();

          if(!member)
            throw new Errors(HTTPCODES.NOT_FOUND, MESSAGE.USED_MEMBER_NICK)

          const isMatch = await bcryptjs.compare(
            input.memberPassword,
            member.memberPassword
          )

          if(!isMatch) throw new Errors(HTTPCODES.UNAUTHORIZED, MESSAGE.WRONG_PASSWORD)

            const result = await this.memberModel
              .findById(member._id)
              .exec()
              return result as unknown as Member
    }

    public async processSignup(input: MemberInput): Promise<Member> {
        const exist = await this.memberModel
          .findOne({memberType: MemberType.RESTAURANT})
          .exec();

          if(exist) throw new Errors(HTTPCODES.BAD_REQUEST, MESSAGE.CREAT_FAILED);

          const salt = await bcryptjs.genSalt();
          input.memberPassword = await bcryptjs.hash(input.memberPassword, salt);

          try {
            const result = await this.memberModel.create(input);
            result.memberPassword = '';
            await sendMailer.sendMail({
              email: result.memberEmail,
              subject: 'Signup Successful',
              text: `Assalomu aleykum hurmatli ${result.memberNick}!
                      Ro'yhatdan muvaffaqiyatli o'tkaningiz bilan tabriklaymiz. 
                     , O'ylaymizki bizning restaurant sizga yoqadi`
            })
            return result as unknown as Member;
          } catch (err) {
            console.error('signup error service', err)
            throw new Errors(HTTPCODES.BAD_REQUEST, MESSAGE.CREAT_FAILED);
          }
    }

    public async getUsers(): Promise<Member>{
      const result = await this.memberModel
        .find({memberType: MemberType.USER})
        .sort({createdAt: -1})
        .exec();

        if(!result) throw new Errors(HTTPCODES.NOT_FOUND, MESSAGE.NO_DATA_FOUND)
          return result as unknown as Member;  //shu yerda xatop bolsihi mumkin
    }

    public async updateChosenUser(input: MemberInput): Promise<Member>{
      const memberId = shapeIntoMongooseObjectId(input._id);
      const result = await this.memberModel
       .findByIdAndUpdate({_id: memberId}, input, {new: true})
       .exec()

       if(!result) throw new Errors(HTTPCODES.NOT_MODIFIED,MESSAGE.UPDATE_FAILED)
        return result.toObject() as Member;
    }
    
/** Single Page Application **/

public async signup(input: MemberInput): Promise<Member>{
  const salt = await bcryptjs.genSalt();
  input.memberPassword = await bcryptjs.hash(input.memberPassword, salt)
  const templatePath = path.join(__dirname, '../libs/sendMailer/signup.html');
  let htmlContent = fs.readFileSync(templatePath, 'utf8');
  
  try {
    const result = await this.memberModel.create(input);
    result.memberPassword = '';
     htmlContent = htmlContent.replace(/{{\s*name\s*}}/g, result.memberNick),
    await sendMailer.sendMail({
      email: result.memberEmail,
      subject: 'Signed up successfully',
      html: htmlContent
       })
    return result.toJSON() as Member;
  } catch (err) {
    console.log("error model:signup", err);
    throw new Errors(HTTPCODES.BAD_REQUEST, MESSAGE.USED_MEMBER_NICK);
  }
}

public async login(input: LoginInput): Promise<Member>{
  const member = await this.memberModel
  .findOne(
    {memberEmail: input.memberEmail, memberStatus: {$ne: MemberStatus.DELETE}},
    {memberEmail: 1, memberPassword: 1}
  ).exec();

  if(!member) throw new Errors(HTTPCODES.NOT_FOUND, MESSAGE.NO_DATA_FOUND);
  else if(member.memberStatus === MemberStatus.BLOCK){
    throw new Errors(HTTPCODES.FORBIDDEN, MESSAGE.BLOCKED_USER)
  }

  const isMatch = await bcryptjs.compare(
    input.memberPassword,
    member.memberPassword
  );

  if(!isMatch) {
    throw new Errors(HTTPCODES.UNAUTHORIZED, MESSAGE.WRONG_PASSWORD)
  }

  return await this.memberModel.findById(member._id).lean().exec() as unknown as Member;
}

public async getMemberDetail(member: Member ): Promise<Member>{
  const memberId  = shapeIntoMongooseObjectId(member._id);
  const result = await this.memberModel
   .findOne({_id: memberId, memberStatus: MemberStatus.ACTIVE})
   .exec();

   if(!result) throw new Errors(HTTPCODES.NOT_FOUND, MESSAGE.NO_DATA_FOUND);
   return result.toObject() as Member;
}

public async updateMember(
  member: Member,
  input: MemberUpdateInput): Promise<Member>{
   const memberId = shapeIntoMongooseObjectId(member._id);
   const result = await this.memberModel
   .findByIdAndUpdate({_id: memberId}, input, {new: true})
   .exec();

   if(!result) throw new Errors(HTTPCODES.NOT_MODIFIED, MESSAGE.UPDATE_FAILED);
   return result.toObject() as Member;
}

}


export default MemberService;