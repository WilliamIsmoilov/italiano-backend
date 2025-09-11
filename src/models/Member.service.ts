import { LoginInput, Member } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import MemberModel from "../schema/Member.Model";
import Errors, { MESSAGE } from "../libs/Errors";
import { HTTPCODES } from "../libs/Errors";
import * as bcryptjs from "bcryptjs";


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
}


export default MemberService;