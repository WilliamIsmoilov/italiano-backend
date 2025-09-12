import { LoginInput, Member, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import MemberModel from "../schema/Member.Model";
import Errors, { MESSAGE, HTTPCODES } from "../libs/Errors";
import * as bcrypt from "bcryptjs";


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

          const isMatch = await bcrypt.compare(
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

          const salt = await bcrypt.genSalt();
          input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

          try {
            const result = await this.memberModel.create(input);
            result.memberPassword = '';
            return result as unknown as Member;
          } catch (err) {
            throw new Errors(HTTPCODES.BAD_REQUEST, MESSAGE.CREAT_FAILED);
          }

    }
}


export default MemberService;