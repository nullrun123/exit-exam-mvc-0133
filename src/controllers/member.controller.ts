import { Context } from "hono";
import { MembersModel, RequestModel, RoleType  } from '@src/models';
import { db } from "@src/db/db";
import { eq } from "drizzle-orm";
import { RoleChangeRequests } from "@src/db";

export interface MemberReqType{
    id: string,
    requester_id:string,
    target_id:string,
    new_role:RoleType,
}
export const MembersController = {
    getAllMember:async(c:Context)=>{
        const data = await MembersModel.findAllMember();
        return c.json({
            message:"All Members successful",
            data
        })
    },
    CreateRequestmember:async(c:Context)=>{
        const target_id  = c.req.param('id');
        if(!target_id) {
            return c.json({ errors: ["Not found ID"] }, 400);
        }
    
        const {my_id,new_role} = await c.req.json();

        if(!my_id || !new_role){
            return c.json({
                errors:["Require my_id and new_role"]
            },400)
        }
        if(my_id === target_id){
            return c.json({ errors: ["Can not change your role"] }, 400);
        }

        // เจอ req ที่ขอไปแล้ว
        const [isRequest] = await db.select({
            target_id:RoleChangeRequests.target_id
        }).from(RoleChangeRequests).where(eq(RoleChangeRequests.id,target_id));

        if(isRequest){
            return c.json({
                errors:["Request  member is already  exists"]
            },409)
        }

        const newReq:MemberReqType = {
            id: crypto.randomUUID(),
            requester_id:my_id,
            target_id:target_id,
            new_role:new_role,
        }
        await RequestModel.CreateRequestChangeRole(newReq);
        
        return c.json({
            message:"Create Request change role successful",
            newReq,
        })
    },
}

